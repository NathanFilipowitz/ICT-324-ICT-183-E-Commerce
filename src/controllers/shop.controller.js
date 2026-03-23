/*
 * Filename: controller.ts
 * Author: Nathan Filipowitz
 * Date: 2026-03-13
 * Purpose: Controller for the shop
 */

import {ProductModel, CartModel, CatalogModel} from "../models/shop.model.js"

export const CatalogController = {
    addOrder: async (status, address, client_id) => {
        return await CatalogModel.addOrder(status, address, client_id);
    }
}

export const ProductController = {
    getAllProducts: async () => {
        const products = await ProductModel.getAllProducts();
        if (!products) throw new Error("Products not found");
        return products;
    },

    getProductById: async (id) => {
        const product = await ProductModel.getProductById(id);
        if (!product) throw new Error("Product not found");
        return product;
    },

    remove: async (id) => {
        return await ProductModel.deleteProduct(id);
    }
};

export const CartController = {
    getCart: async (clientId) => {
        const cart = await CartModel.getCartByClientId(clientId);
        if (!cart) throw new Error("Cart not found");
        return cart;
    },
    addToCart: async (clientId, productId, quantity) => {
        return await CartModel.addToCart(clientId, productId, quantity);
    }
}