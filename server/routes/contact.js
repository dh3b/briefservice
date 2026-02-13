import { Router } from "express";
import pool from "../db.js";
import v from "../validate.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = Router();

// POST /api/contact
router.post("/", asyncHandler(async (req, res) => {
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
}));

export default router;
