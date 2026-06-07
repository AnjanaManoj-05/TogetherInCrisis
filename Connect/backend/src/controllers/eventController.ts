import { Request, Response } from 'express';
import { getAllEventsService, getEventByIdService } from '../services/eventService';

// Controller method to get all events
export const getAllEvents = async (req: Request, res: Response): Promise<Response> => {
    try {
        const events = await getAllEventsService();
        return res.status(200).json({
            success: true,
            data: events
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching events'
        });
    }
};

// Controller method to get event details by ID
export const getEventById = async (req: Request, res: Response): Promise<Response> => {
    const { eventId } = req.params;

    try {
        // Ensure the eventId is treated as a number
        const parsedEventId = parseInt(eventId, 10); // Convert to a number

        if (isNaN(parsedEventId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid event ID'
            });
        }

        const event = await getEventByIdService(parsedEventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: event
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching event details'
        });
    }
};
