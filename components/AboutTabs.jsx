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
              Over six decades ago, Coinplus Chit Fund introduced the people of Andhra Pradesh to a path towards a happier life. At that time, disciplined chit funds were relatively unknown. Coinplus pioneered the concept in 1962.
            </p>
            <p className="leading-relaxed">
              As time went on, chit funds gained popularity because individuals recognized them as an ideal means of profitable savings and quick access to funds during contingencies. Today, Coinplus stands as the foremost Chit Fund Company and a household name in south India.
            </p>
            <p className="leading-relaxed">
              Amidst the emergence of numerous chit fund companies, Coinplus has maintained its leadership position by upholding unwavering values such as honest performance, professional integrity, exceptional service quality and absolute financial discipline. These enduring principles have solidified Coinplus's reputation and distinguished it from its counterparts in an ever-changing landscape.
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
              For over six decades, Coinplus has set the standard for excellence in the chit fund industry. Our commitment to maintaining the highest standards of service and financial discipline has earned us the trust of millions of customers across South India.
            </p>
            <p className="leading-relaxed">
              We believe that excellence is not just about numbers, but about the positive impact we create in people's lives. Every transaction, every interaction, and every promise kept contributes to our tradition of excellence.
            </p>
          </div>
        </>
      )
    },
    {
      title: 'History of Chit Funds',
      content: (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">History of Chit Funds</h2>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              Chit funds have been an integral part of Indian financial culture for centuries, originating as community-based savings schemes. The concept revolves around a group of individuals coming together to contribute a fixed amount periodically, with one member receiving the total amount each time through auction or lottery.
            </p>
            <p className="leading-relaxed">
              Coinplus revolutionized this traditional system in 1962 by introducing professional management, transparency, and regulatory compliance. We transformed informal savings circles into a structured, reliable financial instrument that millions could trust for their savings and credit needs.
            </p>
          </div>
        </>
      )
    },
    {
      title: 'A Chit Fund Company is as Good as its Foreman',
      content: (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">A Chit Fund Company is as Good as its Foreman</h2>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              In the chit fund business, the foreman plays a crucial role in ensuring the smooth functioning and success of each chit group. At Coinplus, we understand that our strength lies in the quality and integrity of our foremen.
            </p>
            <p className="leading-relaxed">
              Our foremen are carefully selected, rigorously trained, and continuously monitored to ensure they uphold our values of transparency, honesty, and customer-centric service. They serve as the vital link between the company and our valued customers, ensuring every transaction is handled with utmost care and professionalism.
            </p>
          </div>
        </>
      )
    },
    {
      title: 'Why Coinplus?',
      content: (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Why Coinplus?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-3">3 Lakh+ Active Customers</h3>
                <p className="text-gray-700">Trusted by over 3 lakh satisfied customers who continue to choose us for their financial needs.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-3">120+ Branches</h3>
                <p className="text-gray-700">Widespread presence with branches across South India, ensuring accessibility for all our customers.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-3">4200+ Employees</h3>
                <p className="text-gray-700">A dedicated team of professionals committed to providing excellent service and support.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-3">17000+ Agents</h3>
                <p className="text-gray-700">An extensive network of agents bringing our services closer to communities across the region.</p>
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Growing Force in Tamil Nadu and Karnataka</h2>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              Coinplus has expanded its presence significantly in Tamil Nadu and Karnataka, establishing itself as a trusted financial partner for individuals and businesses alike. Our growth in these regions reflects our commitment to serving diverse communities with tailored financial solutions.
            </p>
            <p className="leading-relaxed">
              With dedicated regional teams and localized services, we understand the unique financial needs of customers in Tamil Nadu and Karnataka, offering them the same reliability and excellence that has made us a household name in Andhra Pradesh.
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
              <p>Customers join a chit group by paying an initial subscription amount. Each group has a fixed number of members and a predetermined chit value.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Step 2: Regular Contributions</h3>
              <p>Members make regular monthly contributions as per the chit agreement. These contributions accumulate to form the prize amount.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Step 3: Monthly Auctions</h3>
              <p>Each month, members bid for the prize amount. The member willing to take the lowest bid amount receives the prize for that month.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Step 4: Continued Participation</h3>
              <p>Even after winning the prize, members continue to pay their monthly installments until the chit period completes.</p>
            </div>
          </div>
        </>
      )
    },
    {
      title: 'Coinplus, a Lifelong Friend',
      content: (
        <>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Coinplus, a Lifelong Friend</h2>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              For generations, Coinplus has been more than just a financial institution - we've been a lifelong friend to millions of families. We've celebrated their joys and supported them through challenges, helping them achieve their dreams and secure their futures.
            </p>
            <p className="leading-relaxed">
              Our relationship with customers goes beyond transactions. We build trust, understand aspirations, and provide financial solutions that grow with our customers through different stages of life. This enduring friendship is the foundation of our success and the reason families have trusted us for over six decades.
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
                          3 Lakh+
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
                          4200+
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
                          17000+
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