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
 *     summary: Retrieve all categories
 *     description: Get a list of all available categories.
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
 *     summary: Create a new category
 *     description: This operation is restricted to administrators only.
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
 *               sort_order:
 *                 type: integer
 *             example:
 *               title: Fantasy
 *               sort_order: 1
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

/**
 * @swagger
 * /api/categories/{categoryID}:
 *   put:
 *     summary: Update a category
 *     description: This operation is restricted to administrators only.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sort_order:
 *                 type: integer
 *               title:
 *                 type: string
 *             example:
 *               title: Mystery
 *               sort_order: 2
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/:categoryID",
  authCheck,
  categoriesValidator.updateCategory,
  categoriesController.updateCategory
);

/**
 * @swagger
 * /api/categories/{categoryID}:
 *   delete:
 *     summary: Delete a category
 *     description: This operation is restricted to administrators only.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/:categoryID",
  authCheck,
  categoriesValidator.deleteCategory,
  categoriesController.deleteCategory
);

export default router;
