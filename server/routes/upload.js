import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import fileTypePkg from "file-type";
const { fileTypeFromFile } = fileTypePkg;
import { requireAdmin } from "./auth.js";
import { MAX_UPLOAD_SIZE } from "../config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "uploads"),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (_req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(Object.assign(new Error("Invalid file type. Allowed: JPEG, PNG, WebP, GIF"), { code: "INVALID_FILE_TYPE" }));
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: MAX_UPLOAD_SIZE } });

const router = Router();

// POST /api/upload (admin)
router.post("/", requireAdmin, upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  // Validate actual file content via magic bytes
  const detected = await fileTypeFromFile(req.file.path);
  if (!detected || !ALLOWED_MIME_TYPES.includes(detected.mime)) {
    fs.unlink(req.file.path, () => {});
    return res.status(400).json({ error: "Invalid file content. Allowed: JPEG, PNG, WebP, GIF" });
  }

  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

export default router;
