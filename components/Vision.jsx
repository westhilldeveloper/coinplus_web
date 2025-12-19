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
    <div className="w-full py-8 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* TOP SECTION: IMAGE & VISION */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* LEFT IMAGE WITH STATS */}
          <div className="flex flex-col lg:flex-row justify-center items-center bg-gradient-to-br from-primary to-primary/60 text-white rounded-3xl p-6 md:p-8 shadow-lg w-full lg:w-2/3">
           <div className="w-full lg:w-1/2 mb-6 lg:mb-0 lg:pr-6 overflow-hidden rounded-xl">
  <img
    src="/images/family.png"
    alt="about"
    className="w-full max-w-md mx-auto rounded-xl hover:scale-105 transition-transform duration-500  animate-float"
  />
</div>
            <div className="w-full lg:w-1/2">
              <div className="text-center mb-6">
  <h2 className="text-2xl md:text-3xl font-bold inline-block pb-3 border-b-2 border-primary">
    No.1 Chit Fund
  </h2>
  <p className="opacity-90 text-sm mt-2">
    Company in India
  </p>
</div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 md:gap-6">
                <StatItem number="60 Lakh+" label="Satisfied Subscribers" />
                <StatItem number="128" label="Branches" />
                <StatItem number="17000+" label="Agents" />
                <StatItem number="4200+" label="Employees" />
              </div>
            </div>
          </div>

          {/* VISION CARD */}
          <div className="flex-1 bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-primary/20 flex flex-col justify-center relative">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/images/audience.gif" 
                  alt="arrow"
                  className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 opacity-80 transition-all duration-300"
                />
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">Our Vision</h3>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                To empower 1 million customers by 2030 with a commitment to foster
                growth, ensure stability, and encourage financial independence.
              </p>
            </div>

            <div className="absolute bottom-2 right-2 text-right opacity-10 hidden md:block">
              <img 
                src="/images/rangoli.gif" 
                alt="arrow"
                className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 opacity-80 transition-all duration-300"
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
                  className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 opacity-80 transition-all duration-300"
                />
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">Our Mission</h3>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                To expand our branch network by providing inclusive, secure, and
                accessible financial solutions that mirror our passion to impact
                each subscriber's life.
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