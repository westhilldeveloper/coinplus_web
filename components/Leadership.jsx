"use client";

import React from 'react';

const Leadership = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-2">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Content Section */}
          <div className="lg:w-3/5 p-8 md:p-12 lg:p-16">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-900 mb-8">
              Leadership
            </h1>
            
            <div className="space-y-6 text-gray-700 text-md leading-relaxed">
              <p>
                The visionary genius Late. Sri Krishna Shankar, founder chairperson - Finovest Group, realized financial empowerment alone had the power to help the middle class achieve their dreams and goals.
              </p>
              
              <p>
                Be it purchasing one's own house or working capital to set up a business; ensuring a child's higher education or performing their daughter's wedding and even as a retirement fund, the Finovest Group had the answer.
              </p>
              
              <p>
                Thus the epic journey of Coinplus Chit Fund began in the year 1962. What started modestly with just two employees is today a large family of 4,300 dedicated individuals spread across 35 Branches in the four states of  Tamil Nadu and Kerala.
              </p>
              
              <p>
                With an enviable distinction of having serviced sixty lakh subscribers in the last sixty years, Coinplus is today a household name and the undisputed leader in the Chit Industry.
              </p>
              
              <div className="pt-6 mt-6 border-t border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                   Sri Krishna Shankar
                </h2>
                <p className="text-gray-600 text-md">
                  Founder Chairperson-Finovest Group
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Image Section */}
          <div className="lg:w-2/5 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="h-full flex flex-col items-center justify-center p-8 md:p-12 lg:p-16">
              <div className="relative w-full max-w-sm mx-auto">
                {/* Image with decorative frame */}
                <div className="relative overflow-hidden rounded-xl shadow-2xl">
                  <img 
                    src="/images/md.jpeg" 
                    alt="Sri Krishna Shankar"
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Decorative overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-amber-100 rounded-full"></div>
                
                {/* Signature */}
                <div className="mt-10 text-center">
                  <div className="inline-block border-t-2 border-gray-300 pt-4">
                    <div className="text-gray-800 text-lg font-serif italic">
                      "Visionary Leader"
                    </div>
                    <div className="text-gray-500 text-sm mt-1">
                      2014 - Present
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

export default Leadership;