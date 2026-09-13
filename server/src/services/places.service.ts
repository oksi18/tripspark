import { pool } from "../db/pool";
import { Place } from "../types";

export async function getAllPlaces(city?: string): Promise<Place[]> {
  if (city) {
    const result = await pool.query<Place>(
      "SELECT * FROM places WHERE LOWER(city) = LOWER($1) ORDER BY popularity DESC",
      [city]
    );
    return result.rows;
  }

  const result = await pool.query<Place>(
    "SELECT * FROM places ORDER BY popularity DESC"
  );
  return result.rows;
}

export async function getPlaceById(id: number): Promise<Place | null> {
  const result = await pool.query<Place>(
    "SELECT * FROM places WHERE id = $1",
    [id]
  );
  return result.rows[0] ?? null;
}