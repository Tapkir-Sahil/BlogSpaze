import express from "express";
import multer from "multer";
import {
  listUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/auth.middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.get("/", authMiddleware, adminMiddleware, listUser);
router.get("/:id", authMiddleware, getUser);
router.put("/:id", authMiddleware, upload.single("avatar"), updateUser);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;
