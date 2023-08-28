import { body } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

const authValidator = {
  createCategory: [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required.")
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long."),
    validationCheck,
  ],
};

export default authValidator;
