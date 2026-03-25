import db from "../../shop.sqlite" with {type: "sqlite"};

export const CatalogModel = {
    createOrder: async (status, address, client_id) => {
        const result = db.query(`INSERT INTO commands (status, address, clients_id)
                                 VALUES ($status, $address, $client_id) RETURNING id`).get({
            $status: `'${status}'`,
            $address: `'${address}'`,
            $client_id: client_id
        });

        const orderId = result.id;

        let productIds = db.query("SELECT products_id FROM cart_items WHERE clients_id = $client_id").all({$client_id: client_id});

        productIds.map(p => {
            db.query(`INSERT INTO products_has_commands (commands_id, products_id)
                    VALUES ($orderId, $productsId)`).get({
                $orderId: orderId,
                $productsId: p.products_id
            });
        })

        return orderId;
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
            return db.query(`SELECT *
                             FROM products
                             WHERE id = $id`)
                .get({$id: id});
        } catch (err) {
            throw err;
        }
    }
}

export const CartModel = {
    getCartByClientId: async (clientId) => {
        try {
            return db.query(`SELECT p.*, c.quantity
                             FROM products p
                                      JOIN cart_items c ON p.id = c.products_id
                             WHERE c.clients_id = $clientId`).all({$clientId: clientId});
        } catch (err) {
            throw err;
        }
    },
    // AI HELP: generate an SQL way to add to cart, updating quantity instead of duplicating the row
    addToCart: async (clientId, productId, quantity) => {
        try {
            return db.run(`
                INSERT INTO cart_items (clients_id, products_id, quantity)
                VALUES (${clientId}, ${productId}, ${quantity}) ON CONFLICT(clients_id, products_id) DO
                UPDATE SET quantity = quantity + ${quantity}
            `);
        } catch (err) {
            throw err;
        }
    }
}