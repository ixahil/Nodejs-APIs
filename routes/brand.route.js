import { Router } from "express";
import {
  createBrand,
  deleteBrandBySlug,
  getBrandBySlug,
  getBrands,
} from "../controllers/brand.controller.js";
import { authenticate } from "../middleware/authenticate.js";

export const brandRouter = Router();

brandRouter.get("/brands/:slug", getBrandBySlug);
brandRouter.get("/brands", getBrands);

// Protected
brandRouter.post("/brands/create", authenticate(["ADMIN"]), createBrand);
brandRouter.delete("/brands/:slug", deleteBrandBySlug);
