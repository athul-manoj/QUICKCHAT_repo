// File: server/src/utils/generateToken.ts
import jwt from 'jsonwebtoken';
import { Response } from 'express';

// Function to create JWT and set it as an HTTP-only cookie
const generateTokenAndSetCookie = (userId: string, res: Response): void => {
    // 1. Generate the JWT
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: '15d', // Token expires in 15 days
    });

    // 2. Set the token as an HTTP-only cookie
   res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, 
        sameSite: "lax",
        // 💡 CRITICAL CHANGE: Only set 'secure: true' in production
        // In development, the browser will block 'secure' cookies sent over insecure HTTP
        secure: process.env.NODE_ENV === "production", 
    });
};

export default generateTokenAndSetCookie;