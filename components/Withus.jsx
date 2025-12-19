"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Users, Target, Award } from "lucide-react";

const Withus = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(2); // Default to 2 cards
  
  // Card data for carousel
  const cards = [
    {
      id: 1,
      title: "4200+ Employees",
      description: "We owe our success to a talented, diverse team of 4200 employees who embody our values. Their dedication has propelled us to remarkable milestones and exceeded our goals.",
      icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
      color: "bg-blue-50 border-blue-100"
    },
    {
      id: 2,
      title: "61 Years of Excellence",
      description: "Six decades of empowering dreams and goals. Celebrating 61 years of trust, growth, and financial empowerment across the nation.",
      icon: <Award className="w-6 h-6 md:w-8 md:h-8" />,
      color: "bg-purple-50 border-purple-100"
    },
    {
      id: 3,
      title: "No.1 Chit Fund Company",
      description: "Your trusted partner for financial growth and security. With convenient savings and borrowing options, we help you plan for unforeseen circumstances.",
      icon: <Star className="w-6 h-6 md:w-8 md:h-8" />,
      color: "bg-green-50 border-green-100"
    },
    {
      id: 4,
      title: "Rs. 12,877 Crore Turnover",
      description: "With 60+ years of consistent growth and current turnover of Rs. 12,877 crore, we are India's leading chit fund company.",
      icon: <Target className="w-6 h-6 md:w-8 md:h-8" />,
      color: "bg-orange-50 border-orange-100"
    },
    {
      id: 5,
      title: "60 Lakh+ Subscribers",
      description: "Trusted by millions across the nation. Our consistent performance and ethical practices have earned us the loyalty of over 60 lakh subscribers.",
      icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
      color: "bg-red-50 border-red-100"
    },
    {
      id: 6,
      title: "128+ Branches",
      description: "Widest network across India with 128+ branches serving customers in every major city. Our extensive reach ensures accessibility for all.",
      icon: <Target className="w-6 h-6 md:w-8 md:h-8" />,
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
    <div className="w-full py-8 md:py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl ">
        {/* Header Section */}
       <div className="text-left mb-4">
  <h1 className="text-3xl sm:text-4xl md:text-5xl  text-gray-900 mb-4">
    Why us
  </h1>
  <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed text-left">
    Backed by experience and trusted by the nation — secure your financial future with our expertise.
  </p>
  <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary/60 my-8 rounded-full"></div>
</div>

        {/* Main Content - Equal sections on large screens */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Section - Years Badge */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg">
              <div className="inline-flex flex-col items-center justify-center px-8 py-10 sm:px-12 sm:py-12 bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl shadow-xl w-full min-h-[400px]">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 bg-[url('/images/coinadv.jpeg')] bg-cover bg-center opacity-20 rounded-2xl"></div>
                
                <span className="text-base sm:text-lg font-medium opacity-90 relative z-10">CELEBRATING</span>
                <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold my-4 relative z-10">61</span>
                <span className="text-lg sm:text-xl md:text-2xl font-semibold relative z-10 text-center">YEARS OF EMPOWERING</span>
                <span className="text-base sm:text-lg md:text-xl relative z-10">DREAMS AND GOALS</span>
                
                {/* Mergeders Text */}
                <div className="mt-8 relative z-10 text-center">
                  <p className="text-white font-bold text-xl sm:text-2xl">
                    Mergeders!
                  </p>
                  <p className="text-white/80 italic text-lg">
                    OH! FUNDS MIGHT LIVED!
                  </p>
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
                              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 line-clamp-2">
                                {card.title}
                              </h3>
                            </div>
                            <p className="text-gray-600 text-base leading-relaxed flex-grow line-clamp-6">
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