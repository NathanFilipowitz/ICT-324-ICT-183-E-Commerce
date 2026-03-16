/*
 * Filename: index.ts
 * Authors: Fabian Rostello, Gaëtan Gendroz, Nathan Filipowitz
 * Date: 2026-02-26
 * Purpose: 
 */

import {serve} from "bun";
import index from "./index.html";
import {setupDatabase} from "./models/db.ts";
import {ProductController} from "@/controllers/shop.controller.js";

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
        "/*": index,
    },
    development: {
        hmr: true,
        console: true,
    },
});

console.log(`🚀 Server running at ${server.url}`);
