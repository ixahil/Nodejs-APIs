import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductBySku,
  getProducts,
  getProductsByUser,
  updateProduct,
} from "../controllers/product.controller.js";
import { authenticate } from "../middleware/authenticate.js";

export const productRouter = Router();

productRouter.get("/products", getProducts);
productRouter.get("/products/:sku", getProductBySku);

// Protected Routes
productRouter.post(
  "/admin/products/create",
  authenticate(["ADMIN"]),
  createProduct
);
productRouter.put(
  "/admin/products/:sku",
  authenticate(["ADMIN"]),
  updateProduct
);
productRouter.delete(
  "/admin/products/:sku",
  authenticate(["ADMIN"]),
  deleteProduct
);

productRouter.get(
  "/admin/products",
  authenticate(["ADMIN"]),
  getProductsByUser
);
