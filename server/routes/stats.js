import { Router } from "express";
import pool from "../db.js";
import { requireAdmin } from "./auth.js";
import v from "../validate.js";

const router = Router();

// POST /api/stats/visit — record a page visit (called from frontend)
router.post("/visit", async (req, res) => {
  try {
    const country = v.text(req.body.country, 100) || "Unknown";
    await pool.query(
      "INSERT INTO page_visits (country) VALUES ($1)",
      [country]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error("Error recording visit:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/stats/visits — aggregated visits by country (admin)
router.get("/visits", requireAdmin, async (req, res) => {
  try {
    const interval = getInterval(v.timeRange(req.query.range));
    const { rows } = await pool.query(
      `SELECT country, DATE(visited_at) AS date, COUNT(*)::int AS count
       FROM page_visits
       WHERE visited_at >= NOW() - $1::interval
       GROUP BY country, DATE(visited_at)
       ORDER BY date ASC`,
      [interval]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching visit stats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/stats/chats — aggregated chats by service type (admin)
router.get("/chats", requireAdmin, async (req, res) => {
  try {
    const interval = getInterval(v.timeRange(req.query.range));
    const { rows } = await pool.query(
      `SELECT COALESCE(service_ref, 'None') AS service_ref, DATE(created_at) AS date, COUNT(*)::int AS count
       FROM chats
       WHERE created_at >= NOW() - $1::interval
       GROUP BY COALESCE(service_ref, 'None'), DATE(created_at)
       ORDER BY date ASC`,
      [interval]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching chat stats:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

function getInterval(range) {
  switch (range) {
    case "1w": return "7 days";
    case "1m": return "1 month";
    case "6m": return "6 months";
    case "1y": return "1 year";
    default: return "1 month";
  }
}

export default router;
