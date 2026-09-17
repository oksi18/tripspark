import type { ScoredPlace } from "../types";

interface PlaceCardProps {
  place: ScoredPlace;
}

const BUDGET_LABELS: Record<number, string> = {
  1: "€ Low",
  2: "€€ Medium",
  3: "€€€ High",
};

function PlaceCard({ place }: PlaceCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "0.75rem",
        background: "#fafafa",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h4 style={{ margin: 0 }}>{place.name}</h4>
        <span style={{ fontSize: "0.85rem", color: "#666" }}>
          match: {Math.round(place.score * 100)}%
        </span>
      </div>

      <p style={{ margin: "0.5rem 0", color: "#444" }}>{place.description}</p>

      <div style={{ fontSize: "0.85rem", color: "#666", display: "flex", gap: "1rem" }}>
        <span>{BUDGET_LABELS[place.budget_level]}</span>
        <span>~{place.avg_visit_minutes} min visit</span>
        <span>{place.interests.join(", ")}</span>
      </div>
    </div>
  );
}

export default PlaceCard;