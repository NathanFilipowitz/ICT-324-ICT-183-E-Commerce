/*
 * Filename: controller.ts
 * Author: Nathan Filipowitz
 * Date: 2026-03-13
 * Purpose: Controller for the shop
 */

import {ProductModel, CartModel, CatalogModel, SecurityModel} from "../models/shop.model.js"

export const CatalogController = {
    createOrder: async (status, address, client_id) => {
        return await CatalogModel.createOrder(status, address, client_id);
    },
    getOrder: async (client_id) => {
        return await CatalogModel.getOrder(client_id);
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

export const SecurityController = {
    isUserOrderRelated: async (clientId, orderId) => {
        const data = await SecurityModel.isUserOrderRelated(clientId, orderId);

        return (data.length > 0)
    }
}