import { useState } from "react";
import PreferenceForm from "./components/PreferenceForm";
import RouteResult from "./components/RouteResult";
import { fetchRecommendations } from "./api/client";
import type { UserPreferences, RecommendationsResponse } from "./types";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RecommendationsResponse | null>(null);

  async function handleSubmit(prefs: UserPreferences) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchRecommendations(prefs);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>TripSpark</h1>
      <p style={{ color: "#666" }}>Personalized tourist route planner</p>

      <PreferenceForm onSubmit={handleSubmit} isLoading={isLoading} />

      {error && <p style={{ color: "red", marginTop: "1rem" }}>Error: {error}</p>}

      {isLoading && <p style={{ marginTop: "1rem" }}>Generating your personalized route...</p>}

      {result && <RouteResult route={result.route} aiDescription={result.aiDescription} />}
    </div>
  );
}

export default App;