/*
 * Filename: index.ts
 * Authors: Fabian Rostello, Gaëtan Gendroz, Nathan Filipowitz
 * Date: 2026-02-26
 * Purpose: 
 */

import { serve } from "bun";
import index from "./index.html";
import { setupDatabase } from "./models/db.ts";

setupDatabase();

const server = serve({
  routes: {
    "/*": index,
  },
  development: {
    hmr: true,
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
