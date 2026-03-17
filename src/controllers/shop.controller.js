/*
 * Filename: controller.ts
 * Author: Nathan Filipowitz
 * Date: 2026-03-13
 * Purpose: Controller for the shop
 */

// import * as model from "../models/db.ts";

const model = {
  getAllProducts: () => {
    return 0;
  },
  getProductById: (id) => {
    return id;
  },
  deleteProduct: (id) => {
    return id;
  }
}

const ProductController = {
  getAll: () => model.getAllProducts(),

  getById: (id) => {
    const product = model.getProductById(id);
    if (!product) throw new Error("Product not found");
    return product;
  },

  remove: (id) => model.deleteProduct(id)
};