import express from 'express';
import { getUsersForSidebar } from '../controllers/userController';
import protectRoute from '../middleware/protectRoute'; // You'll need this middleware

const router = express.Router();

// 💡 This is the route your frontend is calling: http://localhost:5000/api/users
// It requires authentication, so it should be protected.
router.get("/", protectRoute, getUsersForSidebar);

export default router;