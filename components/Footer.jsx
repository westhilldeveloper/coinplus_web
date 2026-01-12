import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative w-full mt-12 ">
      {/* Background Image Section */}
      <div 
        className="relative w-full bg-cover bg-center bg-no-repeat"
        
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-purple-800 mx-2 border-2 border-primary rounded-4xl"></div>
        
        {/* Main Content - Added rounded-t-lg for top rounded corners only */}
        <div className="relative   rounded-t-lg z-10 mx-4 md:mx-8 px-4 sm:px-4 lg:px-4 py-6 md:py-10 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-4">
            <div className=' justify-center md:justify-start'>
              <div className=''>
                 <img 
                src="/images/lg_finovest.png" 
                alt="Get a Quote" 
                className="w-20 h-12"
              />
               <img 
                src="/images/lg_coinplus.png" 
                alt="Get a Quote" 
                className="w-3/4"
              />
             
              </div>
              <img 
                src="/images/brandLogo.png" 
                alt="Get a QR Code" 
                className="w-3/4"
              />
            </div>
            
            {/* Left Column - Chit Plans */}
           <div className="flex flex-col justify-start text-white">
  <h2 className="text-md md:text-xl font-bold md:mb-6 mb-2">Chit Plans</h2>
  <div className="space-y-1">
    <div className="text-sm md:text-md font-semibold text-yellow-300">Pay Installments</div>
    <div className="text-sm md:text-md font-semibold text-yellow-300">Online Auctions</div>
    <div className="text-sm md:text-md font-semibold mb-2 text-yellow-300">Download App</div>
  </div>
  <div className="flex justify-start w-1/3"> {/* Added w-full */}
    <img 
      src="/images/playStoreQR.png" 
      alt="Get a QR Code" 
       className="self-start mr-2"
    />
     <img 
      src="/images/appStore_QR.png" 
      alt="Get a QR Code" 
       className="self-start"
    />
  </div>
</div>

            {/* Middle Column - Quick Links */}
            <div className="text-white">
              <h3 className="text-md md:text-xl font-bold md:mb-6 mb-2">Quick Links</h3>
              <div className="grid grid-cols-2 gap-1">
                <Link href="/about" className="hover:text-yellow-300 text-sm transition-colors">About us</Link>
                <Link href="/chitplans" className="hover:text-yellow-300 text-sm transition-colors">Chit Plans</Link>
                <Link href="/whyus" className="hover:text-yellow-300 text-sm transition-colors">Why Us</Link>
                <Link href="/faqs" className="hover:text-yellow-300 text-sm transition-colors">FAQs</Link>
                <Link href="/media/news" className="hover:text-yellow-300 text-sm transition-colors">News</Link>
                <Link href="/media/gallery" className="hover:text-yellow-300 text-sm transition-colors">Gallery</Link>
                <Link href="/media/events" className="hover:text-yellow-300 text-sm transition-colors">Events</Link>
                <Link href="/careers" className="hover:text-yellow-300 text-sm transition-colors">Careers</Link>
                <Link href="/privacy" className="hover:text-yellow-300 text-sm transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-yellow-300 text-sm transition-colors">Terms & Conditions</Link>
                <Link href="/refund" className="hover:text-yellow-300 text-sm transition-colors">Refund Policy</Link>
                <Link href="/contactus" className="hover:text-yellow-300 text-sm transition-colors">Contact us</Link>
              </div>
            </div>

            {/* Right Column - Contact Info */}
            <div className="text-white">
              <h3 className="text-md md:text-xl font-bold md:mb-6 mb-2">Contact Us</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-yellow-300 mb-2">Finovest Chits & Kuries Pvt Ltd. </h4>
                  <p className="text-sm md:text-sm">Kalyana Krishna Samskrithibhavan, BHS Rd, Kannankulangara, Thrippunithura, Ernakulam, Kochi, Kerala- 682301.</p>
                  <p className="text-sm md:text-sm mt-1">Phone : +91 97460 03484</p>
                  <p className="text-sm md:text-sm">Mail : care@coinplus.co.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
       <div 
        className="relative w-full  bg-cover bg-center bg-no-repeat"
        style={{backgroundImage: `url('/images/footer-img.jpg')`}}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/60 "></div>
        <div className='h-52'>

        </div>
        </div>
    </footer>
  );
};

export default Footer;