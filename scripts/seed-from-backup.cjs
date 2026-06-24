/**
 * Dev helper: restore service/guide content into the local Postgres from a
 * `db_backups/pre-migrate-*.json` snapshot (the shape dumped by the old
 * migrate-content backup step). The sandbox DB gets wiped between sessions but
 * keeps its schema, so this re-seeds it without a committed seed source.
 *
 * Resilient to schema drift: for each table it inserts only the columns that
 * exist in BOTH the snapshot row and the live table, and casts jsonb columns.
 *
 * Usage (DB_* / PGPASSWORD like the server):
 *   PGPASSWORD=… node scripts/seed-from-backup.cjs [path/to/backup.json]
 * With no path it picks the largest pre-migrate-*.json in db_backups/.
 */
const fs = require("node:fs");
const path = require("node:path");
const pg = require("pg");

const pool = new pg.Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "briefservice",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || process.env.PGPASSWORD || "postgres",
});

// FK-safe insertion order; service_guides last (references both).
const ORDER = ["services", "guides", "service_translations", "guide_translations", "service_guides"];
const CONFLICT = {
  services: "(id)",
  guides: "(id)",
  service_translations: "(id)",
  guide_translations: "(id)",
  service_guides: "(service_id, guide_id)",
};

function pickBackup() {
  if (process.argv[2]) return path.resolve(process.argv[2]);
  const dir = path.join(process.cwd(), "db_backups");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.startsWith("pre-migrate-") && f.endsWith(".json"))
    .map((f) => ({ f, size: fs.statSync(path.join(dir, f)).size }))
    .sort((a, b) => b.size - a.size);
  if (!files.length) throw new Error("no pre-migrate-*.json found in db_backups/");
  return path.join(dir, files[0].f);
}

async function tableMeta(table) {
  const { rows } = await pool.query(
    `SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='public' AND table_name=$1`,
    [table],
  );
  const cols = new Set(rows.map((r) => r.column_name));
  const jsonb = new Set(rows.filter((r) => r.data_type === "jsonb").map((r) => r.column_name));
  return { cols, jsonb };
}

async function seedTable(table, rows) {
  if (!rows || !rows.length) return 0;
  const { cols, jsonb } = await tableMeta(table);

  // categories aren't included in these snapshots; drop dangling FK refs so the
  // (optional) category link doesn't block the content restore.
  if (table === "services") {
    const { rows: cats } = await pool.query("SELECT id FROM categories");
    const known = new Set(cats.map((c) => c.id));
    for (const row of rows) {
      if (row.category_id && !known.has(row.category_id)) row.category_id = null;
    }
  }

  let n = 0;
  for (const row of rows) {
    const keys = Object.keys(row).filter((k) => cols.has(k));
    if (!keys.length) continue;
    const values = keys.map((k) => {
      const v = row[k];
      if (v !== null && jsonb.has(k)) return JSON.stringify(v);
      return v;
    });
    const placeholders = keys.map((k, i) => (jsonb.has(k) ? `$${i + 1}::jsonb` : `$${i + 1}`));
    const sql =
      `INSERT INTO ${table} (${keys.map((k) => `"${k}"`).join(", ")}) ` +
      `VALUES (${placeholders.join(", ")}) ON CONFLICT ${CONFLICT[table]} DO NOTHING`;
    await pool.query(sql, values);
    n++;
  }
  return n;
}

(async () => {
  const file = pickBackup();
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  console.log(`Seeding from ${path.basename(file)}`);
  try {
    for (const table of ORDER) {
      const n = await seedTable(table, data[table]);
      console.log(`  ${table}: ${n} row(s) inserted`);
    }
    console.log("Done.");
  } catch (e) {
    console.error("Seed failed:", e.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
})();
