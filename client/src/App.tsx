import { useState } from "react";
import PreferenceForm from "./components/PreferenceForm";
import RouteResult from "./components/RouteResult";
import { fetchRecommendations } from "./api/client";
import type { UserPreferences, RecommendationsResponse } from "./types";
import { CompassIcon, AlertIcon } from "./components/icons";

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
    <div className="container">
      <header className="hero">
        <div className="hero-eyebrow">
          <CompassIcon size={16} />
          Personalized trip planning
        </div>
        <h1>Your next trip, planned around you.</h1>
        <p>
          Tell TripSpark where you're headed, what you love, and how you like to move —
          we'll turn it into a day-by-day route worth following.
        </p>
      </header>

      <PreferenceForm onSubmit={handleSubmit} isLoading={isLoading} />

      {isLoading && (
        <div className="loading-row">
          <span className="spinner" style={{ borderTopColor: "var(--color-teal)", borderColor: "rgba(47,122,111,0.25)" }} />
          Matching places to your preferences...
        </div>
      )}

      {error && (
        <div className="top-error">
          <AlertIcon />
          {error}
        </div>
      )}

      {result && <RouteResult route={result.route} aiDescription={result.aiDescription} />}
    </div>
  );
}

export default App;