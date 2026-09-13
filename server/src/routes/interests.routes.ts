import { Router, Request, Response } from "express";
import { getAllInterests } from "../services/interests.service";

const router = Router();

// GET /api/interests
router.get("/", async (req: Request, res: Response) => {
  try {
    const interests = await getAllInterests();
    res.json(interests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch interests" });
  }
});

export = router;