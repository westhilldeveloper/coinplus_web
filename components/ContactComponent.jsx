import React from 'react';

const ContactComponent = () => {
  return (
    <div 
      className="relative flex justify-between items-center min-h-[100px] md:min-h-[150px] px-0 sm:px-4 lg:px-4 py-4 md:py-6"
      style={{
        backgroundImage: `url('/images/family.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-primary/60"></div>
      
      <div className="relative z-10 w-full  mx-auto">
        <div className="flex flex-col lg:flex-row  items-center gap-8 lg:gap-12">
          {/* Text section - takes equal width on large screens */}
          <div className="lg:w-1/2 lg:max-w-[50%] text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Want to chat? Feel free to contact our team
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-yellow-300 mb-8 md:mb-10">
              Reach out to our experts for personalised guidance and support.
            </p>
          </div>
          
          {/* Button section - takes equal width on large screens */}
          <div className="lg:w-1/2 lg:max-w-[50%] flex justify-center lg:justify-end mr-20">
            <button className="flex items-center justify-center gap-3 border-2 border-primary text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap">
              <img 
                src="/images/info.gif" 
                alt="Get a Quote" 
                className="w-12 h-12 md:w-18 md:h-18 rounded-full"
              />
             
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;