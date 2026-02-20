import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { LT_API_URL, LANGS } from "../config.js";
import v from "../validate.js";
import { translateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// Derived from LANGS in config.js — update that list to extend coverage here too
const ALLOWED_SOURCE_LANGS = new Set([...LANGS, "auto"]);
const ALLOWED_TARGET_LANGS = new Set(LANGS);
const ALLOWED_FORMATS = new Set(["text", "html"]);

// POST /api/translate — proxies to LibreTranslate, injecting the server-side API key
router.post("/", translateLimiter, asyncHandler(async (req, res) => {
  const apiKey = process.env.LT_TRANSLATE_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Translation service not configured" });
  }

  const q = v.text(req.body.q, 5000);
  const source = typeof req.body.source === "string" ? req.body.source.trim().toLowerCase() : null;
  const target = typeof req.body.target === "string" ? req.body.target.trim().toLowerCase() : null;
  const format = typeof req.body.format === "string" ? req.body.format.trim().toLowerCase() : "text";

  if (!q) return res.status(400).json({ error: "Missing or empty 'q' field" });
  if (!source || !ALLOWED_SOURCE_LANGS.has(source)) return res.status(400).json({ error: "Invalid 'source' language" });
  if (!target || !ALLOWED_TARGET_LANGS.has(target)) return res.status(400).json({ error: "Invalid 'target' language" });
  if (!ALLOWED_FORMATS.has(format)) return res.status(400).json({ error: "Invalid 'format' value" });

  try {
    const ltRes = await fetch(LT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q, source, target, format, api_key: apiKey }),
    });

    const data = await ltRes.json();

    if (!ltRes.ok) {
      return res.status(ltRes.status).json(data);
    }

    return res.json(data);
  } catch (err) {
    console.error("Error communicating with translation service:", err);
    return res.status(502).json({ error: "Failed to reach translation service" });
  }
}));

export default router;
