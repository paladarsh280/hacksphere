import React, { useState, useEffect } from "react";
import landingpagebg from "../assets/landingpagebg.jpg";
import OurFeatures from "../component/OurFeatures";
import memories1 from "../assets/memories1.jpg";
import memories2 from "../assets/memories2.jpg";
import memories3 from "../assets/memories3.jpg";
import memories4 from "../assets/memories4.jpg";
import memories5 from "../assets/memories5.jpg";
import memories6 from "../assets/memories6.jpg";
import memories7 from "../assets/memories7.jpg";
import memories8 from "../assets/memories8.jpg";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
export default function LandingPage() {
  const memories = [
    memories8,
    memories2,
    memories3,
    memories4,
    memories5,
    memories6,
    memories7,
    memories1,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % memories.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [memories.length]);

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${landingpagebg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
    
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/30 to-transparent">
        <NavBar />
      </div>
     
      
      <div className="flex items-center justify-center min-h-screen pt-20 pb-10 px-4">
        <div className="w-full max-w-6xl">
          {/* Slideshow */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white/80 bg-white/10 backdrop-blur-sm">
            <img
              src={memories[currentIndex]}
              alt="memory"
              className="w-full h-auto max-h-[70vh] object-cover"
            />
            
            {/* Navigation indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {memories.map((_, index) => (
                <div
                  key={index}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Caption */}
          <div className="mt-8 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              Where Every Frame Holds a Story of Us
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
              Capture, preserve, and cherish your precious moments forever
            </p>
          </div>
        </div>
      </div>


      <div className="relative z-50 py-20 px-4">
        <OurFeatures />
      </div>
      <Footer/>
    </div>
  );
}