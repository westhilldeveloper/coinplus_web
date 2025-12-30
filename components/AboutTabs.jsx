"use client";

import React, { useState, useEffect } from 'react';

const AboutTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Get window width on client side
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const tabs = [
    {
      title: 'Coinplus Chit Fund Private Limited',
      content: (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Coinplus Chit Fund Private Limited</h2>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
             Coinplus is the digital arm of Finovest Chits and Kuries Ltd., a trusted name in the financial services industry. With many years of experience, Finovest has been empowering individuals and families to achieve their financial dreams. Now, we’re embarking on a digital transformation to bring the benefits of systematic savings to a wider audience.
            </p>
            <p className="leading-relaxed">
             
            </p>
            <p className="leading-relaxed">
              As a new chapter begins, Coinplus is built on a fresh promise: to redefine the digital chit fund experience from the ground up. We are establishing our leadership not on legacy, but on the pillars of exceptional customer support, transparent service, and unwavering financial discipline. Our commitment is to provide every member with responsive, personalized service and the utmost clarity, ensuring a secure and empowering financial journey. This customer-first ethos is the foundation of our identity and our promise to stand out in the industry.
            </p>
          </div>
        </>
      )
    },
    {
      title: 'A Tradition of Excellence',
      content: (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">A Tradition of Excellence</h2>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              At Coinplus Chits, our foundation is built on trust, community, and the diligent pursuit of our members' aspirations. While our current operations are proudly focused in the vibrant communities of Kerala and Tamil Nadu, our vision is to extend the reliability and benefits of our chit fund services to every corner of India. We are deeply committed to bringing this proven, disciplined form of saving and credit to a national audience, helping more families build financial security and realize their dreams.
            </p>
            <p className="leading-relaxed">
              Our journey has taught us that true excellence is measured by the positive impact we create in people's lives. Every chit cycle we administer, every question we answer, and every promise we uphold reinforces our core values of transparency and unwavering support. As we look forward to expanding across India, we carry this dedication with us, promising the same standard of personalized service, absolute financial discipline, and community-centric values that have distinguished us in our home states.
            </p>
          </div>
        </>
      )
    },
    {
      title: 'History of Chit Funds',
      content: (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">The Modern Evolution of Chit Funds</h2>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              For centuries, chit funds have been a cornerstone of community finance in India, rooted in trust and collective savings. Traditionally, they operate on a simple principle: a group contributes a fixed sum regularly, and each member takes turns receiving the pooled fund, providing both a disciplined savings habit and timely access to capital.
            </p>
            <p className="leading-relaxed">
              Today, Coinplus is redefining this trusted model for the digital age. While honoring the core community spirit of chit funds, we bring a new standard of professional integrity, technological transparency, and unwavering customer support. Our mission is to transform this timeless financial instrument into a secure, accessible, and empowering tool for a new generation, building a future where disciplined savings and financial growth are within everyone's reach.
            </p>
          </div>
        </>
      )
    },
    {
      title: 'A Chit Fund Company is as Good as its Foreman',
      content: (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Our Strength is Our System and Our People

</h2>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              In the modern chit fund landscape, trust is built on transparency, robust processes, and direct accountability. At Coinplus, we recognize that our greatest asset is our professional framework and the dedicated team that upholds it.
            </p>
            <p className="leading-relaxed">
              We have built a system where technology-driven oversight ensures absolute financial discipline and clarity for every member. Our customer support and service teams are rigorously trained to embody our core values of transparency, integrity, and exceptional service. Serving as your primary and trusted point of contact, they ensure every interaction is handled with the utmost care, professionalism, and a commitment to your financial well-being.


            </p>
          </div>
        </>
      )
    },
    {
      title: 'Why Coinplus?',
      content: (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Your Trusted Financial Partner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-3">Customer Focus</h3>
                <p className="text-gray-700">We prioritize the needs and satisfaction of our customers.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-3">Experience</h3>
                <p className="text-gray-700">Backed by the decades of experience of Finovest Chit and Kuries Ltd.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-3">Technology</h3>
                <p className="text-gray-700">A user-friendly, secure, and innovative mobile app.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-3">Transparency</h3>
                <p className="text-gray-700">Complete visibility into your savings and transactions.</p>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      title: 'Growing Force in Tamil Nadu and Karnataka',
      content: (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Our Commitment to Kerala and Tamil Nadu</h2>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              Coinplus has established a strong and growing presence in the vibrant communities of Kerala and Tamil Nadu. We are dedicated to being a trusted financial partner for individuals and families across these key regions, building our reputation on modern service and reliable solutions. Our focus here reflects our core mission: to provide accessible and empowering financial tools where they are needed most.
            </p>
            <p className="leading-relaxed">
              Through a deep understanding of the local financial landscape and a network of dedicated professionals on the ground, we serve the unique needs of our members in Kerala and Tamil Nadu. We are committed to delivering the same standard of exceptional customer support, absolute transparency, and financial discipline in every interaction, laying a solid foundation for the communities we serve today and as we look toward future growth.


            </p>
          </div>
        </>
      )
    },
    {
      title: 'How Coinplus Works',
      content: (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">How Coinplus Works</h2>
          <div className="space-y-6 text-gray-700">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Step 1: Join a Chit Group</h3>
              <p>Browse and select a chit plan that fits your goals directly from our website or app. Complete your secure registration and pay the initial subscription online to officially join a group with a fixed value and duration.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Step 2: Regular Contributions</h3>
              <p>Once enrolled, you contribute a fixed monthly amount online. These automated, secure payments collectively build the total prize pool for your group, fostering a disciplined savings habit.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Step 3: Monthly Auctions</h3>
              <p>Each month, the prize amount is auctioned digitally. Members can participate easily online, and the bidder willing to accept the lowest sum wins that month’s prize. The online system ensures a fair, transparent, and efficient process for everyone.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Step 4: Continued Participation</h3>
              <p>Even after receiving the prize, you continue your monthly payments until the cycle concludes. This ensures the group's stability and builds your financial credibility, often making you eligible for future chits on favorable terms.</p>
            </div>
          </div>
        </>
      )
    },
    {
      title: 'Coinplus, a Lifelong Friend',
      content: (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Coinplus, Your Partner in Progress</h2>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              At Coinplus, we believe in building financial relationships that last. From the very first interaction, we strive to be more than just a service provider—we aim to be a reliable partner in your journey toward financial well-being. We are here to support your goals, celebrate your milestones, and help you build a more secure future.
            </p>
            <p className="leading-relaxed">
              Our commitment extends far beyond a simple transaction. We focus on building trust, understanding your unique aspirations, and providing flexible, transparent financial solutions designed to adapt to your life's changing chapters. This foundation of partnership and personalized support is what we are building today, and it's the reason families are choosing Coinplus as their trusted financial ally for the long term.
            </p>
          </div>
        </>
      )
    }
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      {/* Tabs Navigation - Carousel Style */}
      <div className="overflow-hidden mb-6 md:mb-8">
        <div className="relative h-14">
          {/* Tab sliding container with responsive width */}
          <div 
            className="flex absolute left-0 transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${activeTab * (windowWidth < 768 ? 180 : 220)}px)`,
              paddingLeft: '1rem',
              paddingRight: '1rem'
            }}
          >
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`px-4 py-3 mb-4 text-sm md:text-base font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 mx-1 ${
                  activeTab === index
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                } rounded-t-lg border border-gray-200 border-b-0 h-12`}
                style={{ 
                  width: windowWidth < 768 ? '180px' : '220px',
                  maxWidth: windowWidth < 768 ? '180px' : '220px'
                }}
              >
                <span className="truncate block w-full text-left">{tab.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden ">
        {/* Tab Content with Slide Animation */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeTab * 100}%)` }}
          >
            {tabs.map((tab, index) => (
              <div
                key={index}
                className="w-full flex flex-col lg:flex-row justify-between items-start flex-shrink-0 max-h-[500px] overflow-y-auto scrollbar-hide"
              >
                {/* Left Content - 40% */}
                <div className="w-full lg:w-[60%] p-2 md:p-4 animate-fadeIn ">
                  {tab.content}
                </div>

                {/* Right Stats - 60% */}
                <div className="w-full lg:w-[40%] bg-yellow-100 p-2 md:p-4 border-l mt-18 rounded-md mx-2 border-primary/20">
                  <div className="sticky top-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                        <div className="flex justify-center mb-2">
                          <img 
                            src="/images/customer-care.gif" 
                            alt="arrow"
                            className="w-10 h-10 sm:w-10 sm:h-10 md:w-15 md:h-15 opacity-80 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300"
                          />
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-primary mb-2">
                          1000 +
                        </div>
                        <div className="text-sm md:text-lg font-semibold text-gray-800">
                          Active Customers
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                        <div className="flex justify-center mb-2">
                          <img 
                            src="/images/building.gif" 
                            alt="arrow"
                            className="w-10 h-10 sm:w-10 sm:h-10 md:w-15 md:h-15 opacity-80 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300"
                          />
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-primary mb-2">
                          35
                        </div>
                        <div className="text-sm md:text-lg font-semibold text-gray-800">
                          Branches
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                        <div className="flex justify-center mb-2">
                          <img 
                            src="/images/teamwork.gif" 
                            alt="arrow"
                            className="w-10 h-10 sm:w-10 sm:h-10 md:w-15 md:h-15 opacity-80 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300"
                          />
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-primary mb-2">
                          100+
                        </div>
                        <div className="text-sm md:text-lg font-semibold text-gray-800">
                          Employees
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                        <div className="flex justify-center mb-2">
                          <img 
                            src="/images/marketing-agent.gif" 
                            alt="arrow"
                            className="w-10 h-10 sm:w-10 sm:h-10 md:w-15 md:h-15 opacity-80 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300"
                          />
                        </div>
                        <div className="text-xl md:text-2xl font-bold text-primary mb-2">
                          170+
                        </div>
                        <div className="text-sm md:text-lg font-semibold text-gray-800">
                          Agents
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => handleTabClick(activeTab > 0 ? activeTab - 1 : tabs.length - 1)}
          className="px-4 py-2 md:px-6 md:py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2 text-sm md:text-base"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm md:text-base text-gray-600">
            {activeTab + 1} of {tabs.length}
          </span>
          <div className="flex space-x-1">
            {tabs.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                  activeTab === index ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to tab ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <button
          onClick={() => handleTabClick(activeTab < tabs.length - 1 ? activeTab + 1 : 0)}
          className="px-4 py-2 md:px-6 md:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2 text-sm md:text-base"
        >
          <span className="hidden sm:inline">Next</span>
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        /* Hide scrollbar for tabs */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default AboutTabs;