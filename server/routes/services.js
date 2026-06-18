import { Router } from "express";
import pool from "../db.js";
import { requireAdmin } from "./auth.js";
import v from "../validate.js";
import { LANGS, MAX_TITLE_LEN, MAX_DESC_LEN } from "../config.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = Router();

/** Build the shared column list + values for INSERT/UPDATE. */
function serviceFields(body) {
  const cols = ["category_id", "image_url", "slug", "content", "published", "sort_order"];
  const vals = [
    body.category_id || null,
    v.url(body.image_url) || v.text(body.image_url, 2048) || "",
    v.slug(body.slug),
    JSON.stringify(v.contentJson(body.content)),
    Boolean(body.published),
    Number.isInteger(body.sort_order) ? body.sort_order : 0,
  ];
  // jsonb cast applies to the `content` column (index 4 -> $4)
  const casts = { content: "::jsonb" };

  for (const l of LANGS) {
    cols.push(`title_${l}`, `description_${l}`);
    vals.push(
      v.text(body[`title_${l}`], MAX_TITLE_LEN) || null,
      v.text(body[`description_${l}`], MAX_DESC_LEN) || null,
    );
  }
  return { cols, vals, casts };
}

// GET /api/services
router.get("/", asyncHandler(async (_req, res) => {
  const { rows } = await pool.query("SELECT * FROM services ORDER BY sort_order ASC, created_at DESC");
  res.json(rows);
}));

// GET /api/services/:id
router.get("/:id", asyncHandler(async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM services WHERE id = $1", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Service not found" });
  res.json(rows[0]);
}));

// POST /api/services (admin)
router.post("/", requireAdmin, asyncHandler(async (req, res) => {
  const { cols, vals, casts } = serviceFields(req.body);
  const placeholders = cols.map((c, i) => `$${i + 1}${casts[c] || ""}`).join(", ");
  const { rows } = await pool.query(
    `INSERT INTO services (${cols.join(", ")}) VALUES (${placeholders}) RETURNING *`,
    vals,
  );
  res.status(201).json(rows[0]);
}));

// PUT /api/services/:id (admin)
router.put("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const { cols, vals, casts } = serviceFields(req.body);
  const sets = cols.map((c, i) => `${c} = $${i + 1}${casts[c] || ""}`).join(", ");
  vals.push(req.params.id);
  const { rows } = await pool.query(
    `UPDATE services SET ${sets} WHERE id = $${vals.length} RETURNING *`,
    vals,
  );
  if (rows.length === 0) return res.status(404).json({ error: "Service not found" });
  res.json(rows[0]);
}));

// DELETE /api/services/:id (admin)
router.delete("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const { rowCount } = await pool.query("DELETE FROM services WHERE id = $1", [req.params.id]);
  if (rowCount === 0) return res.status(404).json({ error: "Service not found" });
  res.json({ message: "Service deleted" });
}));

export default router;
