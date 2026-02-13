import { Router } from "express";
import pool from "../db.js";
import { requireAdmin } from "./auth.js";
import v from "../validate.js";
import { CHAT_COOKIE_MAX_AGE } from "../config.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = Router();

function generateChatTitle() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let suffix = "";
  for (let i = 0; i < 5; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `Chat_${suffix}`;
}

// POST /api/chats — create a new chat session
router.post("/", asyncHandler(async (req, res) => {
  const user_name = v.text(req.body.user_name, 100);
  const user_email = v.email(req.body.user_email);
  const service_ref = v.text(req.body.service_ref, 255);
  const title = generateChatTitle();

  const { rows } = await pool.query(
    "INSERT INTO chats (user_name, user_email, service_ref, title) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_name || null, user_email || null, service_ref || null, title]
  );

  res.cookie("chat_id", rows[0].id, {
    httpOnly: false,
    maxAge: CHAT_COOKIE_MAX_AGE,
    sameSite: "lax",
  });

  res.status(201).json(rows[0]);
}));

// GET /api/chats — list all chats (admin)
router.get("/", requireAdmin, asyncHandler(async (_req, res) => {
  const { rows } = await pool.query(
    `SELECT c.*,
      (SELECT content FROM messages WHERE chat_id = c.id ORDER BY timestamp DESC LIMIT 1) AS last_message,
      (SELECT COUNT(*) FROM messages WHERE chat_id = c.id)::int AS message_count
     FROM chats c ORDER BY c.created_at DESC`
  );
  res.json(rows);
}));

// GET /api/chats/:id/messages
router.get("/:id/messages", asyncHandler(async (req, res) => {
  const chatCheck = await pool.query("SELECT id FROM chats WHERE id = $1", [req.params.id]);
  if (chatCheck.rows.length === 0) {
    return res.status(404).json({ error: "Chat not found" });
  }
  const { rows } = await pool.query(
    "SELECT * FROM messages WHERE chat_id = $1 ORDER BY timestamp ASC",
    [req.params.id]
  );
  res.json(rows);
}));

// POST /api/chats/:id/messages
router.post("/:id/messages", asyncHandler(async (req, res) => {
  const sender = v.senderType(req.body.sender_type);
  const content = v.text(req.body.content, 500);
  if (!sender || !content) {
    return res.status(400).json({ error: "Valid sender_type and content required" });
  }

  const { rows } = await pool.query(
    "INSERT INTO messages (chat_id, sender_type, content) VALUES ($1, $2, $3) RETURNING *",
    [req.params.id, sender, content]
  );
  res.status(201).json(rows[0]);
}));

// PUT /api/chats/:id — update chat title/service_ref
router.put("/:id", asyncHandler(async (req, res) => {
  const { title, service_ref } = req.body;
  const sets = [];
  const vals = [];
  let idx = 1;

  if (title !== undefined) {
    sets.push(`title = $${idx++}`);
    vals.push(v.text(title, 255));
  }
  if (service_ref !== undefined) {
    sets.push(`service_ref = $${idx++}`);
    vals.push(v.text(service_ref, 255));
  }

  if (sets.length === 0) return res.status(400).json({ error: "Nothing to update" });

  vals.push(req.params.id);
  const { rows } = await pool.query(
    `UPDATE chats SET ${sets.join(", ")} WHERE id = $${idx} RETURNING *`,
    vals
  );
  if (rows.length === 0) return res.status(404).json({ error: "Chat not found" });
  res.json(rows[0]);
}));

// DELETE /api/chats/:id (admin)
router.delete("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const { rowCount } = await pool.query("DELETE FROM chats WHERE id = $1", [req.params.id]);
  if (rowCount === 0) return res.status(404).json({ error: "Chat not found" });
  res.json({ message: "Chat deleted" });
}));

// PUT /api/chats/:id/assign (admin claims a chat)
router.put("/:id/assign", requireAdmin, asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    "UPDATE chats SET admin_id = $1 WHERE id = $2 RETURNING *",
    [req.admin.id, req.params.id]
  );
  if (rows.length === 0) return res.status(404).json({ error: "Chat not found" });
  res.json(rows[0]);
}));

export default router;
