import { rateLimit } from "express-rate-limit";

const json429 = (_req, res) =>
  res.status(429).json({ error: "Too many requests, please try again later" });

/** Blanket catch-all — applied globally */
export const generalLimiter = rateLimit({
  windowMs: 60 * 1000,          // 1 min
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  handler: json429,
});

/** Brute-force protection on login */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,     // 15 min
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: json429,
});

/** Contact form — prevents inbox flood + DB spam */
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,     // 15 min
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: json429,
});

/** Chat session creation — prevents junk session flooding */
export const chatCreateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,     // 10 min
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: json429,
});

/** Chat message send — prevents message flooding */
export const chatMessageLimiter = rateLimit({
  windowMs: 60 * 1000,          // 1 min
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: json429,
});

/** Translate proxy — per-IP guard below LT key's 100/min ceiling */
export const translateLimiter = rateLimit({
  windowMs: 60 * 1000,          // 1 min
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: json429,
});

/** Stats visit recording — prevents analytics corruption */
export const statsVisitLimiter = rateLimit({
  windowMs: 60 * 1000,          // 1 min
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: json429,
});
