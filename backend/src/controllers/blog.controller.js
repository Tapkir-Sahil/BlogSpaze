import Blog from "../models/blog.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

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
