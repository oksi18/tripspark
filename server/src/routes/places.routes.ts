import { Router, Request, Response } from "express";
import { getAllPlaces, getPlaceById } from "../services/places.service";

const router = Router();

// GET /api/places
// GET /api/places?city=Lviv
router.get("/", async (req: Request, res: Response) => {
  try {
    const city = req.query.city as string | undefined;
    const places = await getAllPlaces(city);
    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

// GET /api/places/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid place id" });
    }

    const place = await getPlaceById(id);
    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    res.json(place);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch place" });
  }
});

export = router;