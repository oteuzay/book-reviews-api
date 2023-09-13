import { param } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

const usersValidator = {
  getUser: [
    param("userID")
      .trim()
      .notEmpty()
      .withMessage("userID is required.")
      .isUUID()
      .withMessage("userID must be in UUID format."),
    validationCheck,
  ],
};

export default usersValidator;
