/*
 * Filename: controller.ts
 * Author: Nathan Filipowitz
 * Date: 2026-03-13
 * Purpose: Controller for the shop
 */

import ProductModel from "../models/shop.model.js"

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

  remove: (id) => model.deleteProduct(id)
};