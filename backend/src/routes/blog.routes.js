import express from "express";
import multer from "multer";
import {
  createBlog,
  listBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs,
} from "../controllers/blog.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", listBlogs);
router.get("/my-posts", authMiddleware, getMyBlogs);
router.get("/:id", getBlog);
router.post("/", authMiddleware, upload.single("image"), createBlog);
router.put("/:id", authMiddleware, upload.single("image"), updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
