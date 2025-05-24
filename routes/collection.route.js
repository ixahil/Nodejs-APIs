import { Router } from "express";
import {
  createCollection,
  deleteCollectionBySlug,
  getCollectionBySlug,
  getCollections,
  updateCollection,
} from "../controllers/collection.controller.js";
import { authenticate } from "../middleware/authenticate.js";

export const collectionRouter = Router();

collectionRouter.get("/collections/:slug", getCollectionBySlug);
collectionRouter.get("/collections", getCollections);

// Protected
collectionRouter.post(
  "/admin/collections/create",
  authenticate(["ADMIN"]),
  createCollection
);
collectionRouter.put(
  "/admin/collections/:slug",
  authenticate(["ADMIN"]),
  updateCollection
);
collectionRouter.delete(
  "/admin/collections/:slug",
  authenticate(["ADMIN"]),
  deleteCollectionBySlug
);
