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
                 ” My vision for CoinPlus was simple: to take the core principles of chits – trust, community, and disciplined savings – and translate them into a seamless, secure, and user-friendly digital experience. We wanted to create a platform that would not only benefit those already familiar with chits, particularly our older generations who appreciate its time-tested approach, but also introduce its advantages to a new generation of savers. Young people today face a complex financial landscape, often bombarded with temptations like easy credit and instant gratification.
              </p>
              
              <p>
                We believe CoinPlus offers a powerful alternative: a way to cultivate a strong savings habit, build financial security, and achieve long-term goals.
CoinPlus is more than just a digital version of a chits; it’s a carefully structured and registered systematic savings plan (SSP) operating under the Chit Funds Act 1982. This ensures transparency, security, and peace of mind for all our members. We’ve built CoinPlus with the highest standards of security and compliance, so you can focus on what matters most: growing your savings.”
              </p>
              
             
              
              <div className="pt-6 mt-6 border-t border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                   Sri Krishna Shankar <span className='text-sm text-gray-400'>M Tech, LLM</span>
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