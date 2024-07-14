import pg from "pg";

export default function dbConnect() {
  const dbConnectionString = process.env.NEXT_PUBLIC_DATABASE_URL;
  const db = new pg.Pool({ connectionString: dbConnectionString });
  return db;
}
