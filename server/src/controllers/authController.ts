// File: server/src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import generateTokenAndSetCookie from '../utils/generateToken';

// --- SIGNUP LOGIC ---
export const signup = async (req: Request, res: Response) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if user already exists
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate profile picture URL
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create new user instance
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        // Save user and generate token
        if (newUser) {
            await newUser.save();

            // Generate JWT token and set cookie
            generateTokenAndSetCookie(newUser._id.toString(), res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        let errorMessage = "Internal server error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log("Error in signup controller: ", errorMessage);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// --- LOGIN LOGIC ---
export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        // Check password and user existence
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user ) {
            return res.status(400).json({ error: "Invalid username " });
        }
        else if ( !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid  password" });
        }

        // Generate JWT token and set cookie
        generateTokenAndSetCookie(user._id.toString(), res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (error) {
        let errorMessage = "Internal server error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log("Error in login controller: ", errorMessage);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// --- LOGOUT LOGIC ---
export const logout = (req: Request, res: Response) => {
    try {
        // Clear the cookie to log out the user
        res.cookie("jwt", "", { maxAge: 0 }); 
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        let errorMessage = "Internal server error";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.log("Error in logout controller: ", errorMessage);
        res.status(500).json({ error: "Internal Server Error" });
    }
};