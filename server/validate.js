/**
 * Shared input validation helpers.
 * - Caps text fields at a configurable max length (default 500).
 * - Strips non-UTF-8-safe control characters.
 * - Basic email regex check.
 */

const MAX_LEN = 500;

/** Remove non-printable control chars (keep newlines/tabs) */
function sanitize(str) {
  if (typeof str !== "string") return str;
  // eslint-disable-next-line no-control-regex
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
}

/** Validate & sanitize a plain text field */
export function text(val, maxLen = MAX_LEN) {
  if (typeof val !== "string") return null;
  const clean = sanitize(val);
  return clean.length > maxLen ? clean.slice(0, maxLen) : clean;
}

/** Validate email format */
export function email(val) {
  const clean = text(val, 255);
  if (!clean) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean) ? clean : null;
}

/** Validate URL format */
export function url(val) {
  const clean = text(val, 2048);
  if (!clean) return null;
  try {
    new URL(clean);
    return clean;
  } catch {
    return null;
  }
}

/** Validate sender_type enum */
export function senderType(val) {
  return val === "user" || val === "admin" ? val : null;
}

/** Validate stats range enum */
export function timeRange(val) {
  const allowed = ["1w", "1m", "6m", "1y"];
  return allowed.includes(val) ? val : "1m";
}

export default { text, email, url, senderType, timeRange };
