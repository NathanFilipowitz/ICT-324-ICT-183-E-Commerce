/*
 * Filename: controller.ts
 * Author: Nathan Filipowitz
 * Date: 2026-03-13
 * Purpose: Controller for the shop
 */

import * as model from "../models/db.ts";

const ProductController = {
  getAll: () => model.getAllProducts(),

  getById: (id: number) => {
    const product = model.getProductById(id);
    if (!product) throw new Error("Product not found");
    return product;
  },

  remove: (id: number) => model.deleteProduct(id)
};