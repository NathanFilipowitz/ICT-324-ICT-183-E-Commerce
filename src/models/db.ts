import { Database } from "bun:sqlite";

export const db = new Database("shop.sqlite");

export function setupDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0
    )
  `);
  
  console.log("Database ready");
}