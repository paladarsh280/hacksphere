import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/otpGenerator.js";
import { sendOTP } from "../services/emailService.js";
import { sendResetEmail, sendPasswordChangedEmail } from '../services/emailService.js';
import crypto from "crypto";


// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
     //otp 
        const otp = generateOTP();
    user = await User.create({ name, email, password: hash ,
      // otp
       otp,
            otpExpiry: Date.now() + 5 * 60 * 1000
    });
    //otp
   await sendOTP(email, otp);

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "7d",
    // });

  //   res.json({
  //     message: "User registered successfully",
  //     token,
  //     user: { id: user._id, name: user.name, email: user.email },
  //   });
  // } catch (err) {
  //   res.status(500).json({ message: "Error in registration", error: err });
  // }

  //otp
    res.json({ message: "OTP sent to email", email });
    } catch (err) {
        res.status(500).json({ message: "Signup failed", error: err.message });
    }
};

//otp 


export const verifySignupOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.json({ message: "User not found" });

        if (user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.json({ message: "Invalid or expired OTP" });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        // ✅ Generate JWT token after verifying
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Return token so frontend can log in
        res.json({
            message: "Signup verified successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// LOGIN (NO OTP)
// LOGIN (NO OTP)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received:", email);

    // Find user by email
    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if user has a password (normal login)
    if (!user.password) {
      return res.status(400).json({
        message: "This account was created using Google. Please login with Google."
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
       //otp
        const otp = generateOTP();
          user.otp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000;
        await user.save();
         await sendOTP(email, otp);
    // Check JWT secret
    // if (!process.env.JWT_SECRET) {
    //   console.error("JWT_SECRET is missing in environment variables!");
    //   return res.status(500).json({ message: "Server configuration error" });
    // }

    // Generate token
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "7d",
    // });

    // Respond
  //   res.json({
  //     message: "Login successful",
  //     token,
  //     user: { id: user._id, name: user.name, email: user.email }
  //   });

  // } catch (err) {
  //   console.error("LOGIN ERROR:", err);
  //   res.status(500).json({ message: "Server error" });
  // }

  //otp
    res.json({ message: "OTP sent", email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const verifyLoginOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.json({ message: "User not found" });

        if (user.otp !== otp || user.otpExpiry < Date.now())
            return res.json({ message: "Invalid or expired OTP" });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// GOOGLE LOGIN
export const googleLogin = async (req, res) => {
  try {
    const { name, email, photo, googleId } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: photo,
        googleId,
        password: "", // no password
      });
    } else {
      if (!user.googleId) user.googleId = googleId;
      if (photo) user.avatar = photo;
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Google login success",
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (err) {
    res.status(500).json({ message: "Google login failed", error: err });
  }
};



// Generate hashed token
const generateResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  return { resetToken, hashedToken };
};




// @desc    Forgot Password - Send reset link
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address'
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Security: Don't reveal if email exists
      return res.status(200).json({
        success: true,
        message: 'If this email exists, a reset link will be sent'
      });
    }

    // Generate tokens
    const { resetToken, hashedToken } = generateResetToken();

    // Save hashed token to database
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour

    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send email via Resend
    await sendResetEmail(user.email, resetUrl);

    res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email'
    });

  } catch (error) {
    console.error('Forgot Password Error:', error);

    // Clear reset fields on error
    if (error.user) {
      error.user.resetPasswordToken = undefined;
      error.user.resetPasswordExpires = undefined;
      await error.user.save();
    }

    res.status(500).json({
      success: false,
      message: 'Error sending reset email. Please try again.'
    });
  }
};

// @desc    Reset Password - Set new password
// @route   POST /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    // Validate input
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide password and confirm password'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Hash token from URL to match database
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);

    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    // Send confirmation email (optional)
    await sendPasswordChangedEmail(user.email);

    res.status(200).json({
      success: true,
      message: 'Password reset successful! You can now login.'
    });

  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting password. Please try again.'
    });
  }
};

// @desc    Verify Reset Token
// @route   GET /api/auth/verify-reset-token/:token
// @access  Public
export const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: 'Invalid or expired token'
      });
    }

    res.status(200).json({
      success: true,
      valid: true,
      message: 'Token is valid'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      valid: false,
      message: 'Error verifying token'
    });
  }
};