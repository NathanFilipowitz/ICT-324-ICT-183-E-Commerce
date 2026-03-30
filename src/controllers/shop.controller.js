/*
 * Filename: controller.ts
 * Author: Nathan Filipowitz
 * Date: 2026-03-13
 * Purpose: Controller for the shop
 */

import jwt from 'jsonwebtoken'
import {ProductModel, CartModel, CatalogModel, SecurityModel} from "../models/shop.model.js"

export const CatalogController = {
    createOrder: async (status, address, client_id) => {
        return await CatalogModel.createOrder(status, address, client_id);
    },
    getOrder: async (req) => {
        const orderId = req.params.id;

        // verify user (broken access control)
        const user = authenticateToken(req);

        const isOrderClientRelated = await SecurityModel.isUserOrderRelated(user.id, orderId);
        if (!user || !isOrderClientRelated) {
            const err = new Error("Unauthorized access.")
            err.status = 401;
            throw err;
        }

        return await CatalogModel.getOrder(orderId);
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

const authenticateToken = (req) => {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return null;

    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        return null;
    }
};