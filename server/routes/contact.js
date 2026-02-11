import { Router } from "express";
import pool from "../db.js";
import v from "../validate.js";

const router = Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const name = v.text(req.body.name, 255);
    const emailVal = v.email(req.body.email);
    const message = v.text(req.body.message, 500);

    if (!name || !emailVal || !message) {
      return res.status(400).json({ error: "Valid name, email and message are required" });
    }

    await pool.query(
      "INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3)",
      [name, emailVal, message]
    );

    res.json({ message: "Message received" });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
