import dotenv from "dotenv";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Load .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173", // lokalni dev
    ],
    credentials: true,
  }),
);

// Routes

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
};

startServer();
