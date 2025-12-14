import React, { useState } from "react";
import axios from "axios";

const EnterOtp = () => {
  const [otp, setOtp] = useState("");

  const email = localStorage.getItem("tempEmail");

 const handleVerify = async () => {
  try {
    const res = await axios.post("http://traveela.onrender.com/api/auth/verify-otp", {
      email: email,
      otp: otp
    });

    localStorage.removeItem("tempEmail");
    localStorage.setItem("token", res.data.token);

    window.location.href = "/loggedlanding";
  } catch (err) {
    alert(err.response?.data?.message || "OTP verification failed");
  }
};

  return (
    <div>
      <h2>Enter OTP sent to your email</h2>
      <input value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default EnterOtp;