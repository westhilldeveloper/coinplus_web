"use client";

import React, { useState, useEffect } from 'react';

const CompanyList = () => {
  const [activeCompany, setActiveCompany] = useState(0);
  const [screenWidth, setScreenWidth] = useState(null);
  const [isClient, setIsClient] = useState(false); // Track if we're on client

  useEffect(() => {
    setIsClient(true); // Set to true when component mounts on client
    
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

   const companies = [
    {
      id: 0,
      name: 'Janashakti Agro',
      logo: '/images/lg_janashaktiagro.png',
      shortName: 'Janashakti Agro',
      description: `"Janashakthi Agro" most likely refers to FINOVEST JANASHAKTI AGRO PRODUCER COMPANY LIMITED, an active Indian agro-producer company`,
      details: `visit our webiste: https://westhillinternational.com`,
      color: 'bg-blue-50 border-blue-200'
    },
    // {
    //   id: 1,
    //   name: 'JANASHAKTI FOUNDATION',
    //   logo: '/images/lg_JANASHAKTI FOUNDATION.png',
    //   shortName: 'Janashakti Foundation',
    //   description: 'Get Instant Personal Loans of upto ₹25 Lakh with lower EMIs & minimal docs from FinCrif instant loan',
    //   details: `
    //     <p>Finovest Janashakti Foundation is a non-govt company recognized under RoC-Ernakulam. Rooted in reliability and customer-centricity, the organization blends disciplined execution with a pragmatic, outcomes-first mindset. By aligning with established industry practices and transparent governance, it has cultivated a strong reputation among customers, partners, and stakeholders.</p>
    //     <p>The company's core strength lies in its ability to translate market needs into practical, scalable solutions. From onboarding to post-delivery support, processes are designed to be clear, auditable, and responsive—ensuring consistency without losing agility. This balance helps Finovest Janashakti Foundation maintain trust and deliver value across engagements.</p>
    //   `,
    //   color: 'bg-green-50 border-green-200'
    // },
    {
      id: 1,
      name: 'Finovest Chits and Kuries PVT.LTD ',
      logo: '/images/lg_finovest.png',
      shortName: 'Finovest Chits and Kuries',
      description: 'Parent company of CoinPlus  chit.',
      details: `
       Visit us: https://www.finovestgroup.com
      `,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 2,
      name: 'CENTRON',
      logo: '/images/lg_CENTRON.png',
      shortName: 'CENTRON Constructions',
      description: `Building tomorrow's landmarks today.`,
      // details: `
      //   <p>At <strong>Centron,</strong> we are dedicated to transforming visionary ideas into reality through our expertise in infrastructure projects, residential and commercial construction, and comprehensive real estate development. Our diverse range of services encompasses Design and Build Construction, Project Management, and Real Estate Development, all tailored to meet the dynamic needs of our clients. With a focus on delivering excellence and innovation, Centron Constructions stands at the forefront of the industry, backed by a leadership team with unparalleled expertise.</p>
      //   <p>Our directors bring a wealth of knowledge, combining rigorous academic credentials from the prestigious institutions such as Indian Institute of Technology Madras (IIT), Royal Institution of Chartered Surveyors (RICS), and Project management Institute (PMI, USA) with extensive international and domestic experience. This blend of academic excellence and practical know-how empowers us to tackle complex projects with confidence and precision. At Centron Constructions, we are committed to exceeding expectations and shaping the future of construction and real estate development. Join us as we build tomorrow's landmarks today.</p>
      // `,
      color: 'bg-amber-50 border-amber-200'
    },
    {
      id: 3,
      name: 'WESTHILL international',
      logo: '/images/lg_WESTHILL LOGO.png',
      shortName: 'WESTHILL',
      description: 'Overseas Business Consultancy',
      // details: `
      //   <p>We, <strong>Westhill International</strong> We, Westhill International, emerged from a strategic foresight– to bridge the gap between India’s vast potential and the opportunities of the global marketplace. Recognizing the increasing interconnectedness of economies worldwide, a group of individuals came together to create a 360° business consultancy in India that could empower both businesses and individuals to thrive internationally. </p>
      //   <p>As a core overseas business consultancy, we provide expert guidance and strategic solutions for companies seeking to expand their reach in international markets.</p>
      // `,
      color: 'bg-red-50 border-red-200'
    },
    {
      id: 4,
      name: 'CoinPlus',
      logo: '/images/coin_plus.png',
      shortName: 'CoinPlus',
      description: 'An efficient fintech product from the leading financial service provider in India.',
//       details: `
//         <p><strong>CoinPlus</strong>  is the digital arm of Finovest Chits and Kuries Ltd., a trusted name in the financial services industry. With many years of experience, Finovest has been empowering individuals and families to achieve their financial dreams. Now, we’re embarking on a digital transformation to bring the benefits of systematic savings to a wider audience.</p>
//         <p>CoinPlus represents the evolution of the traditional “chits” into a modern, accessible,and transparent digital platform. It’s a 100% digital systematic savings plan designed to make saving easy, rewarding, and secure. Registered under the Chit Fund Act 1982,
// CoinPlus ensures the protection of your investments.</p>
//       `,
      color: 'bg-teal-50 border-teal-200'
    },
     {
      id: 5,
      name: 'Gold Centro',
      logo: '/images/lg_goldcentro.png',
      shortName: 'CENTRON',
      description: 'Sell your old Gold / Release Your Pledged Gold ',
      // details: `
      //   <p> In India, pledging gold ornaments for quick financial relief is a long-ongoing practice, whether it is for medical emergencies, business funding, or education purposes. While it is still wise to choose a gold loan for small funding, it is not advised to pledge gold for large sums of money in the increasing interest rates and evolving market conditions; it is a high risk. </p>
      //   <p>But if the high interest rates put you into more financial trouble, we can help you release your pledged gold. You can visit your nearest Gold Centro branch with all the documents, and we will clear your gold loan, release your pledged gold, and buy it from you at the current market price and the gold purity.</p>
      // `,
      color: 'bg-amber-50 border-amber-200'
    },
    // {
    //   id: 7,
    //   name: 'WESTHILL Travel and Tours',
    //   logo: '/images/lg_travltour.png',
    //   shortName: 'WESTHILL',
    //   description: 'Your trusted partner in creating unforgettable global travel experiences',
    //   details: `
    //     <p><strong>Westhill Travel and Tourism</strong> we believe travel is more than just reaching a destination, it’s about the experiences you live, the memories you create, and the journeys that stay with you forever. And behind every great journey is a partner you can trust. That’s where we come in. holistic approach. That's why we offer a comprehensive suite of services designed to cater to every type of traveler and travel need.</p>
    //     <p>For those seeking luxury, adventure, or relaxation, our curated leisure tours take you to the most captivating destinations around the world. Each itinerary is thoughtfully designed to combine comfort, convenience, and unique experiences that leave lasting memories.</p>
    //   `,
    //   color: 'bg-red-50 border-red-200'
    // },
  ];

  const handleCompanySelect = (id) => {
    setActiveCompany(id);
  };

  const handlePrev = () => {
    setActiveCompany(prev => prev > 0 ? prev - 1 : companies.length - 1);
  };

  const handleNext = () => {
    setActiveCompany(prev => prev < companies.length - 1 ? prev + 1 : 0);
  };

  // Calculate radius based on screenWidth safely
  const calculateRadius = () => {
    if (!isClient || screenWidth === null) {
      // Default values for SSR or before client render
      return {
        mobile: 120,
        tablet: 150,
        desktop: 180,
        large: 210
      };
    }
    
    return {
      mobile: 120,
      tablet: 150,
      desktop: 180,
      large: 210
    };
  };

  const radius = calculateRadius();

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
          Group Companies
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto px-2">
          A diverse portfolio of successful ventures under the Finovest Group umbrella
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
        {/* Left Section - Company Orbital Display */}
        <div className="lg:w-2/5">
          <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]">
            {/* Circular Background Section */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px]">
                {/* Circular Background with Gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 border border-gray-200/50 shadow-lg sm:shadow-xl"></div>
                
                {/* Decorative Rings */}
                <div className="absolute inset-8 sm:inset-10 md:inset-12 rounded-full border border-gray-300/50"></div>
                <div className="absolute inset-16 sm:inset-20 md:inset-24 rounded-full border border-gray-300/30"></div>
                
                {/* Main Company in Center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                  <div className="bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-full shadow-lg sm:shadow-xl xl:shadow-2xl border-2 sm:border-3 md:border-4 border-primary/20">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center">
                      <img 
                        src="/images/lg_finovestgroup.png" 
                        alt="Finovest Group"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Sub-Companies in Orbit */}
                {companies.map((company, index) => {
                  const angle = (index * (360 / companies.length)) * (Math.PI / 180);
                  
                  // Calculate radius based on screenWidth safely
                  let radiusValue = radius.mobile; // Default to mobile
                  if (isClient && screenWidth !== null) {
                    if (screenWidth < 440) {
                      radiusValue = radius.mobile;
                    } else if (screenWidth < 568) {
                      radiusValue = radius.tablet;
                    } else if (screenWidth < 1024) {
                      radiusValue = radius.desktop;
                    } else {
                      radiusValue = radius.large;
                    }
                  }
                  
                  const x = Math.cos(angle) * radiusValue;
                  const y = Math.sin(angle) * radiusValue;
                  
                  return (
                    <div
                      key={company.id}
                      className={`absolute top-1/2 left-1/2 transition-all duration-500 cursor-pointer z-20 ${
                        activeCompany === company.id ? 'scale-105 sm:scale-110 z-40' : 'hover:scale-102 sm:hover:scale-105'
                      }`}
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                      onClick={() => handleCompanySelect(company.id)}
                    >
                      <div className={`${company.color} p-2 sm:p-3 md:p-4 rounded-full border border-gray-200 shadow-md sm:shadow-lg transition-all duration-300 ${
                        activeCompany === company.id ? 'border-primary ring-2 sm:ring-3 md:ring-4 ring-primary/20' : 'hover:shadow-lg sm:hover:shadow-xl border-gray-200'
                      }`}>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 flex items-center justify-center bg-white rounded-full p-0 sm:p-0">
                          <img 
                            src={company.logo}
                            alt={company.name}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Orbit Path Line - only show when screenWidth is available */}
                {isClient && screenWidth !== null && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] xl:w-[360px] xl:h-[360px] border border-dashed border-gray-300 rounded-full"></div>
                )}

                {/* Connector Lines from Sub-Companies to Center - only show when screenWidth is available */}
                {isClient && screenWidth !== null && companies.map((company, index) => {
                  const angle = (index * (360 / companies.length)) * (Math.PI / 180);
                  let lineRadius = 100; // Default
                  
                  if (screenWidth < 640) {
                    lineRadius = 100;
                  } else if (screenWidth < 768) {
                    lineRadius = 120;
                  } else if (screenWidth < 1024) {
                    lineRadius = 140;
                  } else {
                    lineRadius = 150;
                  }
                  
                  return (
                    <div
                      key={`line-${company.id}`}
                      className="absolute top-1/2 left-1/2 -z-10"
                      style={{
                        width: `${lineRadius}px`,
                        height: '1px',
                        backgroundColor: '#e5e7eb',
                        transform: `rotate(${angle}rad)`,
                        transformOrigin: '0 0',
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Company Details */}
        <div className="lg:w-3/5 mt-8 sm:mt-10 lg:mt-0">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden h-full">
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 h-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-0">
                  <div className={`${companies[activeCompany].color} p-2 sm:p-2 md:p-2 rounded-lg sm:rounded-xl border border-primary/30`}>
                    <div className="w-full h-full ">
                      <img 
                        src={companies[activeCompany].logo}
                        alt={companies[activeCompany].name}
                        className="w-24 h-auto object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                      {companies[activeCompany].name}
                    </h2>
                    <div className="flex flex-wrap items-center space-x-2 sm:space-x-3 mt-1">
                      <span className="text-primary font-semibold text-sm sm:text-base">{companies[activeCompany].shortName}</span>
                      <span className="text-gray-500 hidden sm:inline">•</span>
                      <span className="text-gray-600 text-xs sm:text-sm">Company {activeCompany + 1} of {companies.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4 sm:mb-6 md:mb-8">
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                  {companies[activeCompany].description}
                </p>
              </div>

              <div 
                className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-gray-700 mb-4 sm:mb-6 md:mb-8"
                dangerouslySetInnerHTML={{ __html: companies[activeCompany].details }}
              />

              {/* Company Stats */}
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 lg:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Company Highlights</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                  <div className="text-center p-2 sm:p-3 md:p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-1">
                      {activeCompany === 0 ? '24/7' : 
                       activeCompany === 1 ? '3+ Years' : 
                       activeCompany === 2 ? '10+' :
                       activeCompany === 3 ? '' :
                       activeCompany === 4 ? '' : ''}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {activeCompany === 0 ? 'Service' : 
                       activeCompany === 1 ? 'Experience' : 
                       activeCompany === 2 ? 'Businesses' :
                       activeCompany === 3 ? '' :
                       activeCompany === 4 ? 'Travel and Tourism' : ''}
                    </div>
                  </div>
                  
                  <div className="text-center p-2 sm:p-3 md:p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-1">
                      {activeCompany === 0 ? '1000 +' : 
                       activeCompany === 1 ? '100%  Digital' : 
                       activeCompany === 2 ? '100%' :
                       activeCompany === 3 ? '24 * 7' :
                       activeCompany === 4 ? '24 * 7' : ''}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {activeCompany === 0 ? 'Customers' : 
                       activeCompany === 1 ? 'Digital & Secure' : 
                       activeCompany === 2 ? 'Secure' :
                       activeCompany === 3 ? 'Service' :
                       activeCompany === 4 ? 'Service' : ''}
                    </div>
                  </div>
                  
                  <div className="text-center p-2 sm:p-3 md:p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-1">
                      {activeCompany === 0 ? '2022' : 
                       activeCompany === 1 ? '2023' : 
                       activeCompany === 2 ? '1976' :
                       activeCompany === 3 ? '1996' :
                       activeCompany === 4 ? '2025' : ''}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Established
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyList;