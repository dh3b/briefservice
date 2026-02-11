import { Router } from "express";
import pool from "../db.js";
import { requireAdmin } from "./auth.js";
import v from "../validate.js";

const router = Router();
const LANGS = ["pl", "en", "de", "fr", "es", "it", "pt", "nl", "cs", "ro", "hu", "sv"];

// GET /api/services
router.get("/", async (_req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM services ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/services/:id
router.get("/:id", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM services WHERE id = $1", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Service not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching service:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/services (admin)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const { category_id, price_range, image_url, ...langFields } = req.body;
    const cols = ["category_id", "price_range", "image_url"];
    const vals = [category_id || null, v.text(price_range, 100) || "", v.url(image_url) || v.text(image_url, 2048) || ""];

    for (const l of LANGS) {
      cols.push(`title_${l}`, `description_${l}`);
      vals.push(v.text(langFields[`title_${l}`], 255) || null, v.text(langFields[`description_${l}`], 500) || null);
    }

    const placeholders = vals.map((_, i) => `$${i + 1}`).join(", ");
    const { rows } = await pool.query(
      `INSERT INTO services (${cols.join(", ")}) VALUES (${placeholders}) RETURNING *`,
      vals
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Error creating service:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/services/:id (admin)
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { category_id, price_range, image_url, ...langFields } = req.body;
    const sets = ["category_id = $1", "price_range = $2", "image_url = $3"];
    const vals = [category_id || null, v.text(price_range, 100) || "", v.url(image_url) || v.text(image_url, 2048) || ""];

    let idx = 4;
    for (const l of LANGS) {
      sets.push(`title_${l} = $${idx}`, `description_${l} = $${idx + 1}`);
      vals.push(v.text(langFields[`title_${l}`], 255) || null, v.text(langFields[`description_${l}`], 500) || null);
      idx += 2;
    }
    vals.push(req.params.id);

    const { rows } = await pool.query(
      `UPDATE services SET ${sets.join(", ")} WHERE id = $${idx} RETURNING *`,
      vals
    );
    if (rows.length === 0) return res.status(404).json({ error: "Service not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Error updating service:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/services/:id (admin)
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { rowCount } = await pool.query("DELETE FROM services WHERE id = $1", [req.params.id]);
    if (rowCount === 0) return res.status(404).json({ error: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (err) {
    console.error("Error deleting service:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
