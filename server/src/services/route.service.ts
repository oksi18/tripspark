import { ScoredPlace, UserPreferences, DayPlan, RouteResult, Intensity } from "../types";
import { haversineDistanceKm } from "./distance.service";

const PLACES_PER_DAY: Record<Intensity, number> = {
  relaxed: 2,
  moderate: 3,
  packed: 4,
};

export function buildRoute(
  rankedPlaces: ScoredPlace[],
  prefs: UserPreferences
): RouteResult {
  const placesPerDay = PLACES_PER_DAY[prefs.intensity];
  const totalNeeded = placesPerDay * prefs.days;

  // Work on a copy so we can remove places as we assign them
  const remaining = [...rankedPlaces];
  const days: DayPlan[] = [];

  for (let dayNum = 1; dayNum <= prefs.days; dayNum++) {
    const dayPlaces: ScoredPlace[] = [];

    for (let slot = 0; slot < placesPerDay; slot++) {
      if (remaining.length === 0) break;

      let chosenIndex: number;

      if (dayPlaces.length === 0) {
        // First place of the day: just take the best-scoring remaining place
        chosenIndex = 0;
      } else {
        // Subsequent places: pick the closest remaining place to the last one added
        const lastPlace = dayPlaces[dayPlaces.length - 1];
        chosenIndex = findClosestIndex(remaining, lastPlace);
      }

      const [chosen] = remaining.splice(chosenIndex, 1);
      dayPlaces.push(chosen);
    }

    days.push({ day: dayNum, places: dayPlaces });
  }

  return {
    days,
    unusedPlaces: remaining.slice(0, Math.max(0, rankedPlaces.length - totalNeeded)),
  };
}

function findClosestIndex(candidates: ScoredPlace[], from: ScoredPlace): number {
  let closestIndex = 0;
  let closestDistance = Infinity;

  candidates.forEach((candidate, index) => {
    const dist = haversineDistanceKm(
      Number(from.lat),
      Number(from.lng),
      Number(candidate.lat),
      Number(candidate.lng)
    );
    if (dist < closestDistance) {
      closestDistance = dist;
      closestIndex = index;
    }
  });

  return closestIndex;
}