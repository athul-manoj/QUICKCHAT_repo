// File: server/src/routes/messageRoutes.ts

import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/messageController";import protectRoute from "../middleware/protectRoute";

const router = Router();

// Protect the route and map it to the controller
router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessages); 

export default router;