import { body } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

export const authValidator = {
  signUp: [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required.")
      .isLength({ min: 5 })
      .withMessage("Username must be at least 5 characters long."),
    body("email").trim().isEmail().withMessage("Invalid email address.").normalizeEmail(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    validationCheck,
  ],
  signIn: [
    body("email").trim().isEmail().withMessage("Invalid email address.").normalizeEmail(),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    validationCheck,
  ],
  signOut: [
    body("refreshToken").trim().notEmpty().withMessage("Refresh token is required."),
    validationCheck,
  ],
  refreshToken: [
    body("refreshToken").trim().notEmpty().withMessage("Refresh token is required."),
    validationCheck,
  ],
};
