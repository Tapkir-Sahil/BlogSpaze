import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Project Imports
import { connectDB } from "./db.js";
import { createDefaultAdmin } from "./src/utils/createDefaultAdmin.js";
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
import blogRoutes from './src/routes/blog.routes.js';

dotenv.config()

const app = express();

//Middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Ensure public/uploads folder exists

const uploadsDir = path.join(process.cwd(), "public","uploads");
if(!fs.existsSync(uploadsDir)){
  fs.mkdirSync(uploadsDir)
}

// Connect to mongodb, and start then start server
await connectDB();
// creating default admin
await createDefaultAdmin();

// Routes for app;
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/blogs",blogRoutes);


//Health check of server and start server
app.get('/',(req,res)=>{
  res.send('server is running')
})
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
  console.log(`server is running on http://localhost:${PORT}`)
})

