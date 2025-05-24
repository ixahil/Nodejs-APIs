import { Router } from "express";
import { uploadMedia } from "../controllers/media.controller.js";
import { authenticate } from "../middleware/authenticate.js";

export const mediaRouter = Router();

mediaRouter.post("/media/upload", authenticate(["ADMIN"]), uploadMedia);
