import express from 'express';
import { addEventEnrollment, getEnrollments,updateAttendanceController } from '../controllers/eventsEnrolledController';

const router = express.Router();

/**
 * @swagger
 * /events-enrolled:
 *   get:
 *     summary: Get all enrollments
 *     description: Retrieve a list of all event enrollments.
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: A list of event enrollments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   event_id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   attended:
 *                     type: boolean
 *                   date:
 *                     type: string
 *                     format: date
 *                   event_desc:
 *                     type: string
 *                   user_name:
 *                     type: string
 *   post:
 *     summary: Add a new enrollment
 *     description: Create a new event enrollment.
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               attended:
 *                 type: boolean
 *               date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Enrollment added successfully.
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Server error.
 */

// Route to get all enrollments
router.get('/events-enrolled', getEnrollments);

// Route to add an enrollment
router.post('/events-enrolled', addEventEnrollment);

router.put('/events-enrolled/attended', updateAttendanceController);

export default router;
