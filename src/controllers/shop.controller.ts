/*
 * Filename: controller.ts
 * Author: Nathan Filipowitz
 * Date: 2026-03-13
 * Purpose: Controller for the entire app
 */

import * as model from "../models/db.ts";

const ProductController = {
  create: (name: string, price: number, stock: number) => {
    if (price < 0) throw new Error("Price cannot be negative");
    if (stock < 0) throw new Error("Stock cannot be negative");
    return model.createProduct(name, price, stock);
  },

  getAll: () => model.getAllProducts(),

  getById: (id: number) => {
    const product = model.getProductById(id);
    if (!product) throw new Error("Product not found");
    return product;
  },

  updateStock: (id: number, newStock: number) => {
    if (newStock < 0) throw new Error("Stock cannot be negative");
    return model.updateProductStock(id, newStock);
  },

  remove: (id: number) => model.deleteProduct(id)
};