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
      title: "A NEW ERA OF FINANCIAL EMPOWERMENT",
      description: "While our journey officially began this year, we stand on the solid foundation and impressive scale of our parent company, Finovest. With a legacy of empowering dreams across generations and a robust operational history reflected in a turnover of thousands of crores, we bring proven strength and discipline to a new digital age. At Coinplus, we are channeling this expertise into a fresh, customer-first approach. We are dedicated to using this strong foundation not as a relic of the past, but as the engine for your future—providing you with the most responsive support, transparent service, and reliable financial tools to achieve your goals.",
      shortTitle: "New Start"
    },
    {
      id: 2,
      title: "A Heritage of Scale, A Focus on You",
      description: "While Coinplus is a new chapter in digital finance, we are powered by the extensive operational backbone of the Finovest Group. This includes a seasoned professional workforce of thousands, ensuring that behind our modern interface lies decades of institutional expertise in financial discipline and security. For you, this translates into a unique advantage: the reliability and scale of an industry leader, combined with the fresh energy, agile service, and direct customer focus of a new company. Our dedicated teams are committed to channelling this collective strength into providing you with exceptional, personalized support and a seamless experience.",
      shortTitle: "100+ Employees"
    },
    {
      id: 3,
      title: "Expert Guidance, Wherever You Are",
      description: "As part of the Finovest Group, we benefit from one of the industry’s most extensive networks, connecting us to communities nationwide. This vast reach is a testament to our deep-rooted presence and trust. For our members at Coinplus, this network is more than a number—it’s your direct link to knowledgeable, local support. It ensures you have access to personalized guidance and our services right in your community, all backed by the disciplined framework and responsive customer care that defines our new, modern approach.",
      shortTitle: "100+ Agents"
    },
    {
      id: 4,
      title: "A Reliable Presence, Growing for You",
      description: "Building upon the strong, established foundation of our group, we operate with a significant national footprint that provides stability and deep-rooted trust. This widespread presence ensures a robust framework for all our operations. At Coinplus, we are leveraging this legacy of reliability to build a more connected and accessible future for you. Our focus is on ensuring that our modern digital services are supported by professional, local expertise, giving you the convenience of seamless online management with the assurance of a trusted, tangible presence committed to your financial well-being.",
      shortTitle: "35 + Branches"
    },
    {
      id: 5,
      title: "A Local Presence, Nationally Empowered",
      description: "As Coinplus, we are building our network with a clear, modern vision. Our strategically located branches serve as local hubs of trust and personalized service, ensuring our commitment is always within reach for our members. Each new branch we open is a direct extension of our core promise: to combine the accessibility of local, expert guidance with the innovation and discipline of a new-era financial partner. We are thoughtfully expanding our physical presence to complement our digital services, creating a seamless and supportive ecosystem for your financial journey.",
      shortTitle: "Network"
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
    <div className="min-h-2/screen md:min-h-screen w-full bg-gradient-to-b from-blue-50 to-white">
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
  ? isMobile ? 50 : 52
  : isHovered
  ? isMobile ? 30 : 44
  : isMobile ? 30 : 48;// Reduced sizes
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
                        strokeWidth={isCurrent ? "3" : isHovered ? "5" : "2"}
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
                         y={position.y + (isMobile ? 55 : 90)}
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