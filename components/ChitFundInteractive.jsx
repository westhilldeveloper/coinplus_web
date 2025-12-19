// components/ChitFundInteractive.js
"use client";

import { useState, useEffect } from "react";

const ChitFundInteractive = () => {
  const [activeStep, setActiveStep] = useState(4); // Start with step 4 selected
  const [hoveredStep, setHoveredStep] = useState(null);
  const [screenWidth, setScreenWidth] = useState(0);

  const steps = [
    {
      id: 1,
      title: "YEARS OF EMPOWERING DREAMS AND GOALS",
      description: "With over 60 years of consistent growth and a current turnover of Rs. 12,817 crore, we have been empowering dreams and goals across generations.",
      shortTitle: "60+ Years"
    },
    {
      id: 2,
      title: "4200+ Employees",
      description: "Our dedicated team of over 4200 employees works tirelessly to provide excellent service and maintain our position as India's top chit fund company.",
      shortTitle: "4200+ Employees"
    },
    {
      id: 3,
      title: "17000+ Agents",
      description: "A vast network of over 17000 agents ensures we reach customers across India, providing convenient savings and borrowing options.",
      shortTitle: "17000+ Agents"
    },
    {
      id: 4,
      title: "Network of 128 Branches",
      description: "With 128 branches spread across the country, we offer accessible financial services to help you plan for unforeseen events and ensure stability.",
      shortTitle: "128 Branches"
    },
    {
      id: 5,
      title: "Network of 35 Branches",
      description: "With 35 additional branches recently opened, we continue to expand our reach to serve more customers across the country.",
      shortTitle: "35 New Branches"
    }
  ];

useEffect(() => {
  const handleResize = () => setScreenWidth(window.innerWidth);
  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
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

  // Calculate positions for a gently curved line (wave shape)
  const getCurvedLinePosition = (stepId, index, totalSteps) => {
  const progress = index / (totalSteps - 1);

  const isMobile = screenWidth < 640;
  const isTablet = screenWidth >= 640 && screenWidth < 1024;

  const width = isMobile ? 600 : isTablet ? 1000 : 1800;
  const startX = isMobile ? 50 : -320;

  const baseX = progress * width;
  const waveHeight = isMobile ? 30 : isTablet ? 50 : 80;
  const curveY = Math.sin(progress * Math.PI * 2) * waveHeight;

  const x = startX + baseX;
  const y = isMobile ? 160 + curveY : 280 + curveY;

  return { x, y };
};


  return (
    <div className="min-h-2/screen md:min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Curved Line Progress Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary pt-2 pb-2 md:pb-24 overflow-hidden">
        {/* Curved Background */}
        <div className="absolute bottom-0 left-0 right-0 h-24  bg-white rounded-t-[100%]"></div>
        
        {/* Main Container */}
        <div className="relative max-w-full mx-auto px-1">
          {/* Curved Line Progress Container */}
         <div className="relative h-54 md:h-64 overflow-x-auto sm:overflow-visible"> {/* Increased height */}
            <svg
    className="min-w-[700px] sm:w-full h-full"
    viewBox="0 0 1200 500"
    preserveAspectRatio="xMidYMid meet"
  > 
              
              {/* Step dots along the curved line */}
              {steps.map((step, index) => {
                const position = getCurvedLinePosition(step.id, index, steps.length);
                const isActive = isStepActive(step.id);
                const isCurrent = step.id === activeStep;
                const isHovered = step.id === hoveredStep;
                const isMobile = screenWidth < 640;
                // Proper dot sizes - smaller to fit in viewBox
                const dotRadius = isCurrent
  ? isMobile ? 26 : 52
  : isHovered
  ? isMobile ? 22 : 44
  : isMobile ? 24 : 48;// Reduced sizes
                const outerRingRadius = dotRadius + (isMobile ? 6 : 10); // Reduced sizes
                const numberFontSize = isMobile ? "20" : "48";
const labelFontSize = isMobile ? "12" : "24";

                return (
                  <g key={step.id}>
                    {/* Connecting line segment (if not first step) */}
                    {index > 0 && (
                      <path 
                        d={`M ${getCurvedLinePosition(step.id - 1, index - 1, steps.length).x},${getCurvedLinePosition(step.id - 1, index - 1, steps.length).y} 
                           C ${(getCurvedLinePosition(step.id - 1, index - 1, steps.length).x + position.x) / 2},${(getCurvedLinePosition(step.id - 1, index - 1, steps.length).y + position.y) / 2 - 50}
                             ${(getCurvedLinePosition(step.id - 1, index - 1, steps.length).x + position.x) / 2},${(getCurvedLinePosition(step.id - 1, index - 1, steps.length).y + position.y) / 2 + 50}
                             ${position.x},${position.y}`}
                        fill="none" 
                        stroke={isStepActive(step.id) ? "#ffffffff" : "rgba(255,255,255,0.1)"}
                        strokeWidth="6"
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
                      {/* Outer ring for current step (no blinking) */}
                      {isCurrent && (
                        <circle 
                          cx={position.x} 
                          cy={position.y} 
                          r={outerRingRadius}
                          fill="none"
                          stroke="#47066dff"
                          strokeWidth="3"
                          strokeOpacity="0.5"
                        />
                      )}
                      
                      {/* Hover ring */}
                      {isHovered && !isCurrent && (
                        <circle 
                          cx={position.x} 
                          cy={position.y} 
                          r={outerRingRadius - 4}
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
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
                        strokeWidth={isCurrent ? "3" : isHovered ? "2" : "2"}
                        className="transition-all duration-200"
                      />
                      
                      {/* Step number inside dot */}
                      <text 
                        x={position.x} 
                        y={position.y + (isMobile ? 6 : 5)} 
                        textAnchor="middle" 
                        fill="white" 
                        fontSize={numberFontSize}
                        fontWeight="bold"
                      >
                        {step.id}
                      </text>
                      
                      {/* Step label below dot - moved further down */}
                      <text 
                        x={position.x} 
                         y={position.y + (isMobile ? 45 : 90)}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-12">
       <h3 className="text-2xl font-bold mt-4 text-blue-900 mb-4 text-center">
                      {steps.find(s => s.id === activeStep)?.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-8 text-center">
                      {steps.find(s => s.id === activeStep)?.description}
                    </p> 
      </div>
    </div>
  );
};

export default ChitFundInteractive;