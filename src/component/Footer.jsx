import React from "react";

import Facebook from ".././icons/Facebook";
import Twitter from ".././icons/Twitter";
import Linkedin from ".././icons/Linkedin";
import Instagram from ".././icons/Instagram";
import Reddit from ".././icons/Reddit";
import logo from "../assets/logo.png";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full bg-white  relative">
      {/* Main Footer Content */}
      <div className="py-2 px-[50px] md:px-[45px]">
        <div className="max-w-7xl mx-auto">
          {/* Logo and Socials */}
          <div className="flex  md:flex-row md:items-center justify-between mb-8 ">
            <div>
              <img
                src={logo}
                alt=" Logo"
                className="w-50 h-auto"
              />
              <p className="text-sm text-muted-foreground ">
             The Legacy of Love, Sealed for Tomorrow.
              </p>
            </div>

            <div className="flex flex-col items-center gap-8 mt-20">
              <div className="flex gap-4">
                {[Facebook , Twitter, Linkedin,Reddit,Instagram].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="text-foreground hover:text-secondary transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                )}
              </div>
              <button className="bg-black text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-2 font-medium text-white">
                Contact Us
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <nav className="flex flex-wrap gap-6 text-sm border-t pt-6">
            {[
              "Privacy Policy",
              "Terms of Use",
              "Sales and Refunds",
              "Legal",
              "Site Map",
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                className="text-foreground hover:text-secondary transition-colors font-semibold "
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Wave Section */}
      <div className="relative h-64 overflow-hidden w-full">
        <svg
          viewBox="0 0 1440 320"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(var(--wave-gray))"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L0,320Z"
          ></path>
          <path
            fill="hsl(var(--footer-bg))"
            fillOpacity="0.5"
            d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,165.3C672,171,768,213,864,213.3C960,213,1056,171,1152,160C1248,149,1344,171,1392,181.3L1440,192L1440,320L0,320Z"
          ></path>
          <path
            fill="hsl(var(--footer-dark))"
            d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,197.3C672,213,768,235,864,218.7C960,203,1056,149,1152,133.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L0,320Z"
          ></path>
        </svg>

        {/* Copyright and Scroll */}
        
      </div>
    </footer>
  );
}