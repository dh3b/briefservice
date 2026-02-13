import { Router } from "express";
import pool from "../db.js";
import { requireAdmin } from "./auth.js";
import v from "../validate.js";
import { LANGS } from "../config.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = Router();

// GET /api/categories
router.get("/", asyncHandler(async (_req, res) => {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY created_at ASC");
  res.json(rows);
}));

// POST /api/categories (admin)
router.post("/", requireAdmin, asyncHandler(async (req, res) => {
  const cols = [];
  const vals = [];
  for (const l of LANGS) {
    cols.push(`name_${l}`);
    vals.push(v.text(req.body[`name_${l}`], 255) || null);
  }
  const placeholders = vals.map((_, i) => `$${i + 1}`).join(", ");
  const { rows } = await pool.query(
    `INSERT INTO categories (${cols.join(", ")}) VALUES (${placeholders}) RETURNING *`,
    vals
  );
  res.status(201).json(rows[0]);
}));

// PUT /api/categories/:id (admin)
router.put("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const sets = [];
  const vals = [];
  let idx = 1;
  for (const l of LANGS) {
    sets.push(`name_${l} = $${idx++}`);
    vals.push(v.text(req.body[`name_${l}`], 255) || null);
  }
  vals.push(req.params.id);
  const { rows } = await pool.query(
    `UPDATE categories SET ${sets.join(", ")} WHERE id = $${idx} RETURNING *`,
    vals
  );
  if (rows.length === 0) return res.status(404).json({ error: "Category not found" });
  res.json(rows[0]);
}));

// DELETE /api/categories/:id (admin)
router.delete("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const { rowCount } = await pool.query("DELETE FROM categories WHERE id = $1", [req.params.id]);
  if (rowCount === 0) return res.status(404).json({ error: "Category not found" });
  res.json({ message: "Category deleted" });
}));

export default router;
