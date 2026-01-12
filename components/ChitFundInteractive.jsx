// components/ChitFundInteractive.js
"use client";

import { useState, useEffect, useRef } from "react";

const ChitFundInteractive = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [screenWidth, setScreenWidth] = useState(0);
  const containerRef = useRef(null);

  const steps = [
    {
      id: 1,
      title: "A NEW ERA OF FINANCIAL EMPOWERMENT",
      description: "While our journey officially began this year, we stand on the solid foundation and impressive scale of our parent company, Finovest. With a legacy of empowering dreams across generations and a robust operational history reflected in a turnover of  crores, we bring proven strength and discipline to a new digital age. At CoinPlus, we are channeling this expertise into a fresh, customer-first approach. We are dedicated to using this strong foundation not as a relic of the past, but as the engine for your future—providing you with the most responsive support, transparent service, and reliable financial tools to achieve your goals.",
      shortTitle: "New Start"
    },
    {
      id: 2,
      title: "A Heritage of Scale, A Focus on You",
      description: "While CoinPlus is a new chapter in digital finance, we are powered by the extensive operational backbone of the Finovest Group. This includes a seasoned professional workforce of thousands, ensuring that behind our modern interface lies decades of institutional expertise in financial discipline and security. For you, this translates into a unique advantage: the reliability and scale of an industry leader, combined with the fresh energy, agile service, and direct customer focus of a new company. Our dedicated teams are committed to channelling this collective strength into providing you with exceptional, personalized support and a seamless experience.",
      shortTitle: "100+ Employees"
    },
    {
      id: 3,
      title: "Expert Guidance, Wherever You Are",
      description: "As part of the Finovest Group, we benefit from one of the industry's most extensive networks, connecting us to communities nationwide. This vast reach is a testament to our deep-rooted presence and trust. For our members at CoinPlus, this network is more than a number—it's your direct link to knowledgeable, local support. It ensures you have access to personalized guidance and our services right in your community, all backed by the disciplined framework and responsive customer care that defines our new, modern approach.",
      shortTitle: "100+ Agents"
    },
    {
      id: 4,
      title: "A Reliable Presence, Growing for You",
      description: "Building upon the strong, established foundation of our group, we operate with a significant national footprint that provides stability and deep-rooted trust. This widespread presence ensures a robust framework for all our operations. At CoinPlus, we are leveraging this legacy of reliability to build a more connected and accessible future for you. Our focus is on ensuring that our modern digital services are supported by professional, local expertise, giving you the convenience of seamless online management with the assurance of a trusted, tangible presence committed to your financial well-being.",
      shortTitle: "35 + Collection Centres"
    },
    {
      id: 5,
      title: "A Local Presence, Nationally Empowered",
      description: "As CoinPlus, we are building our network with a clear, modern vision. Our strategically located branches serve as local hubs of trust and personalized service, ensuring our commitment is always within reach for our members. Each new branch we open is a direct extension of our core promise: to combine the accessibility of local, expert guidance with the innovation and discipline of a new-era financial partner. We are thoughtfully expanding our physical presence to complement our digital services, creating a seamless and supportive ecosystem for your financial journey.",
      shortTitle: "Network"
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setScreenWidth(containerRef.current.offsetWidth);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  const handleStepClick = (stepId) => {
    setActiveStep(stepId);
  };

  const handleStepHover = (stepId) => {
    setHoveredStep(stepId);
  };

  const handleStepLeave = () => {
    setHoveredStep(null);
  };

  const isStepActive = (stepId) => stepId <= activeStep;

  // Calculate positions for responsive curve
  const getCurvedLinePosition = (stepId, index, totalSteps) => {
    const progress = index / (totalSteps - 1);
    
    const isMobile = screenWidth < 640;
    const isTablet = screenWidth >= 640 && screenWidth < 1024;
    
    // Use container width instead of fixed values
    const containerWidth = screenWidth;
    const baseWidth = Math.max(containerWidth, 300); // Minimum width
    
    const width = isMobile ? baseWidth * 0.90 : isTablet ? baseWidth * 0.98 : baseWidth * 0.95;
    const startX = isMobile ? baseWidth * 0.05 : baseWidth * 0.02;
    
    const baseX = progress * width;
    const waveHeight = isMobile ? 20 : isTablet ? 40 : 60;
    const curveY = Math.sin(progress * Math.PI * 2) * waveHeight;
    
    const x = startX + baseX;
    const y = isMobile ? 80 + curveY : (isTablet ? 120 + curveY : 160 + curveY);
    
    return { x, y };
  };

  // Get SVG dimensions based on screen size
  const getSvgDimensions = () => {
    const isMobile = screenWidth < 640;
    const isTablet = screenWidth >= 640 && screenWidth < 1024;
    
    return {
      width: screenWidth,
      height: isMobile ? 180 : isTablet ? 220 : 280,
      viewBox: `0 0 ${screenWidth} ${isMobile ? 180 : isTablet ? 220 : 280}`
    };
  };

  return (
    <div ref={containerRef} className="min-h-2/screen md:min-h-screen w-full bg-gradient-to-b from-blue-50 to-white overflow-x-hidden">
      {/* Curved Line Progress Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary pt-2 pb-2 md:pb-12 lg:pb-24 overflow-hidden">
        {/* Curved Background */}
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 lg:h-24 bg-white rounded-t-[100%]"></div>
        
        {/* Main Container */}
        <div className="relative max-w-full mx-auto px-1">
          {/* Curved Line Progress Container */}
          <div className="relative h-40 md:h-48 lg:h-64 overflow-hidden">
            <svg
              className="w-full h-full"
              width={getSvgDimensions().width}
              height={getSvgDimensions().height}
              viewBox={getSvgDimensions().viewBox}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Step dots along the curved line */}
              {steps.map((step, index) => {
                const position = getCurvedLinePosition(step.id, index, steps.length);
                const isActive = isStepActive(step.id);
                const isCurrent = step.id === activeStep;
                const isHovered = step.id === hoveredStep;
                const isMobile = screenWidth < 640;
                const isTablet = screenWidth >= 640 && screenWidth < 1024;
                
                // Responsive dot sizes
                const dotRadius = isCurrent
                  ? (isMobile ? 16 : isTablet ? 20 : 24)
                  : isHovered
                  ? (isMobile ? 12 : isTablet ? 16 : 20)
                  : (isMobile ? 14 : isTablet ? 18 : 22);
                
                const outerRingRadius = dotRadius + (isMobile ? 4 : isTablet ? 6 : 8);
                const numberFontSize = isMobile ? "10" : isTablet ? "14" : "18";
                const labelFontSize = isMobile ? "8" : isTablet ? "10" : "12";

                return (
                  <g key={step.id}>
                    {/* Connecting line segment (if not first step) */}
                    {index > 0 && (
                      <path 
                        d={`M ${getCurvedLinePosition(step.id - 1, index - 1, steps.length).x},${getCurvedLinePosition(step.id - 1, index - 1, steps.length).y} 
                           C ${(getCurvedLinePosition(step.id - 1, index - 1, steps.length).x + position.x) / 2},${(getCurvedLinePosition(step.id - 1, index - 1, steps.length).y + position.y) / 2 - (isMobile ? 20 : isTablet ? 30 : 40)}
                             ${(getCurvedLinePosition(step.id - 1, index - 1, steps.length).x + position.x) / 2},${(getCurvedLinePosition(step.id - 1, index - 1, steps.length).y + position.y) / 2 + (isMobile ? 20 : isTablet ? 30 : 40)}
                             ${position.x},${position.y}`}
                        fill="none" 
                        stroke={isStepActive(step.id) ? "#ffffffff" : "rgba(255,255,255,0.1)"}
                        strokeWidth={isMobile ? "3" : "4"}
                        strokeLinecap="round"
                      />
                    )}
                    
                    {/* Dot with hover and active states */}
                    <g
                      onMouseEnter={() => handleStepHover(step.id)}
                      onMouseLeave={handleStepLeave}
                      onClick={() => handleStepClick(step.id)}
                      className="cursor-pointer"
                    >
                      {/* Outer ring for current step */}
                      {isCurrent && (
                        <circle 
                          cx={position.x} 
                          cy={position.y} 
                          r={outerRingRadius}
                          fill="none"
                          stroke="#47066dff"
                          strokeWidth="2"
                          strokeOpacity="0.5"
                        />
                      )}
                      
                      {/* Hover ring */}
                      {isHovered && !isCurrent && (
                        <circle 
                          cx={position.x} 
                          cy={position.y} 
                          r={outerRingRadius - 2}
                          fill="none"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeOpacity="0.7"
                        />
                      )}
                      
                      {/* Dot */}
                      <circle 
                        cx={position.x} 
                        cy={position.y} 
                        r={dotRadius}
                        fill={isActive ? "#e41538ff" : isHovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)"}
                        stroke="white"
                        strokeWidth={isCurrent ? "2" : isHovered ? "2.5" : "1.5"}
                        className="transition-all duration-200"
                      />
                      
                      {/* Step number inside dot */}
                      <text 
                        x={position.x} 
                        y={position.y + (isMobile ? 3 : isTablet ? 4 : 5)} 
                        textAnchor="middle" 
                        fill="white" 
                        fontSize={numberFontSize}
                        fontWeight="bold"
                      >
                        {step.id}
                      </text>
                      
                      {/* Step label below dot */}
                      <text 
                        x={position.x} 
                        y={position.y + (isMobile ? 30 : isTablet ? 40 : 50)}
                        textAnchor="middle" 
                        fill={isActive ? "white" : isHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.9)"} 
                        fontSize={labelFontSize}
                        fontWeight={isCurrent || isHovered ? "bold" : "normal"}
                      >
                        {step.shortTitle}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 -mt-6 md:-mt-10 lg:-mt-12">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-2 md:mt-4 text-blue-900 mb-3 md:mb-4 text-center px-2">
          {steps.find(s => s.id === activeStep)?.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 md:mb-8 text-center px-2 sm:px-4 md:px-8">
          {steps.find(s => s.id === activeStep)?.description}
        </p>
      </div>
    </div>
  );
};

export default ChitFundInteractive;