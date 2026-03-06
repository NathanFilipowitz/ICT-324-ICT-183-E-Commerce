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

// --- PRODUCT FUNCTIONS ---

 export function createProduct(name: string, price: number, stock: number) {
  return db.run(`INSERT INTO products (name, price, stock) VALUES ('${name}', ${price}, ${stock})`);
}

export function getAllProducts() {
  return db.query("SELECT * FROM products").all();
}

export function getProductById(id: any) {
  return db.query(`SELECT * FROM products WHERE id = ${id}`).get();
}

export function updateProductStock(id: any, newStock: number) {
  db.run(`UPDATE products SET stock = ${newStock} WHERE id = ${id}`);
}

export function deleteProduct(id: any) {
  db.run(`DELETE FROM products WHERE id = ${id}`);
}

// --- CLIENT FUNCTIONS ---

export function createClient(name: string, username: string, passwordHash: string) {
  return db.run(`INSERT INTO clients (name, username, password) VALUES ('${name}', '${username}', '${passwordHash}')`);
}

export function getClientByUsername(username: string) {
  return db.query(`SELECT * FROM clients WHERE username = '${username}'`).get();
}

// --- ORDER FUNCTIONS ---

export function createOrder(clientId: any, address: string, productIds: number[]) {
  const result: any = db.query(
    `INSERT INTO commands (status, address, client_id) VALUES ('pending', '${address}', ${clientId}) RETURNING id`
  ).get();
  
  const orderId = result.id;

  for (const pId of productIds) {
    db.run(`INSERT INTO order_items (command_id, product_id) VALUES (${orderId}, ${pId})`);
  }
  
  return orderId;
}