import { Request, Response } from 'express';
import { createUserService, getUserByIdService } from '../services/userService';

// Controller for creating a user
export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await createUserService(req.body);
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating user',
        });
    }
};

// Controller for getting user by ID
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.params;

    try {
        const user = await getUserByIdService(parseInt(userId, 10));

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching user',
        });
    }
};
