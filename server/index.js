import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import servicesRouter from "./routes/services.js";
import authRouter from "./routes/auth.js";
import chatRouter from "./routes/chat.js";
import categoriesRouter from "./routes/categories.js";
import contactRouter from "./routes/contact.js";
import uploadRouter from "./routes/upload.js";
import statsRouter from "./routes/stats.js";
import translateRouter from "./routes/translate.js";
import { PORT, CORS_ORIGINS } from "./config.js";
import { errorMiddleware } from "./middleware/errorHandler.js";
import { generalLimiter } from "./middleware/rateLimiter.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({ origin: CORS_ORIGINS, credentials: true }));
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());
app.use(generalLimiter);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/services", servicesRouter);
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/contact", contactRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/stats", statsRouter);
app.use("/api/translate", translateRouter);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// Centralized error handling — replaces per-route try/catch
app.use(errorMiddleware);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  server.close(() => process.exit(0));
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
