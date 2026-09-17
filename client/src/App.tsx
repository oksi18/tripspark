import { useState } from "react";
import PreferenceForm from "./components/PreferenceForm";
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
      console.log("Recommendations response:", data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>TripSpark</h1>
      <PreferenceForm onSubmit={handleSubmit} isLoading={isLoading} />

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {result && (
        <p style={{ marginTop: "1rem" }}>
          ✅ Got a route with {result.route.length} day(s) — check the console for full data.
          (We'll build the real results UI tomorrow.)
        </p>
      )}
    </div>
  );
}

export default App;