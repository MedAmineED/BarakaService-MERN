import { Request, Response } from 'express';
import User from '../models/User';

// Login a user
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { login, pwd } = req.body;
        const user = await User.findOne({ where: { login } });

        if (user && await user.comparePassword(pwd)) {
            // Password is correct, handle login logic here
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Invalid login or password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to login user' });
    }
};