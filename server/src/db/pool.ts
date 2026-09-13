import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "oksana",
  database: "tripspark",
});