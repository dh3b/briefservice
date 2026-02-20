import { Router } from "express";
import pool from "../db.js";
import v from "../validate.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { SMTP_TOKEN } from "../config.js";
import { MailtrapClient } from "mailtrap";
import { contactEmailHtml } from "../templates/contactEmail.js";
import { contactLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// POST /api/contact
router.post("/", contactLimiter, asyncHandler(async (req, res) => {
  const name = v.text(req.body.name, 255);
  const emailVal = v.email(req.body.email);
  const message = v.text(req.body.message, 500);

  if (!name || !emailVal || !message) {
    return res.status(400).json({ error: "Valid name, email and message are required" });
  }

  const mailtrap = new MailtrapClient({ token: SMTP_TOKEN });

  await mailtrap.send({
    from: { name: "Brief Service", email: "contact@dheb.site" },
    to: [{ email: "ozootly@gmail.com" }],
    reply_to: { name, email: emailVal },
    subject: `BriefService Kontakt | ${name} napisał(a) wiadomość`,
    html: contactEmailHtml({ name, email: emailVal, message }),
    category: "Contact Form",
  });

  await pool.query(
    "INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3)",
    [name, emailVal, message]
  );

  res.json({ message: "Message received" });
}));

export default router;
