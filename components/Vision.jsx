"use client";

import {
  Users,
  Building2,
  UserCheck,
  Target,
  Eye,
  ShieldCheck,
  HeartHandshake,
  Scale,
  Award,
  Handshake,
} from "lucide-react";

export default function Vision() {
  return (
    <div className="w-full py-4 md:py-16 px-0 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-full mx-auto">
        {/* TOP SECTION: IMAGE & VISION */}
       <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* LEFT IMAGE WITH STATS - Enhanced */}
          <div className="flex flex-col lg:flex-row justify-center items-center bg-gradient-to-br from-primary via-purple-600 to-purple-900 via-primary/80 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group w-full lg:w-2/3">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative w-full lg:w-1/2 mb-6 lg:mb-0 lg:pr-6 overflow-hidden rounded-2xl">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/30 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                <img
                  src="/images/family.png"
                  alt="about"
                  className="w-full max-w-md mx-auto transform transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
            
            <div className="relative w-full lg:w-1/2">
              <div className="text-center mb-6 relative">
                <div className="inline-block relative">
                   <div className="absolute top-0 -left-2 w-6 h-6 bg-primary rounded-full animate-ping"></div>
                  <h2 className="text-2xl md:text-3xl font-bold inline-block pb-3 border-b-2 border-yellow-400">
                    CoinPlus
                  </h2>
                 
                </div>
                <p className="opacity-90 text-sm mt-2 bg-white/10 px-4 py-1 rounded-full inline-block">
                  Finovest Chits and Kuries Pvt Ltd
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 md:gap-6">
                <StatItem number="5 K+" label="Satisfied Subscribers" />
                <StatItem number="35 +" label="Collection Centres" />
                <StatItem number="170+" label="Agents" />
                <StatItem number="100+" label="Employees" />
              </div>
              
              {/* Floating element */}
              <div className="mt-6 flex justify-center">
                <div className="w-8 h-1 bg-yellow-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>

          {/* VISION CARD - Enhanced */}
          <div className="flex-1 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-6 md:p-8 border-2 border-primary/30 relative overflow-hidden group">
            {/* Animated corner elements */}
            <div className="absolute top-0 left-0 w-16 h-16">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-lg"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16">
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-lg"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <img 
                    src="/images/audience.gif" 
                    alt="arrow"
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 opacity-80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                  />
                  {/* <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary/40 rounded-full animate-ping"></div> */}
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary drop-shadow-sm">
                  Our Vision
                </h3>
              </div>

              <div className="relative">
                <p className="text-gray-600 leading-relaxed text-sm md:text-base p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border-l-4 border-primary transition-all duration-300 group-hover:border-l-8 group-hover:shadow-md">
                  To empower individuals and families with the financial tools and trust needed to turn their aspirations into reality.
                </p>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/20 rounded-br-xl"></div>
              </div>
            </div>

            <div className="absolute bottom-2 right-2 opacity-10 hidden md:block group-hover:opacity-20 transition-opacity duration-300">
              <img 
                src="/images/rangoli.gif" 
                alt="arrow"
                className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 opacity-80 transition-all duration-300 group-hover:rotate-180"
              />
            </div>
          </div>
        </div>

        {/* MISSION & VALUES SECTION */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mt-6 md:mt-8">
          
          {/* MISSION CARD */}
          <div className="lg:w-1/4">
            <div className="relative bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/images/mission.gif" 
                  alt="arrow"
                  className="w-12 h-12 md:w-12 md:h-12 lg:w-20 lg:h-20 opacity-80 transition-all duration-300"
                />
                <h3 className="text-2xl md:text-2xl lg:text-3xl font-bold text-primary">Our Mission</h3>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                To provide accessible, secure, and empowering financial solutions that help individuals and families build a more stable and independent future.
              </p>

              <div className="absolute bottom-2 right-2 opacity-10 hidden md:block">
                <img 
                  src="/images/rangoli.gif" 
                  alt="arrow"
                  className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 opacity-80 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* VALUES SECTION */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-3xl shadow-lg p-4  border border-primary/20 h-full">
              

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                <div className="flex justify-center items-center">
                <h3 className="text-xl md:text-2xl font-bold text-primary">Our Values</h3>
              </div>
                <ValueCard image="/images/honesty.gif" title="Honesty" />
                <ValueCard image="/images/document-analysis.gif" title="Compliance" />
                <ValueCard image="/images/leadership.gif" title="Empathy" />
                <ValueCard image="/images/shield.gif" title="Best Practices" />
                <ValueCard image="/images/justice.gif" title="Integrity" />
              </div>
            </div>
          </div>
        </div>

        {/* ALTERNATIVE: VALUES IN A SEPARATE ROW (if you prefer) */}
        {/* 
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">Our Values</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            <ValueCard image="/images/honesty.gif" title="Honesty" />
            <ValueCard image="/images/document-analysis.gif" title="Compliance" />
            <ValueCard image="/images/leadership.gif" title="Empathy" />
            <ValueCard image="/images/shield.gif" title="Best Practices" />
            <ValueCard image="/images/justice.gif" title="Integrity" />
          </div>
        </div>
        */}
      </div>
    </div>
  );
}

function StatItem({ number, label }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-xl md:text-2xl font-bold">{number}</span>
      <span className="text-xs md:text-sm opacity-90">{label}</span>
    </div>
  );
}

function ValueCard({ image, title }) {
  return (
    <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer text-center flex flex-col items-center justify-center gap-4 hover:scale-[1.02] min-h-[120px]">
      <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full rounded-full object-contain"
        />
      </div>
      <h4 className="font-medium text-primary text-sm md:text-base">{title}</h4>
    </div>
  );
}