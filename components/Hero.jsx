import Image from 'next/image';

export default function Hero() {
  return (
    <section className=" font-normal mt-6 md:mt-10 px-2 sm:px-2 lg:px-2 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
      {/* Left Content */}
      <div className="order-2 lg:order-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
          Chit Funds for <span className="text-primary">Every Goal</span>
        </h1>
        
        <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-600 max-w-2xl">
          Choose a plan, contribute monthly, and access lump-sum funds via online  auction 
        </p>

        {/* Buttons - Stack on mobile, row on larger screens */}
        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a 
            href="/chitplans" 
            className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-center text-sm md:text-base"
          >
            View Plans
          </a>
          <a 
            href="https://subscriber.coinplus.co.in" 
            className="inline-block px-6 py-3 border border-gray-300 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center text-sm md:text-base"
          >
            Open an Account
          </a>
           
        </div>

        {/* Stats - Responsive grid */}
        <div className="mt-6 md:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 max-w-full">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-lg shadow-sm">
            <div className="text-xs sm:text-sm text-slate-500">Branches</div>
            <div className="font-semibold flex items-center text-lg sm:text-xl md:text-2xl">35  <img 
    src="/images/add.gif" 
    alt="arrow"
    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-80 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300"
  /></div>
          </div>
          <div className="bg-slate-50 p-4 sm:p-5 rounded-lg shadow-sm">
            <div className="text-xs sm:text-sm text-slate-500">Members</div>
            <div className="flex items-center font-semibold text-lg sm:text-xl md:text-2xl">1000
              <img 
    src="/images/add.gif" 
    alt="arrow"
    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-80 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300"
  />
            </div>
            

          </div>
          
        </div>
       
      </div>


  
     
<div 
  className="order-1 lg:order-2 flex justify-center items-center relative h-full md:h-[500px] rounded-xl overflow-hidden"
  
>
  <div className="w-full flex  flex-col justify-center items-center">
    <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-4 sm:px-0">
  <div className="relative aspect-video md:aspect-auto md:h-[500px] lg:h-[550px] xl:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden border-2 md:border-0 border-primary shadow-lg sm:shadow-xl">
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="absolute inset-0 w-full h-full object-cover"
      aria-label="Background video showing our services"
      title="Our Chit Fund Services"
    >
      <source src="/images/family.mp4" type="video/mp4" />
      {/* Fallback image for browsers that don't support video */}
      <img 
        src="/images/cplogo.png" 
        alt="Chit fund services overview"
        className="absolute inset-0 w-full h-full object-cover"
      />
      Your browser does not support the video tag.
    </video>
    
    {/* Brand Logo Overlay */}
    <div className="absolute z-10 bottom-0 md:bottom-10  left-1/5 w-2/3 flex items-center justify-center">
      <img 
        src="/images/brandLogo.png" 
        alt="Company Brand Logo"
        className="  "
      />
    </div>
  </div>
</div>
   
  </div>
</div>
    </section>
  );
}