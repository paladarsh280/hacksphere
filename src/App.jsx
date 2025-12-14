import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom"; 
import IntroPage from "./pages/IntroPage";
import Check from "./pages/Check";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyOtp from "./pages/VerifyOtp";
import EnterOtp from "./pages/EnterOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MemoryForm from "./pages/MemoryForm";
import MyMemories from "./pages/MyMemories";
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
           <Route path="/enter-otp" element={<EnterOtp/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
         <Route path="/memory-form" element={<MemoryForm />} />
          <Route path="/my-memory" element={<MyMemories/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;