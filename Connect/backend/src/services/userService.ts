import { Pool } from 'pg';
import { User } from '../models/User';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vms',
    password: 'Anu@2006',
    port: 5432,
});

// Service for creating a user
export const createUserService = async (userData: Partial<User>): Promise<User> => {
    try {
        const result = await pool.query(
            `
            INSERT INTO "user" (user_name, dateofbirth, email, contact_no, user_password, user_type_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `,
            [
                userData.user_name,
                userData.dateofbirth,
                userData.email,
                userData.contact_no,
                userData.user_password,
                userData.user_type_id,
            ]
        );

        return result.rows[0]; // Return the inserted user
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
    }
};

// Service for retrieving user by ID
export const getUserByIdService = async (userId: number): Promise<User | null> => {
    try {
        const result = await pool.query(
            `
            SELECT user_id, user_name, dateofbirth, email, contact_no, user_type_id, user_password
            FROM "user"
            WHERE user_id = $1
            `,
            [userId]
        );

        return result.rows.length > 0 ? result.rows[0] : null; // Return the user or null if not found
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Error fetching user by ID');
    }
};
