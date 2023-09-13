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
 *               title: Non-fiction
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
 *               title: Fiction
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
 *     description: This operation is restricted to administrators only.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
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
 *               title: Science Fiction
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
  "/:categoryID/subcategories",
  authCheck,
  subcategoriesValidator.createSubcategory,
  subcategoriesController.createSubcategory
);

/**
 * @swagger
 * /api/categories/subcategories/{subcategoryID}:
 *   put:
 *     summary: Update a subcategory
 *     description: This operation is restricted to administrators only.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subcategoryID
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
 *               sort_order:
 *                 type: integer
 *               categoryID:
 *                 type: string
 *                 format: uuid
 *             example:
 *               title: Fantasy
 *               sort_order: 2
 *               categoryID: a873be74-5232-11ee-be56-0242ac120002
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
  "/subcategories/:subcategoryID",
  authCheck,
  subcategoriesValidator.updateSubcategory,
  subcategoriesController.updateSubcategory
);

/**
 * @swagger
 * /api/categories/subcategories/{subcategoryID}:
 *   delete:
 *     summary: Delete a subcategory
 *     description: This operation is restricted to administrators only.
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subcategoryID
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
  "/subcategories/:subcategoryID",
  authCheck,
  subcategoriesValidator.deleteSubcategory,
  subcategoriesController.deleteSubcategory
);

export default router;
