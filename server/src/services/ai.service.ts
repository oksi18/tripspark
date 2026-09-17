import { RouteResult, UserPreferences } from "../types";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

/**
 * Generates a short, friendly natural-language description of an already-built
 * route. The AI does NOT choose places or scores — it only describes data our
 * own algorithm already produced. If the API key is missing or the call fails,
 * we fall back to a simple template so the app still works end-to-end.
 */
export async function generateRouteDescription(
  route: RouteResult,
  prefs: UserPreferences
): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    return buildFallbackDescription(route, prefs);
  }

  try {
    const placesSummary = route.days
      .map((day) => {
        const names = day.places.map((p) => p.name).join(", ");
        return `Day ${day.day}: ${names || "no places assigned"}`;
      })
      .join("\n");

    const prompt = `You are writing a short, friendly trip summary for a tourist route planning app.

Trip details:
- City: ${prefs.city}
- Duration: ${prefs.days} days
- Interests: ${prefs.interests.join(", ")}
- Travel pace: ${prefs.intensity}

Planned itinerary:
${placesSummary}

Write ONLY the final 2-3 sentence trip summary.

Do not show your reasoning, analysis, thinking process, steps, or notes.
Do not explain how you created the summary.
Do not use markdown formatting.
Return only the final summary text.`;
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "TripSpark",
      },
      body: JSON.stringify({
        model: "google/gemma-4-31b-it:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `OpenRouter API error ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const text = data.choices?.[0]?.message?.content;

    if (typeof text === "string" && text.trim()) {
      return text.trim();
    }

    return buildFallbackDescription(route, prefs);
    } catch (err) {
    console.error("OPENROUTER ERROR:", err);
    return buildFallbackDescription(route, prefs);
    }
}

function buildFallbackDescription(
  route: RouteResult,
  prefs: UserPreferences
): string {
  const totalPlaces = route.days.reduce(
    (sum, day) => sum + day.places.length,
    0
  );

  return `A ${prefs.days}-day ${prefs.intensity}-paced trip to ${prefs.city}, featuring ${totalPlaces} places matched to your interest in ${prefs.interests.join(
    ", "
  )}.`;
}