/**
 * Seed the database with the committed Polish service/guide content so it is
 * editable in the admin (the same content the build falls back to). Idempotent
 * — existing slugs are left untouched.
 *
 * Run with DB_* env vars set (same as the server), e.g.:
 *   DB_HOST=localhost DB_NAME=briefservice DB_USER=postgres DB_PASSWORD=… npm run seed
 */
import pg from "pg";
import { SERVICE_PAGES } from "../src/content/services";
import { GUIDES } from "../src/content/guides";

const pool = new pg.Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "briefservice",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
});

async function seedServices() {
  for (let i = 0; i < SERVICE_PAGES.length; i++) {
    const s = SERVICE_PAGES[i];
    const content = {
      pl: {
        seoTitle: s.title,
        seoDescription: s.description,
        h1: s.h1,
        lead: s.lead,
        sections: s.sections,
        highlights: s.highlights,
        faq: s.faq,
        relatedGuides: s.relatedGuides ?? [],
      },
    };
    const { rowCount } = await pool.query(
      `INSERT INTO services (slug, title_pl, description_pl, content, published, sort_order)
       VALUES ($1, $2, $3, $4::jsonb, true, $5)
       ON CONFLICT (slug) DO NOTHING`,
      [s.slug, s.name, s.summary, JSON.stringify(content), i],
    );
    console.log(`service ${s.slug}: ${rowCount ? "inserted" : "exists, skipped"}`);
  }
}

async function seedGuides() {
  for (let i = 0; i < GUIDES.length; i++) {
    const g = GUIDES[i];
    const content = {
      pl: {
        seoTitle: g.title,
        seoDescription: g.description,
        h1: g.h1,
        summary: g.summary,
        lead: g.lead,
        sections: g.sections,
        faq: g.faq,
        cta: g.cta,
      },
    };
    const { rowCount } = await pool.query(
      `INSERT INTO guides (slug, content, published, sort_order)
       VALUES ($1, $2::jsonb, true, $3)
       ON CONFLICT (slug) DO NOTHING`,
      [g.slug, JSON.stringify(content), i],
    );
    console.log(`guide ${g.slug}: ${rowCount ? "inserted" : "exists, skipped"}`);
  }
}

(async () => {
  try {
    await seedServices();
    await seedGuides();
    console.log("Seed complete.");
  } catch (err) {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
})();
