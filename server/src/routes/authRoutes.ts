// File: server/src/routes/authRoutes.ts
import express from "express";
import { login, logout, signup } from "../controllers/authController";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Optional: Route to check if user is logged in (used for persistence)
router.get("/me", protectRoute, (req, res) => {
    // If protectRoute passes, req.user is attached
    res.status(200).json(req.user); 
});

export default router;