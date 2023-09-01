/**
 * @swagger
 * tags:
 *   name: Categories
 */
import express from "express";
import categoriesController from "../controllers/categories.controller.js";
import subcategoriesController from "../controllers/subcategories.controller.js";
import categoriesValidator from "../validators/categories.validator.js";
import subcategoriesValidator from "../validators/subcategories.validator.js";
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

/**
 * @swagger
 * /api/categories/{categoryID}:
 *   put:
 *     summary: Update a category
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
 *               title:
 *                 type: string
 *             example:
 *               title: Mystery
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

/**
 * @swagger
 * /api/categories/{categoryID}/subcategories:
 *   get:
 *     summary: Get subcategories of a specific category
 *     description:
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/:categoryID/subcategories",
  subcategoriesValidator.getSubcategories,
  subcategoriesController.getSubcategories
);

/**
 * @swagger
 * /api/categories/{categoryID}/subcategories:
 *   post:
 *     summary: Create a new subcategory for a specific category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
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
 *               title: Local Fantasy
 *     responses:
 *       201:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/:categoryID/subcategories",
  authCheck,
  subcategoriesValidator.createSubcategories,
  subcategoriesController.createSubcategory
);

export default router;
