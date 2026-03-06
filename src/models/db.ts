import { Database } from "bun:sqlite";

export const db = new Database("shop.sqlite");

export function setupDatabase() {
  db.run(`PRAGMA foreign_keys = ON;`);
  
  db.transaction(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        stock INTEGER DEFAULT 0
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS commands (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        status TEXT NOT NULL,
        address TEXT NOT NULL,
        client_id INTEGER NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS order_items (
        product_id INTEGER NOT NULL,
        command_id INTEGER NOT NULL,
        quantity INTEGER DEFAULT 1
      )
    `);
  })();
}