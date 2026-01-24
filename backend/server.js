import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Project Imports
import { connectDB } from "./db.js";
import { createDefaultAdmin } from "./src/utils/createDefaultAdmin.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import blogRoutes from "./src/routes/blog.routes.js";

dotenv.config();

const app = express();

/* =======================
   MIDDLEWARES
======================= */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://blog-spaze.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   DATABASE + INIT
======================= */

await connectDB();
await createDefaultAdmin();

/* =======================
   ROUTES
======================= */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

/* =======================
   HEALTH CHECK
======================= */

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

/* =======================
   START SERVER
======================= */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
