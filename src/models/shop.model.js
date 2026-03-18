import {db} from '../models/db.ts'


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