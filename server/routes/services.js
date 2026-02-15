import { Router } from "express";
import pool from "../db.js";
import { requireAdmin } from "./auth.js";
import v from "../validate.js";
import { LANGS, MAX_TITLE_LEN, MAX_DESC_LEN } from "../config.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = Router();

// GET /api/services
router.get("/", asyncHandler(async (_req, res) => {
  const { rows } = await pool.query("SELECT * FROM services ORDER BY created_at DESC");
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
  const { category_id, price_range, image_url, ...langFields } = req.body;
  const cols = ["category_id", "price_range", "image_url"];
  const vals = [category_id || null, v.text(price_range, 100) || "", v.url(image_url) || v.text(image_url, 2048) || ""];

  for (const l of LANGS) {
    cols.push(`title_${l}`, `description_${l}`);
    vals.push(v.text(langFields[`title_${l}`], MAX_TITLE_LEN) || null, v.text(langFields[`description_${l}`], MAX_DESC_LEN) || null);
  }

  const placeholders = vals.map((_, i) => `$${i + 1}`).join(", ");
  const { rows } = await pool.query(
    `INSERT INTO services (${cols.join(", ")}) VALUES (${placeholders}) RETURNING *`,
    vals
  );
  res.status(201).json(rows[0]);
}));

// PUT /api/services/:id (admin)
router.put("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const { category_id, price_range, image_url, ...langFields } = req.body;
  const sets = ["category_id = $1", "price_range = $2", "image_url = $3"];
  const vals = [category_id || null, v.text(price_range, 100) || "", v.url(image_url) || v.text(image_url, 2048) || ""];

  let idx = 4;
  for (const l of LANGS) {
    sets.push(`title_${l} = $${idx}`, `description_${l} = $${idx + 1}`);
    vals.push(v.text(langFields[`title_${l}`], MAX_TITLE_LEN) || null, v.text(langFields[`description_${l}`], MAX_DESC_LEN) || null);
    idx += 2;
  }
  vals.push(req.params.id);

  const { rows } = await pool.query(
    `UPDATE services SET ${sets.join(", ")} WHERE id = $${idx} RETURNING *`,
    vals
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
