import { Pool, QueryResult } from "pg";

const pool: Pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL!,
  ssl: { rejectUnauthorized: false },
});

async function main(): Promise<void> {
  const res: QueryResult<any> = await pool.query("SELECT * FROM USERS");
  console.log(res.rows);
}

main();

async function createTable() {
  await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
      );
    `);
}
createTable();

async function createRandomTable() {
  await pool.query(
    `
    CREATE TABLE IF NOT EXISTS fruits (
      id SERIAL PRIMARY KEY
    );
    `,
  );
}
createRandomTable();
