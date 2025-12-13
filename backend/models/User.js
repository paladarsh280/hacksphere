import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  otp: String,
  otpExpiry: Date,

  isVerified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
