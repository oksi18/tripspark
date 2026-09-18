import express, { Request, Response, NextFunction } from "express";
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

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON",
    });
  }

  next(err);
});

export default app;