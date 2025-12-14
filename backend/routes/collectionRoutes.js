import express from "express";
import { createCollection } from "../controllers/collectionController.js";
import { isLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", isLoggedIn, createCollection);

export default router;
