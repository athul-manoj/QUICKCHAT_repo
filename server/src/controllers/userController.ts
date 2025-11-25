// File: server/src/controllers/userController.ts

import { Request, Response } from 'express';
// Note: You must also ensure your Request type is extended globally 
// (which you did in protectRoute.ts, but we must assume the user exists here).
import User from '../models/User'; 

export const getUsersForSidebar = async (req: Request, res: Response) => {
    try {
        // 💡 NEW CHECK: Ensure req.user exists before proceeding.
        if (!req.user || !req.user._id) {
            // This case should theoretically be caught by protectRoute, 
            // but the type guard makes TypeScript happy.
            return res.status(401).json({ error: "Unauthorized: User information missing." });
        }
        
        // TypeScript is now satisfied that req.user exists here
        const loggedInUserId = req.user._id; 

        // Fetch all users except the one currently logged in
        const filteredUsers = await User.find({ 
            _id: { $ne: loggedInUserId } 
        }).select("-password"); 

        res.status(200).json(filteredUsers);

    } catch (error) {
        // Ensure you also fix the 'unknown' type error in this catch block as well:
        let errorMessage = "Internal server error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error("Error in getUsersForSidebar: ", errorMessage);
        res.status(500).json({ error: errorMessage });
    }
};