import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

const handleVerify = async () => {
  setError("");

  try {
    const res = await fetch(
      "https://hacksphere-e64m.onrender.com/api/auth/verify-signup-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: location.state.email, // 🔑 REQUIRED
          otp
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    navigate("/login");
  } catch (err) {
    setError(err.message);
  }
};



  return (
    <div>
      <h2>Verify OTP</h2>
      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      {error && <p>{error}</p>}
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}
