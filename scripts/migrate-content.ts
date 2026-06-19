/**
 * Seed / migrate the database with the committed service + guide content (the
 * same content the build falls back to), into the normalized translation
 * tables. Idempotent — re-running updates rows in place.
 *
 * Exports the current rows to db_backups/ before writing (rollback safety).
 *
 * Run with DB_* env vars set (same as the server), e.g.:
 *   DB_HOST=localhost DB_NAME=briefservice DB_USER=postgres DB_PASSWORD=… npm run seed
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import pg from "pg";
import { getServices, getGuides, availableLangs } from "@/lib/content-source";
import type { Translation } from "@/content/types";

const pool = new pg.Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "briefservice",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
});

/** Dump the tables we are about to touch, so a run is reversible. */
async function backup() {
  const tables = ["services", "guides", "service_translations", "guide_translations", "service_guides"];
  const dump: Record<string, unknown[]> = {};
  for (const t of tables) {
    try {
      dump[t] = (await pool.query(`SELECT * FROM ${t}`)).rows;
    } catch {
      dump[t] = [];
    }
  }
  const dir = join(process.cwd(), "db_backups");
  mkdirSync(dir, { recursive: true });
  const file = join(dir, `pre-migrate-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  writeFileSync(file, JSON.stringify(dump, null, 2));
  console.log(`Backup written: ${file}`);
}

async function upsertTranslation(
  table: "service_translations" | "guide_translations",
  fk: "service_id" | "guide_id",
  id: string,
  lang: string,
  t: Translation,
) {
  const cta = table === "guide_translations" ? JSON.stringify(t.cta ?? null) : null;
  const cols = [fk, "lang", "title", "h1", "seo_title", "seo_description", "excerpt", "markdown", "faq"];
  const vals: unknown[] = [
    id,
    lang,
    t.title ?? null,
    t.h1 ?? null,
    t.seoTitle ?? null,
    t.seoDescription ?? null,
    t.excerpt ?? null,
    t.markdown ?? null,
    JSON.stringify(t.faq ?? []),
  ];
  if (table === "guide_translations") {
    cols.push("cta");
    vals.push(cta);
  }
  const ph = cols.map((c, i) => (c === "faq" || c === "cta" ? `$${i + 1}::jsonb` : `$${i + 1}`));
  const updates = cols
    .filter((c) => c !== fk && c !== "lang")
    .map((c) => `${c} = EXCLUDED.${c}`)
    .concat("updated_at = NOW()")
    .join(", ");
  await pool.query(
    `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${ph.join(", ")})
     ON CONFLICT (${fk}, lang) DO UPDATE SET ${updates}`,
    vals,
  );
}

async function run() {
  await backup();

  // Guides first, so service_guides can reference them.
  const guides = await getGuides();
  const guideIdBySlug = new Map<string, string>();
  for (const g of guides) {
    const { rows } = await pool.query(
      `INSERT INTO guides (slug, published, sort_order)
       VALUES ($1, true, $2)
       ON CONFLICT (slug) DO UPDATE SET published = EXCLUDED.published, sort_order = EXCLUDED.sort_order
       RETURNING id`,
      [g.slug, g.sortOrder],
    );
    const id = rows[0].id as string;
    guideIdBySlug.set(g.slug, id);
    for (const lang of availableLangs(g)) {
      await upsertTranslation("guide_translations", "guide_id", id, lang, g.translations[lang]!);
    }
    console.log(`guide ${g.slug}: ${availableLangs(g).length} translation(s)`);
  }

  // Services + translations + curated related guides.
  const services = await getServices();
  for (const s of services) {
    const { rows } = await pool.query(
      `INSERT INTO services (slug, published, sort_order, featured, hero_image)
       VALUES ($1, true, $2, $3, $4)
       ON CONFLICT (slug) DO UPDATE SET
         published = EXCLUDED.published, sort_order = EXCLUDED.sort_order,
         featured = EXCLUDED.featured, hero_image = EXCLUDED.hero_image
       RETURNING id`,
      [s.slug, s.sortOrder, s.featured, s.heroImage ?? null],
    );
    const id = rows[0].id as string;
    for (const lang of availableLangs(s)) {
      await upsertTranslation("service_translations", "service_id", id, lang, s.translations[lang]!);
    }
    // Rebuild the curated related-guides join from the content's relatedGuides.
    await pool.query(`DELETE FROM service_guides WHERE service_id = $1`, [id]);
    let pos = 0;
    for (const gslug of s.relatedGuides) {
      const gid = guideIdBySlug.get(gslug);
      if (!gid) continue;
      await pool.query(
        `INSERT INTO service_guides (service_id, guide_id, position) VALUES ($1, $2, $3)
         ON CONFLICT (service_id, guide_id) DO UPDATE SET position = EXCLUDED.position`,
        [id, gid, pos++],
      );
    }
    console.log(
      `service ${s.slug}: ${availableLangs(s).length} translation(s), ${pos} related guide(s)${s.featured ? " [featured]" : ""}`,
    );
  }
}

run()
  .then(() => console.log("Migrate/seed complete."))
  .catch((err) => {
    console.error("Migrate/seed failed:", err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
