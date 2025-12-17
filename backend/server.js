import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Project Imports
import { connectDB } from "./db.js";

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

//Health check of server
app.get('/',(req,res)=>{
  res.send('server is running')
})
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
  console.log(`server is running on http://localhost:${PORT}`)
})

