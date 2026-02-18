/** Centralized frontend configuration — single source of truth */

export const LIBRETRANSLATE_URL =
  import.meta.env.VITE_LIBRETRANSLATE_URL || "/translate";
export const API_BASE =
  import.meta.env.VITE_API_URL || "/api";

export const POLL_INTERVAL_MESSAGES = 3000;
export const POLL_INTERVAL_CHAT_LIST = 5000;

export const MAX_MESSAGE_LEN = 500;
export const MAX_NAME_LEN = 100;
export const MAX_EMAIL_LEN = 255;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FALLBACK_LANGUAGE = "en" as const;
export const BASE_DOMAIN = "dheb.site";

/**
 * Maps app language codes to LibreTranslate language codes.
 * Currently 1:1 but abstracted for future divergence.
 */
export const LANG_TO_LT: Record<string, string> = {
  pl: "pl", en: "en",
};
