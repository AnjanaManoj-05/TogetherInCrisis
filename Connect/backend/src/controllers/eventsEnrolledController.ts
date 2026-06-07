import { Request, Response } from 'express';
import { addEventEnrollmentService, getEnrollmentsService } from '../services/eventsEnrolledService';

// Controller to add event enrollment
export const addEventEnrollment = async (req: Request, res: Response): Promise<Response> => {
    const { event_id, user_id, attended, date } = req.body;

    try {
        if (!event_id || !user_id || attended === undefined || !date) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const enrollment = await addEventEnrollmentService({ event_id, user_id, attended, date });

        return res.status(201).json({
            success: true,
            data: enrollment,
            message: 'Enrollment added successfully'
        });
    } catch (error) {
        console.error('Error adding enrollment:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while adding enrollment'
        });
    }
};

// Controller to get all enrollments
export const getEnrollments = async (req: Request, res: Response): Promise<Response> => {
    try {
        const enrollments = await getEnrollmentsService();

        return res.status(200).json({
            success: true,
            data: enrollments
        });
    } catch (error) {
        console.error('Error fetching enrollments:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching enrollments'
        });
    }
};

import { updateAttendanceService } from '../services/eventsEnrolledService';

export const updateAttendanceController = async (req: Request, res: Response) => {
    const { event_id, user_id, attended } = req.body;

    if (!event_id || !user_id || typeof attended !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid request data' });
    }

    try {
        const updatedEnrollment = await updateAttendanceService(event_id, user_id, attended);

        if (updatedEnrollment) {
            return res.status(200).json({ success: true, data: updatedEnrollment });
        } else {
            return res.status(404).json({ success: false, message: 'Enrollment not found' });
        }
    } catch (error) {
        console.error('Error updating attendance:', error);
        return res.status(500).json({ success: false, message: 'Error updating attendance' });
    }
};