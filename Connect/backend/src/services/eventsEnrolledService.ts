import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vms',
    password: 'Anu@2006',
    port: 5432
});

// Service to add event enrollment
export const addEventEnrollmentService = async (enrollment: {
    event_id: number;
    user_id: number;
    attended: string;
    date: Date;
}): Promise<any> => {
    const { event_id, user_id, attended, date } = enrollment;

    try {
        const result = await pool.query(
            ` INSERT INTO events_enrolled (event_id, user_id, attended, date)
            VALUES ($1, $2, $3, $4)RETURNING *`,
            [event_id, user_id, attended, date]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error adding enrollment:', error);
        throw new Error('Error adding enrollment');
    }
};

// Service to get all enrollments
export const getEnrollmentsService = async (): Promise<any[]> => {
    try {
        const result = await pool.query(`
            SELECT 
                ee.event_id,
                ee.user_id,
                ee.attended,
                ee.date,
                e.event_desc,
                u.user_name
            FROM events_enrolled ee
            JOIN event e ON ee.event_id = e.event_id
            JOIN "user" u ON ee.user_id = u.user_id
            ORDER BY ee.event_id
        `);

        return result.rows;
    } catch (error) {
        console.error('Error fetching enrollments:', error);
        throw new Error('Error fetching enrollments');
    }
};

export const updateAttendanceService = async (
    event_id: number,
    user_id: number,
    attended: string
): Promise<any> => {
    try {
        const result = await pool.query(
            `UPDATE events_enrolled
             SET attended = $1
             WHERE event_id = $2 AND user_id = $3
             RETURNING *`,
            [attended, event_id, user_id]
        );

        return result.rows[0]; // Return the updated row if successful
    } catch (error) {
        console.error('Error updating attendance:', error);
        throw new Error('Error updating attendance');
    }
};
