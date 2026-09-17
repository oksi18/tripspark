import { Router, Request, Response } from "express";
import { getAllPlaces } from "../services/places.service";
import { scoreAndRankPlaces } from "../services/scoring.service";
import { buildRoute } from "../services/route.service";
import { generateRouteDescription } from "../services/ai.service";
import { UserPreferences, Intensity } from "../types";

const router = Router();

const VALID_INTENSITIES: Intensity[] = ["relaxed", "moderate", "packed"];

function validatePreferences(body: any): { valid: boolean; error?: string } {
  if (!body.city || typeof body.city !== "string") {
    return { valid: false, error: "city is required and must be a string" };
  }
  if (!body.days || typeof body.days !== "number" || body.days < 1 || body.days > 14) {
    return { valid: false, error: "days is required and must be a number between 1 and 14" };
  }
  if (!body.budget || typeof body.budget !== "number" || body.budget < 1 || body.budget > 3) {
    return { valid: false, error: "budget is required and must be a number between 1 and 3" };
  }
  if (!Array.isArray(body.interests)) {
    return { valid: false, error: "interests must be an array of strings" };
  }
  if (!body.intensity || !VALID_INTENSITIES.includes(body.intensity)) {
    return { valid: false, error: `intensity must be one of: ${VALID_INTENSITIES.join(", ")}` };
  }
  return { valid: true };
}

// POST /api/recommendations
router.post("/", async (req: Request, res: Response) => {
  try {
    const validation = validatePreferences(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const prefs: UserPreferences = req.body;

    const places = await getAllPlaces(prefs.city);
    if (places.length === 0) {
      return res.status(404).json({ error: `No places found for city: ${prefs.city}` });
    }

    const rankedPlaces = scoreAndRankPlaces(places, prefs);
    const route = buildRoute(rankedPlaces, prefs);
    const aiDescription = await generateRouteDescription(route, prefs);

    res.json({
      preferences: prefs,
      totalPlacesConsidered: rankedPlaces.length,
      route: route.days,
      unusedTopPlaces: route.unusedPlaces.slice(0, 5),
      aiDescription,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
});

export default router;