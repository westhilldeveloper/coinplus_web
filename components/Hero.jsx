'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    setIsVideoModalOpen(true);
    // Play the video when modal opens
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100);
  };

  const closeModal = () => {
    setIsVideoModalOpen(false);
    // Pause the video when modal closes
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to beginning
    }
  };

  return (
    <>
      <section className="font-normal mt-6 md:mt-10 px-0 sm:px-2 lg:px-2 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left Content */}
        <div className="order-2 lg:order-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
            Achieve Any Goal with <span className="text-primary">Coinplus Chits</span>
          </h1>
          
          <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-600 max-w-2xl">
            Join a plan, build your savings, and bid for your funds seamlessly in our online auction.
          </p>

          {/* Buttons - Stack on mobile, row on larger screens */}
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a 
              href="/chitplans" 
              className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-center text-sm md:text-base"
            >
              View Plans
            </a>
            <a 
              href="https://subscriber.coinplus.co.in" 
              className="inline-block px-6 py-3 border border-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center text-sm md:text-base"
            >
              Open an Account
            </a>
          </div>

          {/* Stats - Responsive grid */}
          <div className="mt-6 md:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 max-w-full">
            <div className="bg-slate-50 p-4 sm:p-5 rounded-lg shadow-sm">
              <div className="text-xs sm:text-sm text-slate-500">Branches</div>
              <div className="font-semibold flex items-center text-lg sm:text-xl md:text-2xl">
                35  
                <img 
                  src="/images/add.gif" 
                  alt="arrow"
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-80 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
            <div className="bg-slate-50 p-4 sm:p-5 rounded-lg shadow-sm">
              <div className="text-xs sm:text-sm text-slate-500">Members</div>
              <div className="flex items-center font-semibold text-lg sm:text-xl md:text-2xl">
                1000
                <img 
                  src="/images/add.gif" 
                  alt="arrow"
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-80 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Video Section - Now clickable */}
        <div className="order-1 lg:order-2 flex justify-center items-center relative h-full md:h-[500px] rounded-xl overflow-hidden">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="relative w-full px-0 sm:px-0">
              <div 
                className="relative aspect-video md:aspect-auto md:h-[500px] lg:h-[550px] xl:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden border-2 md:border-0 border-primary shadow-lg sm:shadow-xl cursor-pointer group"
                onClick={handleVideoClick}
              >
                {/* Thumbnail/Preview Video (muted autoplay) */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  aria-label="Background video showing Coinplus services"
                  title="Click to play video in full screen"
                >
                  <source 
                    src="https://coinplus.co.in/wp-content/uploads/2025/06/Coinplus_English.mp4" 
                    type="video/mp4" 
                  />
                  <img 
                    src="/images/cplogo.png" 
                    alt="Coinplus chit fund services overview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  Your browser does not support HTML5 video.
                </video>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-8 w-8 md:h-10 md:w-10 text-primary ml-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Brand Logo Overlay */}
                <div className="absolute z-10 bottom-0 md:bottom-10 left-1/5 w-2/3 flex items-center justify-center">
                  <img 
                    src="/images/brandLogo.png" 
                    alt="Company Brand Logo"
                    className="opacity-90"
                  />
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">Click to play full video</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal/Popup */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-4xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 md:-right-10 text-white hover:text-gray-300 transition-colors z-20"
              aria-label="Close video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Video Container */}
            <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                className="w-full aspect-video"
                poster="/images/cplogo.png"
              >
                <source 
                  src="https://coinplus.co.in/wp-content/uploads/2025/06/Coinplus_English.mp4" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Optional: Video Title */}
            <div className="mt-4 text-center">
              <h3 className="text-white text-lg font-semibold">Coinplus - Your Financial Partner</h3>
              <p className="text-gray-300 text-sm">Watch our full introduction video</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}