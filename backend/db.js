import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectDB = async ()=>{
  try{
    const uri = process.env.MONGO_URI;
    if(!uri) throw new Error('MONGO_URI NOT DEFINED')
    await mongoose.connect(uri)
    console.log('Mongodb Connected');
  
  }
  catch(err){
    console.log('db connection failed',err.message)
  }
};