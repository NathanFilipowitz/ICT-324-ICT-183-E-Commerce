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
import { LoginController } from "@/controllers/login.controller.js";

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



        "/api/verifier-id": {
            POST: async (req) => {
                try {
                    const body = await req.json();
                    const { username, password } = body;

                    if (!username || !password) {
                        return new Response(
                            JSON.stringify({ error: "Champs manquants" }),
                            { status: 400 }
                        );
                    }

                    const valide = LoginController.checkUser(username, password);

                    return Response.json({ valide });

                    if (!username) {
                        return new Response(
                            JSON.stringify({ error: "Nom manquant" }),
                            { status: 400 }
                        );
                    }

                    const existe = LoginController.checkUser(username);

                    return Response.json({ existe });

                } catch (err) {
                    console.error(err);
                    return new Response(
                        JSON.stringify({ error: "Erreur serveur" }),
                        { status: 500 }
                    );
                }
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
