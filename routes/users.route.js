/**
 * @swagger
 * tags:
 *   name: Users
 */

import express from "express";
import usersController from "../controllers/users.controller.js";
import usersValidator from "../validators/users.validator.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/{userID}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve information about a user using their unique userID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userID
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
router.get("/:userID", usersValidator.getUser, usersController.getUser);

export default router;
