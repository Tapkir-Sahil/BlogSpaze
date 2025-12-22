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
export const updateUser = async (req, res)=>{
  try{
    const {name,bio} = req.body;
    const update = {};
    if(name) update.name = name;
    if(bio) update.bio = bio;

    //if file is uploaded by multer(req.file) upload it to cloudinary 
    
    const user = await User.findById(req.params.id).select("-password")
  }
  catch(err){
    console.log(err);
    res.status(500).json({message: "internal server error"})
  }
}
