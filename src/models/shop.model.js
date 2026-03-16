// import { sql } from "bun";
import { Database } from "bun:sqlite"

export const db = new Database("shop.sqlite");


export const CatalogModel = {

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