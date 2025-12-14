



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
     
import authenticationbg from "../assets/authenticationbg.jpg";


import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { signInWithGoogle } from "../firebase";

const Signup = () => {
  const { saveAuthToken } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = signup, 2 = otp verify

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // update inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // STEP 1 → Submit basic info → Backend sends OTP
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (formData.password !== formData.confirmPassword) {
  //     setMessage("Passwords do not match!");
  //     return;
  //   }

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/auth/register",
  //       {
  //         name: formData.name,
  //         email: formData.email,
  //         password: formData.password,
  //       }
  //     );

  //     if (res.data?.message === "OTP sent to email") {
  //       setMessage("OTP sent to your email!");
  //       setStep(2); // show OTP screen
  //     }
  //   } catch (error) {
  //     setMessage(error.response?.data?.message || "Signup failed.");
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setMessage("Passwords do not match!");
    return;
  }

  try {
    const res = await axios.post(
      "https://hacksphere-e64m.onrender.com/api/auth/register",
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }
    );

    if (res.data?.message === "OTP sent to email") {
      // SAVE EMAIL NOW — BEFORE GOING TO OTP SCREEN
      localStorage.setItem("emailForOTP", formData.email);

      setMessage("OTP sent to your email!");
      setStep(2); // show OTP screen
    }
  } catch (error) {
    setMessage(error.response?.data?.message || "Signup failed.");
  }
};


  // STEP 2 → Verify OTP
  // const handleVerifyOTP = async (e) => {
  //   e.preventDefault();
  //   console.log("otp clicked");
  //   localStorage.setItem("emailForOTP", formData.email);
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/auth/verify-signup",
  //       {
  //         email: email,
  //         otp: otp,
  //       }
      
  //     );

  //     if (res.data.token) {
  //       saveAuthToken(res.data.token);
  //       setMessage("Signup successful! Redirecting...");
  //       setTimeout(() => navigate("/loggedlanding"), 800);
  //     }
  //   } catch (err) {
  //     setMessage("Invalid OTP. Try again.");
  //   }
  // };
  const handleVerifyOTP = async (e) => {
  e.preventDefault();
  console.log("otp clicked");

  // RETRIEVE EMAIL
  const email = localStorage.getItem("emailForOTP");
 console.log({email});
  if (!email) {
    setMessage("Error: No email found. Please register again.");
    return;
  }

  try {
    const res = await axios.post(
      "https://hacksphere-e64m.onrender.com/api/auth/verify-signup",
      {
          email: email,   // FIXED
          otp: otp,
      }
    );

    if (res.data.token) {
      saveAuthToken(res.data.token);
      setMessage("Signup successful! Redirecting...");
      setTimeout(() => navigate("/loggedlanding"), 800);
    }
  } catch (err) {
    setMessage("Invalid OTP. Try again.");
  }
};


  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();
    if (!user) return;

    const googleData = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    };

    try {
      const res = await axios.post(
        "https://hacksphere-e64m.onrender.com/api/auth/google-login",
        googleData
      );

      saveAuthToken(res.data.token);
      navigate("/loggedlanding");
    } catch (err) {
      console.log("DB Save Error:", err);
    }
  };

  return (
    <div
      className="relative h-screen w-screen flex items-center justify-center bg-cover bg-[40%_33%] bg-no-repeat"
      style={{ backgroundImage: `url(${authenticationbg})` }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative z-10 w-[90%] max-w-lg bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-2 flex flex-col items-center max-h-[95vh] overflow-auto">
        {/* Logo */}
        <div className="flex justify-center">
         
        </div>

        <h1 className="text-gray-900 text-3xl font-bold mb-1">Togethera</h1>
        

        {/* STEP 1 — SIGNUP FORM */}
        {step === 1 && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-sm"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg text-sm"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email or phone number"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg text-sm"
              required
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg text-sm"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
              >
                👁
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg text-sm"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onMouseDown={() => setShowConfirmPassword(true)}
                onMouseUp={() => setShowConfirmPassword(false)}
                onMouseLeave={() => setShowConfirmPassword(false)}
              >
                👁
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white rounded-lg py-3 font-semibold"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* STEP 2 — OTP SCREEN */}
        {step === 2 && (
          <form
            onSubmit={handleVerifyOTP}
            className="flex flex-col gap-4 w-full max-w-sm"
          >
            <h2 className="text-xl font-semibold text-center">
              Enter OTP sent to your email
            </h2>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border bg-white border-gray-300 rounded-lg text-sm"
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white rounded-lg py-3 font-semibold"
            >
              Verify OTP
            </button>
          </form>
        )}

        {message && (
          <p className="mt-4 text-blue-600 text-sm text-center">{message}</p>
        )}

        {/* Google Signup */}
        <button
          onClick={handleGoogleLogin}
          className="mt-[20px] flex justify-center items-center border border-gray-300 rounded-full bg-white text-[17px] mb-5 w-80 h-11 shadow-sm"
        >
          
          Sign up with Google
        </button>

        {/* Login Link */}
        <div className="flex flex-col items-center w-full mt-2">
          <p className="text-gray-700 text-[16px] mb-2">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="w-20 h-8 mb-8 flex items-center justify-center bg-black text-white rounded-xl font-semibold"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;