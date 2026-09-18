export type Intensity = "relaxed" | "moderate" | "packed";

export interface UserPreferences {
  city: string;
  days: number;
  budget: number;
  interests: string[];
  intensity: Intensity;
}

export interface ScoredPlace {
  id: number;
  name: string;
  city: string;
  description: string;
  category: string;
  budget_level: number;
  popularity: number;
  lat: string;
  lng: string;
  avg_visit_minutes: number;
  interests: string[];
  score: number;
  scoreBreakdown: {
    interestMatch: number;
    budgetFit: number;
    popularityNorm: number;
    intensityFit: number;
  };
}

export interface DayPlan {
  day: number;
  places: ScoredPlace[];
}

export interface RecommendationsResponse {
  preferences: UserPreferences;
  totalPlacesConsidered: number;
  route: DayPlan[];
  unusedTopPlaces: ScoredPlace[];
  aiDescription: string;
}