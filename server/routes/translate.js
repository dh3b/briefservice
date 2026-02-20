import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { LT_API_URL } from "../config.js";
import v from "../validate.js";

const router = Router();

// POST /api/translate — proxies to LibreTranslate, injecting the server-side API key
router.post("/", asyncHandler(async (req, res) => {
  const apiKey = process.env.LT_TRANSLATE_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Translation service not configured" });
  }

  const q = v.text(req.body.q, 5000);
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
