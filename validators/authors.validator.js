import { body } from "express-validator";
import { validationCheck } from "../middleware/validation-check.middleware.js";

export const authorsValidator = {
  getAuthors: [],
  getAuthor: [],
  createAuthor: [],
  updateAuthor: [],
  deleteAuthor: [],
};
