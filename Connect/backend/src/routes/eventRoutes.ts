import express from 'express';
import { getAllEvents, getEventById } from '../controllers/eventController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API for managing events
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     description: Retrieve a list of all events.
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: A list of events.
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
 *                   cause_id:
 *                     type: integer
 *                   place_id:
 *                     type: integer
 *                   skill_id:
 *                     type: integer
 *                   event_desc:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *       500:
 *         description: Server error.
 */

/**
 * @swagger
 * /events/{eventId}:
 *   get:
 *     summary: Get event details by ID
 *     description: Retrieve details of a single event by its ID.
 *     tags: [Events]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         description: The ID of the event to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event_id:
 *                   type: integer
 *                 user_id:
 *                   type: integer
 *                 cause_id:
 *                   type: integer
 *                 place_id:
 *                   type: integer
 *                 skill_id:
 *                   type: integer
 *                 event_desc:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Server error.
 */

// Define route to get all events
router.get('/events', getAllEvents);

// Define route to get event by ID
router.get('/events/:eventId', getEventById);

export default router;
