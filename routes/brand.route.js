import { Router } from "express";
import {
  createBrand,
  deleteBrandBySlug,
  getBrandBySlug,
  getBrands,
  updateBrand,
} from "../controllers/brand.controller.js";
import { authenticate } from "../middleware/authenticate.js";

export const brandRouter = Router();

brandRouter.get("/brands/:slug", getBrandBySlug);
brandRouter.get("/brands", getBrands);

// Protected
brandRouter.post("/admin/brands/create", authenticate(["ADMIN"]), createBrand);
brandRouter.put("/admin/brands/:slug", authenticate(["ADMIN"]), updateBrand);
brandRouter.delete(
  "/admin/brands/:slug",
  authenticate(["ADMIN"]),
  deleteBrandBySlug
);
