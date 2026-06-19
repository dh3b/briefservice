import { Router } from "express";
import pool from "../db.js";
import { requireAdmin } from "./auth.js";
import v from "../validate.js";
import { LANGS, MAX_TITLE_LEN, MAX_DESC_LEN } from "../config.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = Router();

const MAX_MARKDOWN_LEN = 50_000;

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
    cta: row.cta ?? null,
    images: row.images ?? [],
  };
}

function groupBy(rows, key) {
  const map = new Map();
  for (const r of rows) {
    const arr = map.get(r[key]) ?? [];
    arr.push(r);
    map.set(r[key], arr);
  }
  return map;
}

async function listGuides() {
  const [{ rows: guides }, { rows: trans }] = await Promise.all([
    pool.query("SELECT * FROM guides ORDER BY sort_order ASC, created_at DESC"),
    pool.query("SELECT * FROM guide_translations"),
  ]);
  const byGuide = groupBy(trans, "guide_id");
  return guides.map((g) => ({
    ...g,
    translations: (byGuide.get(g.id) ?? []).map(mapTranslation),
  }));
}

/** Normalize a guide CTA ({serviceSlug,label,text}) or null. */
function cleanCta(cta) {
  if (!cta || typeof cta !== "object") return null;
  const serviceSlug = v.slug(cta.serviceSlug);
  const label = v.text(cta.label, MAX_TITLE_LEN);
  const text = v.text(cta.text, MAX_DESC_LEN);
  if (!serviceSlug && !label && !text) return null;
  return { serviceSlug, label, text };
}

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
      cta: cleanCta(raw.cta),
      images: Array.isArray(raw.images) ? raw.images : [],
    });
  }
  return out;
}

async function writeTranslations(client, guideId, body) {
  const translations = cleanTranslations(body.translations);
  await client.query("DELETE FROM guide_translations WHERE guide_id = $1", [guideId]);
  for (const t of translations) {
    await client.query(
      `INSERT INTO guide_translations
         (guide_id, lang, title, h1, seo_title, seo_description, excerpt, markdown, faq, cta, images)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10::jsonb,$11::jsonb)`,
      [guideId, t.lang, t.title, t.h1, t.seo_title, t.seo_description, t.excerpt, t.markdown,
       JSON.stringify(t.faq), JSON.stringify(t.cta), JSON.stringify(t.images)],
    );
  }
}

function guideRow(body) {
  return {
    slug: v.slug(body.slug),
    hero_image: v.url(body.hero_image) || v.text(body.hero_image, 2048) || null,
    published: Boolean(body.published),
    sort_order: Number.isInteger(body.sort_order) ? body.sort_order : 0,
  };
}

// GET /api/guides
router.get("/", asyncHandler(async (_req, res) => {
  res.json(await listGuides());
}));

// GET /api/guides/:id — by id or slug
router.get("/:id", asyncHandler(async (req, res) => {
  const all = await listGuides();
  const found = all.find((g) => g.id === req.params.id || g.slug === req.params.id);
  if (!found) return res.status(404).json({ error: "Guide not found" });
  res.json(found);
}));

// POST /api/guides (admin)
router.post("/", requireAdmin, asyncHandler(async (req, res) => {
  const r = guideRow(req.body);
  if (!r.slug) return res.status(400).json({ error: "Valid slug required" });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      "INSERT INTO guides (slug, hero_image, published, sort_order) VALUES ($1,$2,$3,$4) RETURNING id",
      [r.slug, r.hero_image, r.published, r.sort_order],
    );
    await writeTranslations(client, rows[0].id, req.body);
    await client.query("COMMIT");
    res.status(201).json({ id: rows[0].id });
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}));

// PUT /api/guides/:id (admin)
router.put("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const r = guideRow(req.body);
  if (!r.slug) return res.status(400).json({ error: "Valid slug required" });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rowCount } = await client.query(
      "UPDATE guides SET slug=$1, hero_image=$2, published=$3, sort_order=$4 WHERE id=$5",
      [r.slug, r.hero_image, r.published, r.sort_order, req.params.id],
    );
    if (rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Guide not found" });
    }
    await writeTranslations(client, req.params.id, req.body);
    await client.query("COMMIT");
    res.json({ id: req.params.id });
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}));

// DELETE /api/guides/:id (admin)
router.delete("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const { rowCount } = await pool.query("DELETE FROM guides WHERE id = $1", [req.params.id]);
  if (rowCount === 0) return res.status(404).json({ error: "Guide not found" });
  res.json({ message: "Guide deleted" });
}));

export default router;
