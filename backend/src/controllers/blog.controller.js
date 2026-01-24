import Blog from "../models/blog.model.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/**
 * Helper: upload image buffer to Cloudinary
 */
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

/**
 * CREATE BLOG
 * POST /api/blogs
 */
export const createBlog = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    let imageUrl = "";

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "blogspaze/posts"
      );
      imageUrl = result.secure_url;
    } else if (req.body.image) {
      imageUrl = req.body.image;
    }

    const blog = await Blog.create({
      title,
      description,
      content,
      image: imageUrl,
      authorId: req.user._id,
    });

    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * LIST BLOGS (PUBLIC)
 * GET /api/blogs
 */
export const listBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("authorId", "name email profilePic")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * GET SINGLE BLOG
 * GET /api/blogs/:id
 */
export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "authorId",
      "name email profilePic"
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE BLOG
 * PUT /api/blogs/:id
 */
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (
      blog.authorId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, description, content } = req.body;
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (content) blog.content = content;

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "blogspaze/posts"
      );
      blog.image = result.secure_url;
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE BLOG
 * DELETE /api/blogs/:id
 */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (
      blog.authorId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET LOGGED-IN USER BLOGS
 * GET /api/blogs/my-posts
 */
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ authorId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
