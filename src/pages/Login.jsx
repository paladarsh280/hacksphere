








import React, { useState } from "react";
import authenticationbg from "../assets/authenticationbg.jpg";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { signInWithGoogle } from "../firebase";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { saveAuthToken } = useAuth();
  const navigate = useNavigate();

  // input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  // Loading states
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // -----------------------
  // STEP 1: REQUEST OTP
  // -----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.includes("@")) {
      return setMessage("Enter a valid email address.");
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://hacksphere-e64m.onrender.com/api/auth/login",
        { email, password }
      );

      setOtpSent(true);
      setMessage(res.data.message || "OTP sent to your email.");
    } catch (err) {
      console.log("Login Error:", err.response?.data || err.message);
      setMessage(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Login failed. Try again."
      );
    }

    setLoading(false);
  };

  // -----------------------
  // STEP 2: VERIFY OTP
  // -----------------------
  const verifyOtpNow = async () => {
    if (!otp) return setMessage("Enter OTP first.");
    setOtpLoading(true);

    try {
      const res = await axios.post(
        "https://hacksphere-e64m.onrender.com/api/auth/verify-login",
        { email, otp }
      );

      saveAuthToken(res.data.token);
      navigate("/memory-form");
    } catch (err) {
      console.log("OTP Verify Error:", err.response?.data || err.message);
      setMessage(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "OTP verification failed."
      );
    }

    setOtpLoading(false);
  };

  // -----------------------
  // GOOGLE LOGIN
  // -----------------------
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);

    const user = await signInWithGoogle();
    if (!user) {
      setGoogleLoading(false);
      return;
    }

    const googleData = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      googleId: user.uid,
    };

    try {
      const res = await axios.post(
        "https://hacksphere-e64m.onrender.com/api/auth/google-login",
        googleData
      );

      saveAuthToken(res.data.token);
      navigate("/memory-form");
    } catch (err) {
      console.log("Google Login Error:", err);
      setMessage("Google login failed. Try again.");
    }

    setGoogleLoading(false);
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${authenticationbg})` }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative z-10 w-[85%] max-w-lg bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 flex flex-col items-center">
       
        <h1 className="text-gray-900 text-3xl font-semibold mb-6">Login</h1>

        {/* FORM BEFORE OTP */}
        {!otpSent && (
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            <div>
              <label className="block mb-1 text-gray-800">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl bg-white"
                required
              />
            </div>

            <div className="relative">
              <label className="block mb-1 text-gray-800">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl bg-white"
                required
              />

              <div
                className="absolute right-3 bottom-3 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black text-white py-3 rounded-xl font-semibold ${
                loading ? "opacity-60" : ""
              }`}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* OTP INPUT SECTION */}
        {otpSent && (
          <div className="w-full max-w-sm space-y-4 mt-3">
            <label className="block mb-1 text-gray-800">Enter OTP</label>
            <input
              type="email"
              name="email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && verifyOtpNow()}
              className="w-full px-4 py-3 border rounded-xl bg-white"
              placeholder="Enter the OTP sent to email"
            />

            <button
              onClick={verifyOtpNow}
              disabled={otpLoading}
              className={`w-full bg-green-600 text-white py-3 rounded-xl font-semibold ${
                otpLoading ? "opacity-60" : ""
              }`}
            >
              {otpLoading ? "Verifying..." : "Verify OTP & Login"}
            </button>

          
            <button
              onClick={handleSubmit}
              className="text-blue-600 underline text-sm mt-1"
            >
              Resend OTP
            </button>
          </div>
        )}

        {message && (
          <p
            className={`mt-3 font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Sign Up
          </Link>
        </div>

        {/* GOOGLE BUTTON */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="mt-5 flex items-center border rounded-full bg-white px-6 py-2 shadow"
        >
          
          {googleLoading ? "Please wait..." : "Sign in with Google"}
        </button>

        <button
          onClick={() => navigate("/forgot-password")}
          className="mt-5 flex items-center border rounded-full bg-white px-6 py-2 shadow"
        >
          Forgot Password
        </button>
      </div>
    </div>
  );
};

export default Login;