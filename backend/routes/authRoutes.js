import express from "express";
// import { register, login, googleLogin ,verifySignupOTP,  verifyLoginOTP ,forgotPassword,resetPassword,
//   verifyResetToken} from "../controllers/authController.js";
import {
  register,
  login,
  googleLogin,
  verifyResetToken,
  verifyLoginOTP,
  forgotPassword,
  resetPassword,
  verifySignupOTP
} from "../controllers/authControllers.js";



const router = express.Router();

// Register
router.post("/register", register);
//otp
router.post("/verify-signup", verifySignupOTP);

// Normal Login (NO OTP)
router.post("/login", login);
//otp
router.post("/verify-login", verifyLoginOTP);
// Google Login
router.post("/google-login", googleLogin);

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Logged out successfully" });
});

// Forgot Password Routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/verify-reset-token/:token', verifyResetToken);

export default router;