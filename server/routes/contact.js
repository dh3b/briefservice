import { Router } from "express";
import pool from "../db.js";

const router = Router();

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await pool.query(
      "INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    // TODO: Configure SMTP to send email notifications
    // Set env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL
    // Then use nodemailer to send the form contents to CONTACT_EMAIL

    res.json({ message: "Message received" });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
