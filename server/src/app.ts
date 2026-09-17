import express from "express";
import cors from "cors";
import placesRoutes from "./routes/places.routes";
import interestsRoutes from "./routes/interests.routes";
import recommendationsRoutes from "./routes/recommendations.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "TripSpark backend is running" });
});

app.use("/api/places", placesRoutes);
app.use("/api/interests", interestsRoutes);
app.use("/api/recommendations", recommendationsRoutes);

export default app;