import { PlaceWithInterests, UserPreferences, ScoredPlace, Intensity } from "../types";

const WEIGHTS = {
  interestMatch: 0.5,
  budgetFit: 0.25,
  popularity: 0.15,
  intensityFit: 0.1,
};

const IDEAL_MINUTES: Record<Intensity, number> = {
  relaxed: 45,
  moderate: 75,
  packed: 110,
};

function calculateInterestMatch(placeInterests: string[], userInterests: string[]): number {
  if (userInterests.length === 0) return 0.5; // neutral score if user picked no interests
  const matches = placeInterests.filter((interest) => userInterests.includes(interest));
  return matches.length / userInterests.length;
}

function calculateBudgetFit(placeBudget: number, userBudget: number): number {
  const diff = Math.abs(placeBudget - userBudget);
  return 1 - diff / 2;
}

function calculatePopularityNorm(popularity: number): number {
  return popularity / 100;
}

function calculateIntensityFit(avgVisitMinutes: number, intensity: Intensity): number {
  const ideal = IDEAL_MINUTES[intensity];
  const diff = Math.abs(avgVisitMinutes - ideal);
  const fit = 1 - diff / 120;
  return Math.max(0, Math.min(1, fit)); // clamp between 0 and 1
}

export function scorePlace(
  place: PlaceWithInterests,
  prefs: UserPreferences
): ScoredPlace {
  const interestMatch = calculateInterestMatch(place.interests, prefs.interests);
  const budgetFit = calculateBudgetFit(place.budget_level, prefs.budget);
  const popularityNorm = calculatePopularityNorm(place.popularity);
  const intensityFit = calculateIntensityFit(place.avg_visit_minutes, prefs.intensity);

  const score =
    WEIGHTS.interestMatch * interestMatch +
    WEIGHTS.budgetFit * budgetFit +
    WEIGHTS.popularity * popularityNorm +
    WEIGHTS.intensityFit * intensityFit;

  return {
    ...place,
    score: Math.round(score * 1000) / 1000, // round to 3 decimals for readability
    scoreBreakdown: {
      interestMatch,
      budgetFit,
      popularityNorm,
      intensityFit,
    },
  };
}

export function scoreAndRankPlaces(
  places: PlaceWithInterests[],
  prefs: UserPreferences
): ScoredPlace[] {
  return places
    .map((place) => scorePlace(place, prefs))
    .sort((a, b) => b.score - a.score);
}