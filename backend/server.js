import express from "express";
import cors from "cors";
import dotenv, { config } from "dotenv";
import path from "path";
import fs from "fs";

// Project Imports
import { connectDB } from "./db";

dotenv.config()

const app = express();
