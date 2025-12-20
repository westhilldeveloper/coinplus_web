'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function WhyUs() {
  const items = [
    { 
      title: 'Tax Free Dividends', 
      desc: 'Decades of service and financial discipline.',
      icon: 'images/tax-free.gif'
    },
    { 
      title: 'Easy Withdrawals', 
      desc: 'Branches across states for in-person support.',
      icon: 'images/withdraw.gif'
    },
    { 
      title: 'Fair Distribution', 
      desc: 'Clear auction and fee policies.',
      icon: 'images/distribution.gif'
    },
    { 
      title: 'Access to Funds', 
      desc: 'Government registered and fully compliant.',
      icon: 'images/crowdfunding.gif'
    },
    { 
      title: 'Interest Free Payments', 
      desc: 'Fast fund access when you need it most.',
      icon: 'images/interest-rate.gif'
    },
    { 
      title: 'Good Returns \u00A0\u00A0\u00A0\u00A0', 
      desc: 'Customizable options for every goal.',
      icon: 'images/return-of-investment.gif'
    }
  ];

  const router = useRouter();

  
  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      {/* Hero Section */}
      <section 
        id="how" 
        className="py-8 sm:py-10 md:py-12 lg:py-16 w-full relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl"
        style={{
          backgroundImage: 'url(/images/grad.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/80 mix-blend-multiply"></div>
        
        {/* Optional: Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[length:20px_20px] sm:bg-[length:30px_30px] md:bg-[length:40px_40px]"></div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 gap-6 sm:gap-4 md:gap-8">
          {/* Section Header */}
          <div className="text-center sm:text-left w-full sm:w-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
              Let us help you choose 
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              the best <span className="text-yellow-300 sm:text-yellow-400">chits</span> plans
            </h2>
          </div>
          
          {/* CTA Button */}
          <div className="w-full sm:w-auto">
           <button onClick={() => router.push('/chitplans')} className='w-full sm:w-auto border-2 border-white text-white font-bold rounded-md py-2.5 sm:py-3 px-6 sm:px-8 hover:bg-white/10 active:scale-95 transition-all duration-300 text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 sm:gap-3 group'>
  Enquire Now
  <img 
    src="/images/right-arrow.gif" 
    alt="arrow"
    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-80 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300"
  />
</button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <div className=' my-6 sm:my-8 md:my-12'>
 <h1 className='md:text-4xl text-2xl font-bold '>Our Strengths</h1>
      </div>
      
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 md:gap-6 lg:gap-8 my-6 sm:my-8 md:my-12">
       
        {items.map((item, index) => (
          <div 
            key={item.title}
            className="group relative bg-transparent backdrop-blur-sm border border-primary rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg hover:shadow-2xl transition-all duration-100 overflow-hidden"
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            {/* Hover Effect - Small Ball that Expands to Fill Card */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-primary/20 
                          group-hover:top-0 group-hover:right-0 group-hover:w-full group-hover:h-full 
                          group-hover:rounded-xl sm:group-hover:rounded-2xl group-hover:bg-primary/90 
                          transition-all duration-700 ease-out z-0"></div>
            
            {/* Icon Container */}
            <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary to-secondary 
                          rounded-md sm:rounded-md md:rounded-full flex items-center justify-center mb-3 sm:mb-4 md:mb-6 
                          group-hover:bg-white group-hover:scale-105 sm:group-hover:scale-110 
                          transition-all duration-200 mx-auto sm:mx-0">
              <span className="text-xl sm:text-2xl md:text-3xl group-hover:text-primary transition-colors duration-100">
               <img 
        src={item.icon} 
        alt={item.title}
        className="rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain group-hover:brightness-100 group-hover:contrast-125 transition-all duration-500"
        loading="lazy"
      />
              </span>
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center sm:text-left">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary mb-2 sm:mb-3 
                            group-hover:text-white transition-colors duration-500 leading-tight">
                {item.title}
              </h3>
             
            </div>
            
            {/* Decorative Line */}
            <div className="relative z-10 mt-3 sm:mt-4 md:mt-6 w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-secondary 
                          rounded-full group-hover:bg-white/80 transition-all duration-500 mx-auto sm:mx-0"></div>
          </div>
        ))}
      </div>

      
    </div>
  );
}