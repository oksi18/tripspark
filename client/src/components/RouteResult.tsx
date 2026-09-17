import { useState } from "react";
import type { DayPlan } from "../types";
import PlaceCard from "./PlaceCard";

interface RouteResultProps {
  route: DayPlan[];
  aiDescription?: string;
}

function RouteResult({ route, aiDescription }: RouteResultProps) {
  const [activeDay, setActiveDay] = useState(1);

  const currentDayPlan = route.find((d) => d.day === activeDay);

  return (
    <div style={{ marginTop: "2rem", maxWidth: 600 }}>
      <h2>Your Route</h2>

      {aiDescription && (
        <p
          style={{
            fontStyle: "italic",
            background: "#eef6ff",
            padding: "0.75rem",
            borderRadius: "6px",
          }}
        >
          {aiDescription}
        </p>
      )}

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {route.map((dayPlan) => (
          <button
            key={dayPlan.day}
            onClick={() => setActiveDay(dayPlan.day)}
            style={{
              padding: "0.5rem 1rem",
              background: activeDay === dayPlan.day ? "#333" : "#eee",
              color: activeDay === dayPlan.day ? "#fff" : "#000",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Day {dayPlan.day}
          </button>
        ))}
      </div>

      {currentDayPlan && currentDayPlan.places.length === 0 && (
        <p>No places available for this day (not enough matching places found).</p>
      )}

      {currentDayPlan?.places.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </div>
  );
}

export default RouteResult;