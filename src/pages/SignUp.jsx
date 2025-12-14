import React, { useState } from "react";
import authenticationbg from "../assets/authenticationbg.jpg";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async () => {
  if (loading) return;

  setError("");

  if (!formData.name || !formData.email || !formData.password) {
    setError("All fields are required");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(
      "https://hacksphere-e64m.onrender.com/api/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Signup failed");

    navigate("/verify-otp", { state: { email: formData.email } });
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

 

  return (
    <div
      className="min-h-screen relative flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${authenticationbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>

      {/* Sign Up Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Sign up to get started</p>
        </div>

        {/* Google Sign Up Button */}
        <button
          
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-lg py-3 px-4 mb-6 hover:bg-gray-50"
        >
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Sign Up Form */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-lg"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-600 font-semibold hover:text-purple-700"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
