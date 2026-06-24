import { Router } from "express";
import pool from "../db.js";
import { requireAdmin } from "./auth.js";
import v from "../validate.js";
import { LANGS, MAX_TITLE_LEN, MAX_DESC_LEN } from "../config.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = Router();

const MAX_MARKDOWN_LEN = 50_000;

/** Map a service_translations row to the API/content shape. */
function mapTranslation(row) {
  return {
    lang: row.lang,
    title: row.title,
    h1: row.h1,
    seo_title: row.seo_title,
    seo_description: row.seo_description,
    excerpt: row.excerpt,
    markdown: row.markdown,
    faq: row.faq ?? [],
    images: row.images ?? [],
  };
}

/** Group rows by a key into a Map of arrays. */
function groupBy(rows, key) {
  const map = new Map();
  for (const r of rows) {
    const arr = map.get(r[key]) ?? [];
    arr.push(r);
    map.set(r[key], arr);
  }
  return map;
}

/** Assemble services with their translations + curated related-guide slugs. */
async function listServices() {
  const [{ rows: services }, { rows: trans }, { rows: rels }] = await Promise.all([
    pool.query("SELECT * FROM services ORDER BY featured DESC, sort_order ASC, created_at DESC"),
    pool.query("SELECT * FROM service_translations"),
    pool.query(
      `SELECT sg.service_id, g.slug, sg.position
         FROM service_guides sg JOIN guides g ON g.id = sg.guide_id
        ORDER BY sg.position ASC`,
    ),
  ]);
  const transByService = groupBy(trans, "service_id");
  const relsByService = groupBy(rels, "service_id");
  return services.map((s) => ({
    ...s,
    translations: (transByService.get(s.id) ?? []).map(mapTranslation),
    related_guides: (relsByService.get(s.id) ?? []).map((r) => r.slug),
  }));
}

/** Validate + normalize an incoming translations array from the admin. */
function cleanTranslations(input) {
  if (!Array.isArray(input)) return [];
  const out = [];
  for (const raw of input) {
    if (!raw || typeof raw !== "object") continue;
    const lang = LANGS.includes(raw.lang) ? raw.lang : null;
    if (!lang) continue;
    out.push({
      lang,
      title: v.text(raw.title, MAX_TITLE_LEN),
      h1: v.text(raw.h1, MAX_TITLE_LEN),
      seo_title: v.text(raw.seo_title, MAX_TITLE_LEN),
      seo_description: v.text(raw.seo_description, MAX_DESC_LEN),
      excerpt: v.text(raw.excerpt, MAX_DESC_LEN),
      markdown: v.text(raw.markdown, MAX_MARKDOWN_LEN),
      faq: Array.isArray(raw.faq)
        ? raw.faq
            .map((f) => ({ q: v.text(f?.q, MAX_TITLE_LEN), a: v.text(f?.a, MAX_DESC_LEN) }))
            .filter((f) => f.q || f.a)
        : [],
      images: Array.isArray(raw.images) ? raw.images : [],
    });
  }
  return out;
}

/** Insert/replace a service's translations + related-guide join inside a txn. */
async function writeChildren(client, serviceId, body) {
  const translations = cleanTranslations(body.translations);
  await client.query("DELETE FROM service_translations WHERE service_id = $1", [serviceId]);
  for (const t of translations) {
    await client.query(
      `INSERT INTO service_translations
         (service_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq, images)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10::jsonb)`,
      [serviceId, t.lang, t.title, t.h1, t.seo_title, t.seo_description, t.excerpt, t.markdown,
       JSON.stringify(t.faq), JSON.stringify(t.images)],
    );
  }

  if (Array.isArray(body.related_guides)) {
    await client.query("DELETE FROM service_guides WHERE service_id = $1", [serviceId]);
    const slugs = body.related_guides.map((s) => v.slug(s)).filter(Boolean);
    if (slugs.length) {
      const { rows } = await client.query("SELECT id, slug FROM guides WHERE slug = ANY($1)", [slugs]);
      const idBySlug = new Map(rows.map((r) => [r.slug, r.id]));
      let pos = 0;
      for (const slug of slugs) {
        const gid = idBySlug.get(slug);
        if (gid) {
          await client.query(
            "INSERT INTO service_guides (service_id, guide_id, position) VALUES ($1,$2,$3) ON CONFLICT (service_id, guide_id) DO UPDATE SET position = EXCLUDED.position",
            [serviceId, gid, pos++],
          );
        }
      }
    }
  }
}

/** Shared service row column values for INSERT/UPDATE (not the translations). */
function serviceRow(body) {
  return {
    category_id: body.category_id || null,
    image_url: v.url(body.image_url) || v.text(body.image_url, 2048) || "",
    hero_image: v.url(body.hero_image) || v.text(body.hero_image, 2048) || null,
    slug: v.slug(body.slug),
    published: Boolean(body.published),
    featured: Boolean(body.featured),
    sort_order: Number.isInteger(body.sort_order) ? body.sort_order : 0,
  };
}

// GET /api/services - list with translations + related guides
router.get("/", asyncHandler(async (_req, res) => {
  res.json(await listServices());
}));

// GET /api/services/:id - single by id or slug (admin)
router.get("/:id", asyncHandler(async (req, res) => {
  const all = await listServices();
  const found = all.find((s) => s.id === req.params.id || s.slug === req.params.id);
  if (!found) return res.status(404).json({ error: "Service not found" });
  res.json(found);
}));

// POST /api/services (admin)
router.post("/", requireAdmin, asyncHandler(async (req, res) => {
  const r = serviceRow(req.body);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      `INSERT INTO services (category_id, image_url, hero_image, slug, published, featured, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
      [r.category_id, r.image_url, r.hero_image, r.slug, r.published, r.featured, r.sort_order],
    );
    await writeChildren(client, rows[0].id, req.body);
    await client.query("COMMIT");
    res.status(201).json({ id: rows[0].id });
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}));

// PUT /api/services/:id (admin)
router.put("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const r = serviceRow(req.body);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rowCount } = await client.query(
      `UPDATE services SET category_id=$1, image_url=$2, hero_image=$3, slug=$4, published=$5, featured=$6, sort_order=$7
       WHERE id=$8`,
      [r.category_id, r.image_url, r.hero_image, r.slug, r.published, r.featured, r.sort_order, req.params.id],
    );
    if (rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Service not found" });
    }
    await writeChildren(client, req.params.id, req.body);
    await client.query("COMMIT");
    res.json({ id: req.params.id });
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}));

// DELETE /api/services/:id (admin)
router.delete("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const { rowCount } = await pool.query("DELETE FROM services WHERE id = $1", [req.params.id]);
  if (rowCount === 0) return res.status(404).json({ error: "Service not found" });
  res.json({ message: "Service deleted" });
}));

export default router;
