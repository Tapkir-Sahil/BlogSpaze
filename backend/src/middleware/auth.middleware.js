import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const header = req.header.authorization;
    if (!header) {
      return res.status(401).json({ message: "Authorization Is Missing" })
    }
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token Is Missing" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User Not Found" })
    }

    req.user = user
    next();
  }
  catch (err) {
    return res.status(401).json({ message: "Invalid Token" })
  }
};


export const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not Authenticated" });
  }
  if (req.user.role !== admin) {
    return res.status(403).json({ message: "Admin Only" });
  }
  next();
}