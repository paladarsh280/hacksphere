import express from "express";
import {
  signup,
  login,
  verifySignupOtp,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-signup-otp", verifySignupOtp);
router.post("/login", login);

export default router;
