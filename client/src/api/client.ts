import type { UserPreferences, RecommendationsResponse } from "../types";

const API_BASE_URL = "http://localhost:4000/api";

export async function fetchRecommendations(
  prefs: UserPreferences
): Promise<RecommendationsResponse> {
  const response = await fetch(`${API_BASE_URL}/recommendations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prefs),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody.error || `Request failed with status ${response.status}`
    );
  }

  return response.json();
}

export interface Interest {
  id: number;
  name: string;
}

export async function fetchInterests(): Promise<Interest[]> {
  const response = await fetch(`${API_BASE_URL}/interests`);

  if (!response.ok) {
    throw new Error("Failed to fetch interests");
  }

  return response.json();
}