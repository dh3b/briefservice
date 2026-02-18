/** Shared server configuration — single source of truth */

export const LANGS = ["pl", "en"];
export const DEFAULT_LANG = "en";

export const PORT = process.env.PORT || 3001;

export const CORS_ORIGINS = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:8080", "http://localhost:5173"];

export const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";
export const SMTP_TOKEN = process.env.SMTP_TOKEN;

export const JWT_EXPIRY = "8h";

export const ADMIN_COOKIE_MAX_AGE = 8 * 60 * 60 * 1000;   // 8 hours
export const CHAT_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days

export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5 MB

export const MAX_TEXT_LEN = 500;
export const MAX_NAME_LEN = 255;
export const MAX_TITLE_LEN = 255;
export const MAX_DESC_LEN = 4096;
export const MAX_URL_LEN = 2048;
export const MAX_SHORT_TEXT_LEN = 100;

export const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "briefservice",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
};  
