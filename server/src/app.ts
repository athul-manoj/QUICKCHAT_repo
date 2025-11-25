// File: server/src/app.ts

import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // 💡 NEW IMPORT
import connectToMongoDB from './config/db'; // Assuming your DB connection is here
import cors from 'cors';

// Import your existing messageRoutes
import messageRoutes from './routes/messageRoutes';
// 💡 NEW IMPORT for the user list route
import userRoutes from './routes/userRoutes'; 
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 💡 CORS CONFIGURATION
const corsOptions = {
    // 1. Specify the origin(s) that are allowed to access the server.
    // This MUST match the URL where your React/Vite development server runs.
    origin: 'http://localhost:5173', 
    
    // 2. Allow credentials (cookies) to be sent with the request.
    // This is absolutely CRITICAL for your JWT authentication logic (protectRoute)
    // which relies on reading the 'jwt' cookie.
    credentials: true,
};

app.use(cors(corsOptions)); // 💡 USE CORS MIDDLEWARE

// Middleware to parse incoming requests with JSON payloads (from req.body)
app.use(express.json());
// Middleware to parse incoming cookies (required for protectRoute)
app.use(cookieParser()); // 💡 ADD COOKIE PARSER

// Route Middleware
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes); // 💡 ADD USER ROUTES
app.use("/api/auth", authRoutes);

// Simple health check route (optional)
app.get('/', (req, res) => {
    res.send("Server is running!");
});


// Start the server and connect to DB
app.listen(PORT, () => {
    connectToMongoDB(); // Assuming this is your DB connection function
    console.log(`Server running on port ${PORT}`);
});