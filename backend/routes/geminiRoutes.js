import express from "express";
import { getCaptions } from "../controllers/gemini.controller.js";

const router = express.Router();

router.post("/captions", getCaptions);

export default router;
