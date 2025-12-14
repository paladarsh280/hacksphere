import dotenv from "dotenv";
dotenv.config(); 
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js"; // make sure this path is correct

import authRoutes from "./routes/authRoutes.js";



const app = express();

// Connect to MongoDB
connectDB(); 


// CORS
app.use(cors({
     origin: ["http://localhost:5173","https://togethera.netlify.app", "https://traveela.onrender.com"],
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));