'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Track mute state
  const youtubeVideoId = "Cxgy0EA_3f0";
  const localVideoUrl = "https://coinplus.co.in/wp-content/uploads/2025/06/Coinplus_English.mp4";

  const getYouTubeEmbedUrl = (videoId, autoplay = true, controls = false, muted = true) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&loop=0&playlist=${videoId}&controls=${controls ? 1 : 0}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`;
  };

  const handleVideoClick = () => {
    setIsVideoModalOpen(true);
  };

  const closeModal = () => {
    setIsVideoModalOpen(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Note: YouTube iframe mute/unmute requires postMessage API
    // For simplicity, we'll reload the iframe with new mute parameter
  };

  return (
    <>
      <section className="font-normal mt-6 md:mt-10 px-0 sm:px-2 lg:px-2 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Left Content - Same as before */}
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
        className="relative aspect-video  md:aspect-auto  md:h-[500px] lg:h-[550px] xl:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden border-2 md:border-0 border-primary shadow-lg sm:shadow-xl cursor-pointer group bg-primary/10"
        onClick={handleVideoClick}
      >
        {/* YouTube Video Container - Fills without black bars */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-primary/10">
          <iframe
            src={getYouTubeEmbedUrl(youtubeVideoId, true, false, true)}
            title="Coinplus Background Video"
            className="absolute top-1/2 left-1/2 w-[157.78%] h-[137.78%] -translate-x-1/2 -translate-y-1/2" // Scale to fill
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ pointerEvents: 'none' }}
          />
          
          {/* Fallback Image - Also fill container */}
          <img 
            src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
            alt="Coinplus services overview"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = `/images/cplogo.png`;
            }}
            style={{ display: 'none' }}
            id="youtube-fallback"
          />
        </div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
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
      {/* <p className="text-center text-sm text-gray-500 mt-2">Click to play full video</p> */}
    </div>
  </div>
</div>
      </section>

      {/* Video Modal/Popup - Now plays YouTube video */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-6xl flex flex-col items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-gray-300 transition-colors z-20 bg-black/50 rounded-full p-2"
              aria-label="Close video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className="absolute top-4 left-4 md:top-6 md:left-6 text-white hover:text-gray-300 transition-colors z-20 bg-black/50 rounded-full p-2"
              aria-label="Toggle mute"
            >
              {isMuted ? (
                // Muted icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
                </svg>
              ) : (
                // Unmuted icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a9 9 0 010 12m-4.5-9.5L12 3v18l-4.5-4.5H4a1 1 0 01-1-1v-7a1 1 0 011-1h3.5z"/>
                </svg>
              )}
            </button>

            {/* Video Container - YouTube Fullscreen */}
            <div className="relative w-full h-full max-h-[90vh] flex items-center justify-center">
              <div className="w-full h-full rounded-lg overflow-hidden">
                <iframe
                  src={getYouTubeEmbedUrl(youtubeVideoId, true, true, isMuted)}
                  title="Coinplus Introduction Video"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Optional: Video Title */}
            <div className="mt-4 text-center">
              <h3 className="text-white text-lg md:text-xl font-semibold">Coinplus - Your Financial Partner</h3>
              <p className="text-gray-300 text-sm md:text-base">Watch our full introduction video</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}