import express from "express";
import { register, login, getProfile } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// simple register/login (profile avatar upload done via user route)
router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getProfile);

export default router;
