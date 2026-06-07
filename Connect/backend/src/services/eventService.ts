import { Pool } from 'pg';
import { Event } from '../models/Event';  // You can define your types for the event if needed

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vms',
    password: 'Anu@2006',
    port: 5432
});

// Service to get all events
export const getAllEventsService = async (): Promise<Event[]> => {
    try {
        const result = await pool.query(`
            SELECT 
                e.event_id, 
                e.event_desc, 
                e.event_det,
                e.event_cat,
                e.date, 
                u.user_name, 
                ca.cause_desc, 
                p.place_name, 
                s.name as skill_name
            FROM event e
            JOIN "user" u ON e."user_id" = u.user_id
            JOIN cause_area ca ON e.cause_id = ca.cause_id
            JOIN place p ON e.place_id = p.place_id
            JOIN skill s ON e.skill_id = s.skill_id
            order by e.event_id
        `);

        return result.rows; // Return the rows from the query
    } catch (error) {
        console.error('Error fetching events:', error);
        throw new Error('Error fetching events');
    }
};

// Service to get event details by ID
export const getEventByIdService = async (eventId: number): Promise<Event | null> => {
    try {
        const result = await pool.query(`
            SELECT 
                e.event_id, 
                e.event_desc, 
                e.event_det,
                e.event_cat,
                e.date, 
                u.user_name, 
                ca.cause_desc, 
                p.place_name, 
                s.name as skill_name
            FROM event e
            JOIN "user" u ON e."user_id" = u.user_id
            JOIN cause_area ca ON e.cause_id = ca.cause_id
            JOIN place p ON e.place_id = p.place_id
            JOIN skill s ON e.skill_id = s.skill_id
            WHERE e.event_id = $1
        `, [eventId]);

        // If event is found, return the first row, otherwise return null
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error('Error fetching event by ID:', error);
        throw new Error('Error fetching event by ID');
    }
};
