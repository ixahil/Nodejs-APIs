import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { getUser } from "../controllers/user.controller.js";

export const userRouter = Router();

// protected routes
// #swagger.tags = ['Users']
userRouter.get("/users/me", authenticate(), getUser);
