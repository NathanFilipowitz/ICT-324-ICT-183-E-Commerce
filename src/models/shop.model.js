import {db} from '../models/db.ts'


export const CatalogModel = {
    addOrder: async (status, address, client_id) => {
        try {
            console.log(`status: ${status}, address: ${address}, client_id: ${client_id}`)
            return db.run(`INSERT INTO commands (status, address, client_id) VALUES ('${status}', '${address}', ${client_id})`);
        } catch (err) {
            throw err;
        }
    }
}

export const ProductModel = {
    getAllProducts: async () => {
        try {
            return db.query("SELECT * FROM products").all();
        } catch (err) {
            throw err;
        }
    },
    getProductById: async (id) => {
        try {
            return db.query(`SELECT * FROM products WHERE id = ${id}`).get();
        } catch (err) {
            throw err;
        }
    }
}

export const CartModel = {
    getCartByClientId: async (clientId) => {
        try {
            return db.query(`SELECT p.*, c.quantity FROM products p JOIN cart_items c ON p.id = c.products_id WHERE c.clients_id = ${clientId}`).all();
        } catch (err) {
            throw err;
        }
    },
    // AI HELP: generate an SQL way to add to cart, updating quantity instead of duplicating the row
    addToCart: async (clientId, productId, quantity) => {
        try {
            return db.run(`
                INSERT INTO cart_items (clients_id, products_id, quantity)
                VALUES (${clientId}, ${productId}, ${quantity})
                    ON CONFLICT(clients_id, products_id) DO UPDATE SET quantity = quantity + ${quantity} 
            `);
        } catch (err) {
            throw err;
        }
    }
}