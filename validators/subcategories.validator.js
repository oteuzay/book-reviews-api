import { body, param } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

const authValidator = {
  getSubcategories: [
    param("categoryID").isUUID().withMessage("categoryID must be in UUID format."),
    validationCheck,
  ],
  createSubcategories: [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required.")
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long."),
    param("categoryID").isUUID().withMessage("categoryID must be in UUID format."),
    validationCheck,
  ],
};

export default authValidator;
