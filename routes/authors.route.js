/**
 * @swagger
 * tags:
 *   name: Authors
 */
import express from "express";
import authorsController from "../controllers/authors.controller.js";
import { authorsValidator } from "../validators/authors.validator.js";
import { authCheck } from "../middleware/auth-check.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary:
 *     description:
 *     tags: [Authors]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: int
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get("/", authorsValidator.getAuthors, authorsController.getAuthors);

/**
 * @swagger
 * /api/authors/{authorID}:
 *   get:
 *     summary:
 *     description:
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: authorID
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
router.get(
  "/:authorID",
  authorsValidator.getAuthor,
  authorsController.getAuthor
);

router.post(
  "/",
  authCheck,
  authorsValidator.createAuthor,
  authorsController.createAuthor
);

router.put(
  "/:authorID",
  authCheck,
  authorsValidator.updateAuthor,
  authorsController.updateAuthor
);

router.delete(
  "/:authorID",
  authCheck,
  authorsValidator.deleteAuthor,
  authorsController.deleteAuthor
);

export default router;
