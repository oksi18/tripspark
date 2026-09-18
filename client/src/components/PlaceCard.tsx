import type { ScoredPlace } from "../types";
import { WalletIcon, ClockIcon, TagIcon } from "./icons";

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
    <div className="place-card">
      <div className="place-card-top">
        <h4>{place.name}</h4>
        <span className="match-badge">{Math.round(place.score * 100)}% match</span>
      </div>

      <p>{place.description}</p>

      <div className="place-meta">
        <span>
          <WalletIcon size={15} />
          {BUDGET_LABELS[place.budget_level]}
        </span>
        <span>
          <ClockIcon />
          ~{place.avg_visit_minutes} min
        </span>
        <span>
          <TagIcon />
          {place.interests.join(", ")}
        </span>
      </div>
    </div>
  );
}

export default PlaceCard;