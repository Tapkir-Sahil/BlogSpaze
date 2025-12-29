import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const createDefaultAdmin = async () => {
  const exists = await User.findOne({ role: "admin" });
  if (exists){
    console.log('admin already exists');
    return
  } 
  const hashed = await bcrypt.hash("admin@123", 10);
  const admin = await User.create({
    name: "Admin",
    email: "admin@blogspaze.com",
    password: hashed,
    role: "admin",
  });
  console.log("default admin is created:", admin.email);
};
