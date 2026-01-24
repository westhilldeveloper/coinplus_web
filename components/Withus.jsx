"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Users, Target, MapPin, UserCheck, ShieldCheck, FileText, Award } from "lucide-react";

const Withus = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(2); // Default to 2 cards
  
  // Card data for carousel
 const cards = [
  {
    id: 1,
    title: "5,000 + Happy Members",
    description: "A growing community of trust. From saving for a home to funding education, we’ve already helped over 5,000 members move closer to their dreams.",
    icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
    color: "bg-blue-50 border-blue-100"
  },
  {
    id: 2,
    title: "Modern & Transparent",
    description: "Built for today’s saver. We offer fully digital plans, real-time tracking, and clear terms—no hidden clauses, no surprises.",
    icon: <Award className="w-6 h-6 md:w-8 md:h-8" />,
    color: "bg-purple-50 border-purple-100"
  },
  {
    id: 3,
    title: "35+ Collection Centres",
    description: "Accessible where you are. With 35+ centres and growing, we bring trusted chit fund services closer to communities across the region.",
    icon: <MapPin className="w-6 h-6 md:w-8 md:h-8" />, // Consider MapPin icon for branches
    color: "bg-green-50 border-green-100"
  },
  {
    id: 4,
    title: "170+ Trusted Local Agents",
    description: "Personal guidance in your neighborhood. Our network of 170+ agents provides face-to-face support and simplifies your chit journey.",
    icon: <UserCheck className="w-6 h-6 md:w-8 md:h-8" />, // Or Users icon
    color: "bg-orange-50 border-orange-100"
  },
  {
    id: 5,
    title: "100% Digital & Secure",
    description: "Safe, smart, and paperless. From sign-up to withdrawals, every transaction is secured with bank-grade encryption and compliance.",
    icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />, // Security-focused icon
    color: "bg-red-50 border-red-100"
  },
  {
    id: 6,
    title: "Backed by RBI Guidelines",
    description: "Your trust is our priority. We operate under strict regulatory frameworks to ensure your savings are always protected and managed ethically.",
    icon: <FileText className="w-6 h-6 md:w-8 md:h-8" />, // Represents compliance
    color: "bg-indigo-50 border-indigo-100"
  }
];

  // Set responsive cards per slide
  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth < 768) {
        setCardsPerSlide(1); // 1 card on mobile
      } else if (window.innerWidth < 1024) {
        setCardsPerSlide(2); // 2 cards on tablet
      } else {
        setCardsPerSlide(2); // 2 cards on desktop (changed from 3 to 2)
      }
    };

    updateCardsPerSlide();
    window.addEventListener('resize', updateCardsPerSlide);
    return () => window.removeEventListener('resize', updateCardsPerSlide);
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const totalSlides = Math.ceil(cards.length / cardsPerSlide);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [cards.length, cardsPerSlide]);

  const totalSlides = Math.ceil(cards.length / cardsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full py-8 md:py-8 px-0 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl ">
        {/* Header Section */}
       <div className="text-left mb-4">
  <h1 className="text-3xl sm:text-4xl md:text-5xl  text-gray-900 mb-4">
    Why Choose CoinPlus?
  </h1>
  <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-full leading-relaxed text-left">
    proven experience, national trust, and a commitment to your financial security.
  </p>
  <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary/60 my-8 rounded-full"></div>
</div>

        {/* Main Content - Equal sections on large screens */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Section - Years Badge */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
  <div className="relative w-full max-w-lg">
    <div className="relative px-8 py-10 sm:px-12 sm:py-12 text-white rounded-2xl shadow-xl w-full min-h-[400px] overflow-hidden">
      {/* Gradient top section (before wave) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-purple-900 z-0"></div>
      
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-[url('/images/coinadv.jpeg')] bg-cover bg-center opacity-10 rounded-2xl z-0"></div>
      
      {/* Wave divider with reflective white below */}
      <div className="absolute  -bottom-32 left-0 right-0 z-10">
        {/* Wave SVG with smooth transition */}
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-16 sm:h-30 rotate-180 "
        >
        </svg>
        
        {/* Reflective white area below wave */}
        <div className="bg-white h-85 sm:h-86 border relative">
          {/* Reflection effect using gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent"></div>
          
          {/* Subtle pattern for reflective effect */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,#000_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          </div>
        </div>
      </div>
      
      {/* Content positioned above everything */}
      <div className="relative z-20">
        <span className="text-base sm:text-lg font-medium opacity-90 block text-center">At </span>
        <span className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl font-bold my-0 block text-center"> CoinPlus,</span>
        <span className="text-base sm:text-lg md:text-xl relative z-10 text-center block mt-4">
          we're redefining chit funds with modern tools and genuine commitment.
        </span>
        
        {/* Powered by section */}
        <div className="pt-20 text-center ">
          <p className="text-primary pt-2 text-sm sm:text-md mb-0">
            Powered by  
          </p>
          <div className="mt-0   px-4 py-0 rounded-md  inline-block">
            <img 
              src="/images/lg_finovest.png" 
              alt="Finovest" 
              className="h-26 mx-auto opacity-90"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

          {/* Right Section - Cards Carousel */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div 
                      key={slideIndex}
                      className="w-full flex-shrink-0"
                    >
                      <div className={`grid gap-5 sm:gap-6 px-2 ${
                        cardsPerSlide === 1 ? 'grid-cols-1' :
                        cardsPerSlide === 2 ? 'grid-cols-2' : 'grid-cols-3'
                      }`}>
                        {cards.slice(
                          slideIndex * cardsPerSlide, 
                          (slideIndex * cardsPerSlide) + cardsPerSlide
                        ).map((card) => (
                          <div 
                            key={card.id}
                            className={`${card.color} border-2 rounded-2xl p-6 sm:p-7 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full min-h-[320px]`}
                          >
                            <div className="flex items-center gap-4 mb-5">
                              <div className="p-3 sm:p-4 bg-white rounded-xl shadow-sm">
                                <div className="text-primary">
                                  {card.icon}
                                </div>
                              </div>
                              <h3 className="text-2xl sm:text-lg font-bold text-gray-800 line-clamp-2">
                                {card.title}
                              </h3>
                            </div>
                            <p className="text-gray-600 text-md md:text-sm leading-relaxed flex-grow line-clamp-6">
                              {card.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 sm:-translate-x-4 bg-white/90 backdrop-blur-sm border border-gray-200 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 sm:translate-x-4 bg-white/90 backdrop-blur-sm border border-gray-200 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 sm:gap-3 mt-8">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-primary h-2 w-8 sm:w-10' 
                        : 'bg-gray-300 hover:bg-gray-400 h-2 w-3'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Withus;