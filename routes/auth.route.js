import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const router = Router();

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.post("/auth/verify", authController.verify);
router.post("/auth/resend-verification", authController.resendVerification);

const authRouter = router;

export { authRouter };
