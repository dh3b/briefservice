import express from "express";
import cors from "cors";
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || ["http://localhost:8080", "http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(cookieParser());

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

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
