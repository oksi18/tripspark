import { useState, useEffect } from "react";
import type { UserPreferences, Intensity } from "../types";
import { fetchInterests } from "../api/client";
import type { Interest } from "../api/client";

interface PreferenceFormProps {
  onSubmit: (prefs: UserPreferences) => void;
  isLoading: boolean;
}

const CITIES = ["Lviv", "Krakow"];

function PreferenceForm({ onSubmit, isLoading }: PreferenceFormProps) {
  const [availableInterests, setAvailableInterests] = useState<Interest[]>([]);
  const [city, setCity] = useState(CITIES[0]);
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [intensity, setIntensity] = useState<Intensity>("moderate");

  useEffect(() => {
    fetchInterests()
      .then(setAvailableInterests)
      .catch((err) => console.error("Failed to load interests:", err));
  }, []);

  function toggleInterest(name: string) {
    setSelectedInterests((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (selectedInterests.length === 0) {
      alert("Please select at least one interest.");
      return;
    }

    onSubmit({
      city,
      days,
      budget,
      interests: selectedInterests,
      intensity,
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
      <h2>Plan your trip</h2>

      <label style={{ display: "block", marginBottom: "1rem" }}>
        City
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: "block", marginBottom: "1rem" }}>
        Number of days
        <input
          type="number"
          min={1}
          max={14}
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        />
      </label>

      <label style={{ display: "block", marginBottom: "1rem" }}>
        Budget level
        <select value={budget} onChange={(e) => setBudget(Number(e.target.value))}>
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
        </select>
      </label>

      <fieldset style={{ marginBottom: "1rem" }}>
        <legend>Interests</legend>
        {availableInterests.map((interest) => (
          <label key={interest.id} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={selectedInterests.includes(interest.name)}
              onChange={() => toggleInterest(interest.name)}
            />
            {interest.name}
          </label>
        ))}
      </fieldset>

      <label style={{ display: "block", marginBottom: "1rem" }}>
        Travel intensity
        <select
          value={intensity}
          onChange={(e) => setIntensity(e.target.value as Intensity)}
        >
          <option value="relaxed">Relaxed (2 places/day)</option>
          <option value="moderate">Moderate (3 places/day)</option>
          <option value="packed">Packed (4 places/day)</option>
        </select>
      </label>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Generating route..." : "Generate my route"}
      </button>
    </form>
  );
}

export default PreferenceForm;