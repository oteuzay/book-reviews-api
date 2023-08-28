/**
 * @swagger
 * tags:
 *   name: Categories
 */
import express from "express";
import categoriesController from "../controllers/categories.controller.js";
import categoriesValidator from "../validators/categories.validator.js";
import { authCheck } from "../middleware/auth-check.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     description:
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get("/", categoriesController.getCategories);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *             example:
 *               title: Fantasy
 *     responses:
 *       201:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/",
  authCheck,
  categoriesValidator.createCategory,
  categoriesController.createCategory
);

export default router;
