import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom"; 
import IntroPage from "./pages/IntroPage";
import Check from "./pages/Check";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyOtp from "./pages/VerifyOtp";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <div id="page-wrapper" className="relative">
      
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/check" element={<Check />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
           <Route path="/verify-otp" element={<VerifyOtp/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;