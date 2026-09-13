import { pool } from "../db/pool";
import { Place } from "../types";

export interface PlaceWithInterests extends Place {
  interests: string[];
}

export async function getAllPlaces(city?: string): Promise<PlaceWithInterests[]> {
  const baseQuery = `
    SELECT
      p.*,
      COALESCE(
        ARRAY_AGG(i.name) FILTER (WHERE i.name IS NOT NULL),
        '{}'
      ) AS interests
    FROM places p
    LEFT JOIN place_interests pi ON pi.place_id = p.id
    LEFT JOIN interests i ON i.id = pi.interest_id
    ${city ? "WHERE LOWER(p.city) = LOWER($1)" : ""}
    GROUP BY p.id
    ORDER BY p.popularity DESC
  `;

  const result = city
    ? await pool.query<PlaceWithInterests>(baseQuery, [city])
    : await pool.query<PlaceWithInterests>(baseQuery);

  return result.rows;
}

export async function getPlaceById(id: number): Promise<PlaceWithInterests | null> {
  const result = await pool.query<PlaceWithInterests>(
    `
    SELECT
      p.*,
      COALESCE(
        ARRAY_AGG(i.name) FILTER (WHERE i.name IS NOT NULL),
        '{}'
      ) AS interests
    FROM places p
    LEFT JOIN place_interests pi ON pi.place_id = p.id
    LEFT JOIN interests i ON i.id = pi.interest_id
    WHERE p.id = $1
    GROUP BY p.id
    `,
    [id]
  );
  return result.rows[0] ?? null;
}