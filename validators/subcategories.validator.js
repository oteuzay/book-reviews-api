import { body, param } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

const authValidator = {
  getSubcategories: [
    param("categoryID")
      .trim()
      .notEmpty()
      .withMessage("categoryID is required.")
      .isUUID()
      .withMessage("categoryID must be in UUID format."),
    validationCheck,
  ],
  createSubcategory: [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required.")
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long."),
    body("sort_order")
      .trim()
      .notEmpty()
      .withMessage("sort_order is required.")
      .isInt()
      .withMessage("sort_order must be in Int format."),
    param("categoryID")
      .trim()
      .notEmpty()
      .withMessage("categoryID is required.")
      .isUUID()
      .withMessage("categoryID must be in UUID format."),
    validationCheck,
  ],
  updateSubcategory: [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required.")
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long."),
    body("sort_order")
      .trim()
      .notEmpty()
      .withMessage("sort_order is required.")
      .isInt()
      .withMessage("sort_order must be in Int format."),
    body("categoryID")
      .trim()
      .notEmpty()
      .withMessage("categoryID is required.")
      .isUUID()
      .withMessage("categoryID must be in UUID format."),
    param("subcategoryID")
      .trim()
      .notEmpty()
      .withMessage("subcategoryID is required.")
      .isUUID()
      .withMessage("subcategoryID must be in UUID format."),
    validationCheck,
  ],
  deleteSubcategory: [
    param("subcategoryID")
      .trim()
      .notEmpty()
      .withMessage("subcategoryID is required.")
      .isUUID()
      .withMessage("subcategoryID must be in UUID format."),
    validationCheck,
  ],
};

export default authValidator;
