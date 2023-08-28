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

/**
 * @swagger
 * /api/authors:
 *   post:
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                  type: string
 *               summary:
 *                  type: string
 *             example:
 *               name: Ursula
 *               surname: Le Guin
 *               summary: Ursula K Le Guin is an American author who has written novels, children's books, poetry, short stories and essays.
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
  authorsValidator.createAuthor,
  authorsController.createAuthor
);

/**
 * @swagger
 * /api/authors/{authorID}:
 *   put:
 *     summary:
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authorID
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                  type: string
 *               summary:
 *                  type: string
 *             example:
 *               name: Ursula
 *               surname: Le Guin, Kroeber
 *               summary: Ursula K Le Guin is an American author who has written novels, children's books, poetry, short stories and essays. Most of her work has been written within the fantasy and science fiction genres and she has won many awards for her work, including five Hugo Awards, 6 Nebula Awards, 19!
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
  "/:authorID",
  authCheck,
  authorsValidator.updateAuthor,
  authorsController.updateAuthor
);

/**
 * @swagger
 * /api/authors/{authorID}:
 *   delete:
 *     summary:
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authorID
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/:authorID",
  authCheck,
  authorsValidator.deleteAuthor,
  authorsController.deleteAuthor
);

export default router;
