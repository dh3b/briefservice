import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import servicesRouter from "./routes/services.js";
import authRouter from "./routes/auth.js";
import chatRouter from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/services", servicesRouter);
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
