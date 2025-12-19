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
        <div className="absolute inset-0 bg-primary mx-2 border-2 border-primary rounded-4xl"></div>
        
        {/* Main Content - Added rounded-t-lg for top rounded corners only */}
        <div className="relative   rounded-t-lg z-10 mx-4 md:mx-12 px-4 sm:px-4 lg:px-4 py-6 md:py-10 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div className='flex justify-center md:justify-start'>
               <img 
                src="/images/info.gif" 
                alt="Get a Quote" 
                className="w-12 h-12 md:w-18 md:h-18 rounded-full"
              />
            </div>
            
            {/* Left Column - Chit Plans */}
            <div className="text-white">
              <h2 className="text-md md:text-xl font-bold mb-6">Chit Plans</h2>
              <div className="space-y-1">
                <div className="text-sm md:text-md font-semibold text-yellow-300">Pay Installments</div>
                <div className="text-sm md:text-md font-semibold text-yellow-300">Online Auctions</div>
              </div>
            </div>

            {/* Middle Column - Quick Links */}
            <div className="text-white">
              <h3 className="text-md md:text-xl font-bold mb-6">Quick Links</h3>
              <div className="grid grid-cols-2 gap-1">
                <Link href="#" className="hover:text-yellow-300 text-sm transition-colors">Complaints</Link>
                <Link href="#" className="hover:text-yellow-300 text-sm transition-colors">CSR Policy</Link>
                <Link href="#" className="hover:text-yellow-300 text-sm transition-colors">Events</Link>
                <Link href="#" className="hover:text-yellow-300 text-sm transition-colors">Events</Link>
                <Link href="#" className="hover:text-yellow-300 text-sm transition-colors">Why Us</Link>
                <Link href="#" className="hover:text-yellow-300 text-sm transition-colors">Suggestions / Feedback</Link>
                <Link href="#" className="hover:text-yellow-300 text-sm transition-colors">Investment *</Link>
                <Link href="#" className="hover:text-yellow-300 text-sm transition-colors">Careers</Link>
                <Link href="#" className="hover:text-yellow-300 text-sm transition-colors">FAQs</Link>
              </div>
            </div>

            {/* Right Column - Contact Info */}
            <div className="text-white">
              <h3 className="text-md md:text-xl font-bold mb-6">Contact Us</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-yellow-300 mb-2">Coinplus Chit Fund Pvt Ltd. Tamil Nadu</h4>
                  <p className="text-sm md:text-sm">5-10-196, Fateh Maidan Road, Opp. Police Court Room, Hyderabad - 500004, Telangana, India</p>
                  <p className="text-sm md:text-sm mt-1">Phone : 040-23442160/61/62</p>
                  <p className="text-sm md:text-sm">Mail : enrol@Coinplus.com</p>
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