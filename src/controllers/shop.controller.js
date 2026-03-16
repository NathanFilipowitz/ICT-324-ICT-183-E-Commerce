import {CatalogModel, ProductModel} from '../models/shop.model.js'

export const CatalogController = {

}

export const ProductController = {
    getAllProducts: async () => {
        return await ProductModel.getAllProducts();
    },
    getProductById: async (id) => {
        return await ProductModel.getProductById(id);
    }
}