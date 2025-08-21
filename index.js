import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { conectionDB } from "./config/database.js";
import userRoutes from "./routes/index.js";
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 7000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/v1", userRoutes);
const startServer = async () => {
  try {
    await conectionDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Exiting app because DB connection failed");
    process.exit(1);
  }
};

startServer();
