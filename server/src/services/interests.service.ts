import { pool } from "../db/pool";
import { Interest } from "../types";

export async function getAllInterests(): Promise<Interest[]> {
  const result = await pool.query<Interest>(
    "SELECT * FROM interests ORDER BY name ASC"
  );
  return result.rows;
}