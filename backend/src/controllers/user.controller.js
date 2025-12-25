import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

// GET /api/user/ (admin)
export const listUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

// GET /api/user/:id (admin or profile owner)
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

//PUT /api/user/:id (to update //admin or owner)
export const updateUser = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const update = {};
    if (name) update.name = name;
    if (bio) update.bio = bio;
    //if file is uploaded by multer(req.file) upload it to cloudinary
    if (req.file && req.file.path) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogspaze/avatar",
      });
      update.profilepic = result.secure_url;
    } else if (req.body.profilepic) {
      update.profilepic = req.body.profilepic;
    }

    const user = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
    }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

//delete /api/user/:id (admin privilage)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json({ message: "user delete success" });
  } catch(err){
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
