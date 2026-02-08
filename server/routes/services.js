import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET /api/services?category=Development&lang=en
router.get("/", async (req, res) => {
  try {
    const { category, lang = "pl" } = req.query;
    const categoryCol = lang === "en" ? "category_en" : "category_pl";

    let query = "SELECT * FROM services";
    const params = [];

    if (category && category !== "all") {
      query += ` WHERE ${categoryCol} = $1`;
      params.push(category);
    }

    query += " ORDER BY created_at DESC";
    const { rows } = await pool.query(query, params);
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

// POST /api/services (admin only — auth middleware should be added)
router.post("/", async (req, res) => {
  try {
    const { title_pl, title_en, description_pl, description_en, price_range, image_url, category_pl, category_en } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO services (title_pl, title_en, description_pl, description_en, price_range, image_url, category_pl, category_en)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title_pl, title_en, description_pl, description_en, price_range, image_url, category_pl, category_en]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Error creating service:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/services/:id
router.put("/:id", async (req, res) => {
  try {
    const { title_pl, title_en, description_pl, description_en, price_range, image_url, category_pl, category_en } = req.body;
    const { rows } = await pool.query(
      `UPDATE services SET title_pl=$1, title_en=$2, description_pl=$3, description_en=$4, price_range=$5, image_url=$6, category_pl=$7, category_en=$8
       WHERE id=$9 RETURNING *`,
      [title_pl, title_en, description_pl, description_en, price_range, image_url, category_pl, category_en, req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Service not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Error updating service:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/services/:id
router.delete("/:id", async (req, res) => {
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
