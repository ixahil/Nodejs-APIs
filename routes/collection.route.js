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

collectionRouter.get("/collection/:slug", getCollectionBySlug);
collectionRouter.get("/collection", getCollections);

// Protected
collectionRouter.post(
  "/admin/collection/create",
  authenticate(["ADMIN"]),
  createCollection
);
collectionRouter.put(
  "/admin/collection/:slug",
  authenticate(["ADMIN"]),
  updateCollection
);
collectionRouter.delete(
  "/admin/collection/:slug",
  authenticate(["ADMIN"]),
  deleteCollectionBySlug
);
