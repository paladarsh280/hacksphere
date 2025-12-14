import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    googleId: { type: String, default: null },
    avatar: { type: String, default: null },
  
    //otp 
     otp: String,
    otpExpiry: Date,
    

     resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  }
      
    
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);