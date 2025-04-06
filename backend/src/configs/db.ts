import pkg from "pg";
import { QueryResult } from "pg";
import dotenv from "dotenv";

// Charge les variables d'environnement
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  port: 5432,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// Pour le debug, affichons la base de données utilisée
console.log("Connecting to database:", process.env.DATABASE_NAME);

const query = async (
  text: string,
  params: any[] | undefined
): Promise<QueryResult> => {
  return await pool.query(text, params);
};

export { query, pool };
