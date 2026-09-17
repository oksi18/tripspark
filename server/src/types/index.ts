export type Intensity = "relaxed" | "moderate" | "packed";

export interface UserPreferences {
  city: string;
  days: number;
  budget: number; // 1-3
  interests: string[];
  intensity: Intensity;
}

export interface ScoredPlace extends PlaceWithInterests {
  score: number;
  scoreBreakdown: {
    interestMatch: number;
    budgetFit: number;
    popularityNorm: number;
    intensityFit: number;
  };
}

export interface Place {
  id: number;
  name: string;
  city: string;
  description: string;
  category: string;
  budget_level: number;
  popularity: number;
  lat: number;
  lng: number;
  avg_visit_minutes: number;
}

export interface PlaceWithInterests extends Place {
  interests: string[];
}

export interface Interest {
  id: number;
  name: string;
}
export interface DayPlan {
  day: number;
  places: ScoredPlace[];
}

export interface RouteResult {
  days: DayPlan[];
  unusedPlaces: ScoredPlace[];
}