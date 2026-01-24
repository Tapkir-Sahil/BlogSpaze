import express from "express";
import multer from "multer";
import {
  listUser,
  getUser,
  updateUser,
  deleteUser,
  getMe,
} from "../controllers/user.controller.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * ✅ Memory storage (Render safe)
 */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.get("/me", authMiddleware, getMe);
router.get("/", authMiddleware, adminMiddleware, listUser);
router.get("/:id", authMiddleware, getUser);

/**
 * profilePic must match frontend FormData key
 */
router.put(
  "/:id",
  authMiddleware,
  upload.single("profilePic"),
  updateUser
);

router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;
