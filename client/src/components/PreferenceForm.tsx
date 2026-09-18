import { useState, useEffect } from "react";
import type { UserPreferences, Intensity } from "../types";
import { fetchInterests } from "../api/client";
import type { Interest } from "../api/client";
import {
  CompassIcon,
  CalendarIcon,
  WalletIcon,
  SparkIcon,
  GaugeIcon,
  CheckIcon,
  AlertIcon,
} from "./icons";

interface PreferenceFormProps {
  onSubmit: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

const CITIES = ["Lviv", "Krakow"];

const BUDGET_OPTIONS = [
  { value: 1, title: "€ Low", sub: "Budget-friendly" },
  { value: 2, title: "€€ Medium", sub: "Balanced" },
  { value: 3, title: "€€€ High", sub: "Treat yourself" },
];

const INTENSITY_OPTIONS: { value: Intensity; title: string; sub: string }[] = [
  { value: "relaxed", title: "Relaxed", sub: "2 places / day" },
  { value: "moderate", title: "Moderate", sub: "3 places / day" },
  { value: "packed", title: "Packed", sub: "4 places / day" },
];

function PreferenceForm({ onSubmit, isLoading }: PreferenceFormProps) {
  const [availableInterests, setAvailableInterests] = useState<Interest[]>([]);
  const [city, setCity] = useState(CITIES[0]);
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [intensity, setIntensity] = useState<Intensity>("moderate");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchInterests()
      .then(setAvailableInterests)
      .catch((err) => console.error("Failed to load interests:", err));
  }, []);

  function toggleInterest(name: string) {
    setSelectedInterests((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
    if (formError) setFormError(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (selectedInterests.length === 0) {
      setFormError("Pick at least one interest so we can personalize your route.");
      return;
    }

    setFormError(null);
    onSubmit({ city, days, budget, interests: selectedInterests, intensity });
  }

  return (
    <form onSubmit={handleSubmit} className="planner-card">
      <h2>Plan your trip</h2>

      {formError && (
        <div className="form-error">
          <AlertIcon />
          {formError}
        </div>
      )}

      <div className="field-group">
        <div className="field-label">
          <CompassIcon />
          City
        </div>
        <div className="option-grid">
          {CITIES.map((c) => (
            <button
              type="button"
              key={c}
              className={`option-card ${city === c ? "selected" : ""}`}
              onClick={() => setCity(c)}
            >
              {c}
              <span className="check">
                <CheckIcon />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="field-group">
        <div className="field-label">
          <CalendarIcon />
          Number of days
        </div>
        <div className="days-stepper">
          <button
            type="button"
            className="stepper-btn"
            onClick={() => setDays((d) => Math.max(1, d - 1))}
            disabled={days <= 1}
            aria-label="Decrease days"
          >
            −
          </button>
          <span className="days-value">{days}</span>
          <span className="days-unit">day{days !== 1 ? "s" : ""}</span>
          <button
            type="button"
            className="stepper-btn"
            onClick={() => setDays((d) => Math.min(14, d + 1))}
            disabled={days >= 14}
            aria-label="Increase days"
          >
            +
          </button>
        </div>
      </div>

      <div className="field-group">
        <div className="field-label">
          <WalletIcon />
          Budget level
        </div>
        <div className="tri-grid">
          {BUDGET_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt.value}
              className={`tri-card ${budget === opt.value ? "selected" : ""}`}
              onClick={() => setBudget(opt.value)}
            >
              <div className="tri-title">{opt.title}</div>
              <div className="tri-sub">{opt.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="field-group">
        <div className="field-label">
          <SparkIcon />
          Interests
        </div>
        <div className="chip-grid">
          {availableInterests.map((interest) => (
            <button
              type="button"
              key={interest.id}
              className={`chip ${selectedInterests.includes(interest.name) ? "selected" : ""}`}
              onClick={() => toggleInterest(interest.name)}
            >
              {interest.name}
            </button>
          ))}
        </div>
      </div>

      <div className="field-group">
        <div className="field-label">
          <GaugeIcon />
          Travel intensity
        </div>
        <div className="tri-grid">
          {INTENSITY_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt.value}
              className={`tri-card ${intensity === opt.value ? "selected" : ""}`}
              onClick={() => setIntensity(opt.value)}
            >
              <div className="tri-title">{opt.title}</div>
              <div className="tri-sub">{opt.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="spinner" />
            Generating your route...
          </>
        ) : (
          "Generate my route"
        )}
      </button>
    </form>
  );
}

export default PreferenceForm;