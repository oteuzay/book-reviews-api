import express from "express";
import authController from "../controllers/auth.controller.js";
import { authValidator } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/signup", authValidator.signUp, authController.signUp);
router.post("/signin", authValidator.signIn, authController.signIn);
router.post("/signout", authValidator.signOut, authController.signOut);
router.post(
  "/refreshToken",
  authValidator.refreshToken,
  authController.refreshToken
);

export default router;
