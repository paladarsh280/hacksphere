import React , {useState,useRef,useEffect} from "react";
import entryvideo from "../assets/entryvideo.mp4";
import LandingPage from "./LandingPage";

export default  function IntroPage(){
    const [showIntro, setShowIntro] = useState(true);
      const videoRef = useRef(null);
    const handleSkip = () => setShowIntro(false);
    return(
         <>
              {showIntro ? (
                <div className="fixed inset-0 z-30 ">
                  <video
                    ref={videoRef}
                    src={entryvideo}
                    autoPlay       
                    muted          
                    playsInline  
                    loop={false}
                    onEnded={handleSkip}
                    className="w-full h-full object-cover"
                  />
        
                  <button
                    onClick={handleSkip}
                    className="absolute bottom-6 right-6 md:bottom-10 md:right-10
                               px-5 py-2 text-sm md:text-base
                               text-white border border-white rounded-lg
                               bg-black/50 backdrop-blur-sm
                               hover:bg-black/70 transition"
                  >
                    Skip
                  </button>
                </div>
              ) : (
                <LandingPage />
              )}
            </>
    )
}