import { Router } from "express";
import pool from "../db.js";
import { requireAdmin } from "./auth.js";
import v from "../validate.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = Router();

function guideFields(body) {
  return {
    slug: v.slug(body.slug),
    content: JSON.stringify(v.contentJson(body.content)),
    published: Boolean(body.published),
    sort_order: Number.isInteger(body.sort_order) ? body.sort_order : 0,
  };
}

// GET /api/guides
router.get("/", asyncHandler(async (_req, res) => {
  const { rows } = await pool.query("SELECT * FROM guides ORDER BY sort_order ASC, created_at DESC");
  res.json(rows);
}));

// GET /api/guides/:id
router.get("/:id", asyncHandler(async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM guides WHERE id = $1", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Guide not found" });
  res.json(rows[0]);
}));

// POST /api/guides (admin)
router.post("/", requireAdmin, asyncHandler(async (req, res) => {
  const f = guideFields(req.body);
  if (!f.slug) return res.status(400).json({ error: "Valid slug required" });
  const { rows } = await pool.query(
    "INSERT INTO guides (slug, content, published, sort_order) VALUES ($1, $2::jsonb, $3, $4) RETURNING *",
    [f.slug, f.content, f.published, f.sort_order],
  );
  res.status(201).json(rows[0]);
}));

// PUT /api/guides/:id (admin)
router.put("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const f = guideFields(req.body);
  if (!f.slug) return res.status(400).json({ error: "Valid slug required" });
  const { rows } = await pool.query(
    "UPDATE guides SET slug = $1, content = $2::jsonb, published = $3, sort_order = $4 WHERE id = $5 RETURNING *",
    [f.slug, f.content, f.published, f.sort_order, req.params.id],
  );
  if (rows.length === 0) return res.status(404).json({ error: "Guide not found" });
  res.json(rows[0]);
}));

// DELETE /api/guides/:id (admin)
router.delete("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const { rowCount } = await pool.query("DELETE FROM guides WHERE id = $1", [req.params.id]);
  if (rowCount === 0) return res.status(404).json({ error: "Guide not found" });
  res.json({ message: "Guide deleted" });
}));

export default router;
