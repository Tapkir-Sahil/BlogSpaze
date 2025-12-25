import Blog from "../models/blog.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

//to create a single blog
export const createBlog = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    let imageUrl = "";
    //if file is uploaded (multer diskstorage)
    if (req.file && req.file.path) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogspaze/posts",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
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
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

//get all blogs(public) populated with author basic data
export const listBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("authorId", "name email profilePic")
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

//get single blog by id :
export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "authorId",
      "name email profilePic"
    );
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

//update the blog (author/admin)
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }

    //only author or admin can update
    if (
      blog.authorId.toString() !== req.user_id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "not authorized" });
    }

    const { title, description, content } = req.body;
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (content) blog.content = content;

    //image upload
    if (req.file && req.file.path) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogspaze/posts",
      });
      blog = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

//to delete the blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }

    if (
      blog.authorId.toString() !== req.user_id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "not authorized" });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "blog deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
