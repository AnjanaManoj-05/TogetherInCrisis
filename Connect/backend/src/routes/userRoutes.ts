import express from 'express';
import { createUser, getUserById } from '../controllers/userController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Add a new user to the database.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               user_email:
 *                 type: string
 *               user_phone:
 *                 type: string
 *               user_password:
 *                 type: string
 *               user_type:
 *                 type: string
 *             required:
 *               - user_name
 *               - user_email
 *               - user_password
 *     responses:
 *       201:
 *         description: User created successfully.
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve user details by their ID.
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */

// Define routes
router.post('/users', createUser); // Create user
router.get('/users/:userId', getUserById); // Get user by ID

export default router;
