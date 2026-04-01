import { Database } from "bun:sqlite";

const db = new Database("shop.sqlite");

export function setupDatabase() {
  db.run(`PRAGMA foreign_keys = ON;`);
  
  db.transaction(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(45) NOT NULL,
        username VARCHAR(45) NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(45) NOT NULL,
        price REAL NOT NULL,
        stock INTEGER DEFAULT 0
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS commands (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        status VARCHAR(45) NOT NULL,
        address VARCHAR(45) NOT NULL,
        clients_id INTEGER NOT NULL,
        FOREIGN KEY (clients_id) REFERENCES clients(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS products_has_commands (
        products_id INTEGER NOT NULL,
        commands_id INTEGER NOT NULL,
        PRIMARY KEY (products_id, commands_id),
        FOREIGN KEY (products_id) REFERENCES products(id),
        FOREIGN KEY (commands_id) REFERENCES commands(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS cart_items (
        clients_id INTEGER NOT NULL,
        products_id INTEGER NOT NULL,
        quantity INTEGER DEFAULT 1,
        PRIMARY KEY (clients_id, products_id),
        FOREIGN KEY (clients_id) REFERENCES clients(id),
        FOREIGN KEY (products_id) REFERENCES products(id)
      )
    `);

    db.run(`
      INSERT INTO clients (id, name, username, password) VALUES
        (1, 'Alice Smith', 'alice.s', '$2b$10$KC6ovQP3sicmKsdLYlRBTO9m4VS6ASe7B3I3f1NDpYa/GFjQmCjdm'),
        (2, 'Bob Johnson', 'bjohnson', 'secure456'),
        (3, 'Charlie Brown', 'cbrown', 'charlie789'),
        (4, 'Diana Prince', 'dprince', 'wonder101'),
        (5, 'Edward Norton', 'enorton', 'fight001'),
        (6, 'Fiona Apple', 'fapple', 'crimson202'),
        (7, 'George Miller', 'gmiller', 'madmax303'),
        (8, 'Hannah Abbott', 'habbott', 'huffle404'),
        (9, 'Ian Wright', 'iwright', 'arsenal505'),
        (10, 'Julia Roberts', 'jroberts', 'pretty606');
    `);

    db.run(`
      INSERT INTO products (id, name, price, stock) VALUES
        (1, 'Laptop', 1200.00, 50),
        (2, 'Smartphone', 800.00, 100),
        (3, 'Headphones', 150.00, 200),
        (4, 'Keyboard', 80.00, 150),
        (5, 'Mouse', 40.00, 300),
        (6, 'Monitor', 300.00, 80),
        (7, 'Tablet', 500.00, 120),
        (8, 'Smartwatch', 250.00, 180),
        (9, 'Webcam', 90.00, 90),
        (10, 'Microphone', 120.00, 70),
        (11, 'Printer', 200.00, 40),
        (12, 'External SSD', 110.00, 110),
        (13, 'Gaming Chair', 250.00, 30),
        (14, 'USB-C Cable', 15.00, 500),
        (15, 'Router', 130.00, 60),
        (16, 'Speakers', 180.00, 85),
        (17, 'Graphics Card', 600.00, 25),
        (18, 'RAM 16GB', 95.00, 140),
        (19, 'Power Bank', 55.00, 220),
        (20, 'Desk Lamp', 35.00, 100);
    `);

    db.run(`
      INSERT INTO commands (id, status, address, clients_id) VALUES
       (1, 'Shipped', '123 Pine St', 1), (2, 'Pending', '123 Pine St', 1),
       (3, 'Delivered', '456 Oak Ave', 2), (4, 'Shipped', '789 Maple Dr', 3),
       (5, 'Processing', '101 Cedar Ln', 4), (6, 'Cancelled', '202 Birch Rd', 5),
       (7, 'Delivered', '303 Elm St', 6), (8, 'Shipped', '404 Walnut St', 7),
       (9, 'Pending', '505 Cherry Ct', 8), (10, 'Delivered', '606 Ash Way', 9),
       (11, 'Processing', '707 Willow Blvd', 10), (12, 'Shipped', '123 Pine St', 1);
    `);

    db.run(`
      INSERT INTO commands (id, status, address, clients_id) VALUES
       (1, 'Shipped', '123 Pine St', 1), (2, 'Pending', '123 Pine St', 1),
       (3, 'Delivered', '456 Oak Ave', 2), (4, 'Shipped', '789 Maple Dr', 3),
       (5, 'Processing', '101 Cedar Ln', 4), (6, 'Cancelled', '202 Birch Rd', 5),
       (7, 'Delivered', '303 Elm St', 6), (8, 'Shipped', '404 Walnut St', 7),
       (9, 'Pending', '505 Cherry Ct', 8), (10, 'Delivered', '606 Ash Way', 9),
       (11, 'Processing', '707 Willow Blvd', 10), (12, 'Shipped', '123 Pine St', 1);
    `);

    db.run(`
      INSERT INTO products_has_commands (products_id, commands_id) VALUES
        (1, 1), (3, 1), (2, 2), (5, 3), (7, 4), (10, 5), (12, 6), (15, 7), 
        (18, 8), (19, 9), (20, 10), (4, 11), (6, 12), (8, 1), (11, 2);
    `);

    db.run(`
      INSERT INTO cart_items (clients_id, products_id, quantity) VALUES
        -- Client 1
        (1, 4, 1), (1, 9, 2), (1, 14, 1), (1, 18, 2), (1, 2, 1), (1, 11, 1),
        -- Client 2
        (2, 1, 1), (2, 5, 3), (2, 8, 1), (2, 12, 1), (2, 15, 2), (2, 20, 1),
        -- Client 3
        (3, 3, 2), (3, 6, 1), (3, 10, 1), (3, 13, 1), (3, 17, 1), (3, 19, 3),
        -- Client 4
        (4, 2, 1), (4, 4, 1), (4, 7, 2), (4, 11, 1), (4, 14, 5), (4, 16, 1),
        -- Client 5
        (5, 5, 2), (5, 8, 1), (5, 12, 2), (5, 15, 1), (5, 18, 1), (5, 1, 1),
        -- Client 6
        (6, 9, 1), (6, 13, 1), (6, 16, 2), (6, 20, 4), (6, 3, 1), (6, 6, 1),
        -- Client 7
        (7, 10, 1), (7, 14, 3), (7, 17, 1), (7, 2, 1), (7, 4, 2), (7, 7, 1),
        -- Client 8
        (8, 11, 1), (8, 15, 1), (8, 19, 2), (8, 5, 5), (8, 8, 1), (8, 12, 1),
        -- Client 9
        (9, 1, 1), (9, 3, 2), (9, 6, 1), (9, 9, 1), (9, 13, 1), (9, 18, 2),
        -- Client 10
        (10, 20, 5), (10, 16, 1), (10, 12, 1), (10, 7, 1), (10, 4, 2), (10, 1, 1);
    `);

  })();
}