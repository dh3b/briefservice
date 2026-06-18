import { Router } from "express";
import { requireAdmin } from "./auth.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = Router();

// The builder container exposes a trigger endpoint on the internal network.
const BUILDER_URL = process.env.BUILDER_URL || "http://builder:9000/rebuild";
const COOLDOWN_MS = 10_000;

let lastTrigger = 0;

// POST /api/rebuild (admin) — kick off an in-place static rebuild.
router.post("/", requireAdmin, asyncHandler(async (_req, res) => {
  const now = Date.now();
  if (now - lastTrigger < COOLDOWN_MS) {
    return res.status(429).json({ error: "A rebuild was just triggered. Please wait a few seconds." });
  }
  lastTrigger = now;

  try {
    const r = await fetch(BUILDER_URL, { method: "POST" });
    if (!r.ok) throw new Error(`builder responded ${r.status}`);
    res.json({ status: "triggered" });
  } catch (err) {
    lastTrigger = 0; // allow retry on failure
    res.status(502).json({ error: `Could not reach the builder service: ${err.message}` });
  }
}));

export default router;
