/*
 * Filename: index.ts
 * Authors: Fabian Rostello, Gaëtan Gendroz, Nathan Filipowitz
 * Date: 2026-02-26
 * Purpose: 
 */

import {serve} from "bun";
import index from "./index.html";
import {setupDatabase} from "./models/db.ts";
import {CartController, CatalogController, ProductController} from "@/controllers/shop.controller.js";

setupDatabase();

const server = serve({
    routes: {
        "/api/product": async () => {
            try {
                const products = await ProductController.getAllProducts();

                if (!products) {
                    return new Response("Product not found", {status: 404});
                }

                return Response.json(products);
            } catch (error) {
                return new Response("Database Error", {status: 500});
            }
        },
        "/api/product/:id": async (req, res) => {
            const id = req.params.id;

            try {
                const product = await ProductController.getProductById(id);

                if (!product) {
                    return new Response("Product not found", {status: 404});
                }

                return Response.json(product);
            } catch (error) {
                return new Response("Database Error", {status: 500});
            }
        },
        "/api/cart/:clientId": async (req) => {
            const cart = await CartController.getCart(req.params.clientId);
            return Response.json(cart);
        },
        "/api/cart/add": async (req) => {
            let { clientId, productId, quantity } = await req.json();
            await CartController.addToCart(clientId, productId, quantity);
            return new Response("Added to cart", { status: 200 });
        },
        "/api/order/add": async (req) => {
            let { status, address, clientId } = await req.json();
            const order_id = await CatalogController.createOrder(status, address, clientId);
            return Response.json({
                message: "Order successful",
                order_id: order_id
            }, {status: 200});
        },
        "/api/order/:id": async (req) => {
            const id = req.params.id;
            const products = await CatalogController.getOrder(id);
            return Response.json({
                message: "Order retrieved",
                products: products
            }, { status: 200 });
        },
        "/*": index,
    },
    development: {
        hmr: true,
        console: true,
    },
});

console.log(`🚀 Server running at ${server.url}`);
