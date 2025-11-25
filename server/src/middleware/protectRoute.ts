import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

// Extend the Request interface to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: IUser; // Optional user property
        }
    }
}

// 💡 Middleware to protect routes
const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Get token from cookies
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        // 3. Find user by ID and attach to request
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        // Attach the user object (excluding password) to the request
        req.user = user; 
        
        next(); // Proceed to the next middleware or controller

    }catch (error) {
        // 💡 FIX: Check if 'error' is an instance of the Error class
        let errorMessage = "Internal server error";
        
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        console.log("Error in protectRoute middleware: ", errorMessage);
        res.status(500).json({ error: errorMessage });
    }
};

export default protectRoute;