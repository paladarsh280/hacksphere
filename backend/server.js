import dotenv from "dotenv";
dotenv.config(); 
import express from "express";
import cors from "cors";
import cron from "node-cron";
import { checkDateUnlocks } from "./utils/unlockChecker.js";
import { startUnlockCron } from "./cron/unlockCron.js";

import connectDB from "./config/db.js"; // make sure this path is correct

import authRoutes from "./routes/authRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js"
import geminiRoutes from "./routes/geminiRoutes.js"
// Every minute (for demo)

startUnlockCron();
cron.schedule("* * * * *", () => {
  checkDateUnlocks();
});
const app = express();

// Connect to MongoDB
connectDB(); 


// CORS
app.use(cors({
     origin: ["http://localhost:5173","https://togethera.netlify.app", "https://traveela.onrender.com","https://hacksphere-mu.vercel.app"],
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/memory", memoryRoutes);
app.use("/api/collections", collectionRoutes);

app.use("/api/ai", geminiRoutes);
// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));