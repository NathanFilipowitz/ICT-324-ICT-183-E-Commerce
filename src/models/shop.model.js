// import { sql } from "bun";
// import { Database } from "bun:sqlite"
import {db} from '../models/db.ts'

// export const db = new Database("shop.sqlite");


export const CatalogModel = {

}

const ProductModel = {
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

export default ProductModel