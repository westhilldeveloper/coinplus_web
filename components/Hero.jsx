import Image from 'next/image';

export default function Hero() {
  return (
    <section className="mt-6 md:mt-10 px-2 sm:px-2 lg:px-2 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
      {/* Left Content */}
      <div className="order-2 lg:order-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
          Chit Funds for <span className="text-primary">Every Goal</span>
        </h1>
        
        <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-600 max-w-2xl">
          Choose a plan, contribute monthly, and access lump-sum funds via auction or lottery — trusted since 1962.
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
        <div className="mt-6 md:mt-8 grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 max-w-md">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-lg shadow-sm">
            <div className="text-xs sm:text-sm text-slate-500">Branches</div>
            <div className="font-semibold flex items-center text-lg sm:text-xl md:text-2xl">350  <img 
    src="/images/add.gif" 
    alt="arrow"
    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-80 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300"
  /></div>
          </div>
          <div className="bg-slate-50 p-4 sm:p-5 rounded-lg shadow-sm">
            <div className="text-xs sm:text-sm text-slate-500">Members</div>
            <div className="flex items-center font-semibold text-lg sm:text-xl md:text-2xl">100k
              <img 
    src="/images/add.gif" 
    alt="arrow"
    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-80 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300"
  />
            </div>
          </div>
        </div>
      </div>


  
      {/* Right Video - Order first on mobile */}

      {/* style={{
    backgroundImage: 'url(/images/bg43.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }} */}
<div 
  className="order-1 lg:order-2 flex justify-center items-center relative h-full md:h-[500px] rounded-xl overflow-hidden"
  
>
  <div className="w-full flex justify-center items-center">
    <div className="w-full w-full sm:max-w-md lg:max-w-lg xl:max-w-xl px-4">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="rounded-xl sm:rounded-2xl object-cover w-full h-[300px] sm:h-[350px] md:h-[500px] lg:h-[550px] xl:h-[600px] shadow-lg sm:shadow-xl"
        aria-label="Background video showing our services"
      >
        <source src="/images/bg_video.mp4" type="video/mp4" />
        {/* Fallback image for browsers that don't support video */}
        <img 
          src="/images/cplogo.png" 
          alt="Chit fund services overview"
          className="w-full h-full object-cover rounded-xl"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</div>
    </section>
  );
}