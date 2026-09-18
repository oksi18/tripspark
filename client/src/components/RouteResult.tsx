import { useState } from "react";
import type  { DayPlan } from "../types";
import PlaceCard from "./PlaceCard";
import { SparkIcon } from "./icons";

interface RouteResultProps {
  route: DayPlan[];
  aiDescription?: string;
}

function RouteResult({ route, aiDescription }: RouteResultProps) {
  const [activeDay, setActiveDay] = useState(1);

  const currentDayPlan = route.find((d) => d.day === activeDay);

  return (
    <section className="results-section">
      <div className="results-header">
        <h2>Your route</h2>
      </div>

      {aiDescription && (
        <div className="ai-summary">
          <SparkIcon />
          <span>{aiDescription}</span>
        </div>
      )}

      <div className="day-tabs">
        {route.map((dayPlan) => (
          <button
            key={dayPlan.day}
            className={`day-tab ${activeDay === dayPlan.day ? "active" : ""}`}
            onClick={() => setActiveDay(dayPlan.day)}
          >
            Day {dayPlan.day}
          </button>
        ))}
      </div>

      {currentDayPlan && currentDayPlan.places.length === 0 && (
        <div className="empty-day">
          No places matched for this day — try adjusting your interests or budget.
        </div>
      )}

      {currentDayPlan && currentDayPlan.places.length > 0 && (
        <div className="place-list">
          {currentDayPlan.places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </section>
  );
}

export default RouteResult;