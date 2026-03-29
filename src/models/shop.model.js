import db from "../../shop.sqlite" with {type: "sqlite"};

export const CatalogModel = {
    createOrder: async (status, address, client_id) => {
        try {
            const result = db.query(`INSERT INTO commands (status, address, clients_id)
                                     VALUES ($status, $address, $client_id) RETURNING id`).get({
                $status: status,
                $address: address,
                $client_id: client_id
            });

            const orderId = result.id;

            // add to 'products_has_commands' table
            const productIds = db.query("SELECT products_id FROM cart_items WHERE clients_id = $client_id").all({$client_id: client_id});
            productIds.map(p => {
                db.query(`INSERT INTO products_has_commands (products_id, commands_id) VALUES ($productsId, $orderId)`).get({
                    $productsId: p.products_id,
                    $orderId: orderId
                });
            })

            // delete user cart
            db.query("DELETE FROM cart_items WHERE clients_id = $client_id").all({$client_id: client_id});

            return orderId;
        } catch (err) {
            throw err;
        }
    },
    getOrder: async (order_id) => {
        try {
            return db.query(`SELECT p.name, p.price
                             FROM products p
                                      JOIN
                                  products_has_commands phc ON p.id = phc.products_id
                             WHERE phc.commands_id = $order_id;`).all({$order_id: order_id});
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

export const SecurityModel = {
    isUserOrderRelated: async (clientId, orderId) => {
        try {
            const response = db.query(`SELECT *
                             FROM commands
                             WHERE id = $orderId AND clients_id = $clientId`).all({$orderId: orderId, $clientId: clientId});

            return response.length > 0
        } catch (err) {
            throw err;
        }
    }
}