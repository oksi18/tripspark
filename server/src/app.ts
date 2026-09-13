import express from "express";
import cors from "cors";
import { pool } from "./db/pool";
import placesRoutes = require("./routes/places.routes");
import interestsRoutes = require("./routes/interests.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "TripSpark backend is running" });
});

// Temporary test route — we'll remove this once places.routes.ts exists on Day 4
app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT count(*) FROM places");
    res.json({ placesCount: result.rows[0].count });
} catch (err) {
  console.error(err);
  res.status(500).json({
    error: String(err),
  });
}
});

app.use("/api/places", placesRoutes);
app.use("/api/interests", interestsRoutes)

export default app;