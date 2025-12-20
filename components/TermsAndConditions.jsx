import React from 'react';
import Image from 'next/image';

const TermsAndConditions = () => {
  const terms = [
    {
      number: "1",
      content: "Finovest Chits and Kuries Pvt Limited, operating from Pollachi under the Finovest Group of Companies, is responsible for the creation and upkeep of this website."
    },
    {
      number: "2",
      content: "You must read and accept the terms listed below to access this website. This website’s primary objective is to provide users with information about the company, the online auction, the rules, the payment method, and the Chit Fund activities."
    },
    {
      number: "3",
      content: "Users of the site’s services must be lawfully be an Indian citizen to enter into agreement. To address any disagreements that may arise regarding or linked to the content on this website or any of its affiliated sites, visitors, users, and members agree to submit to Indian law and the jurisdiction of the courts that have territorial jurisdiction over the location of the branch office offering or delivering the services."
    },
    {
      number: "4",
      content: "The site membership shall only be used by Finovest Chits and Kuries Pvt Limited Chits subscribers for their individual, one-time, and exclusive use. The subscriber may not assign his rights or privileges to another person. Finovest Chits and Kuries Pvt Limited reserves the right, in its sole discretion, to request proof of identification, chit reference, age, nationality, place of residence, income, security, solvency, and other details from applicants before allowing access to the website or membership."
    },
    {
      number: "5",
      content: "Finovest Chits and Kuries Pvt Limited retains the unlimited right to terminate any membership of the website at any time and without cause, without impacting the user’s legal rights as a chit subscriber. In regards to services provided on the Internet, the member who in this way forfeits their membership has no legal recourse against Finovest Chits and Kuries Pvt Limited."
    },
    {
      number: "6",
      content: "Regarding the information on the website, users are prohibited from sending offensive, threatening, coercive, harassing, indecent, or obscene emails to any of the directors, staff members, or other members of Finovest Chits and Kuries Pvt Limited."
    },
    {
      number: "7",
      content: "The officers, staff, or agents of Finovest Chits and Kuries Pvt Limited are not liable for any claims, losses, damages, fees, or expenditures that a user of the site may have incurred or is anticipated to incur as a result of visiting the site."
    },
    {
      number: "8",
      content: "The information that the customers provide shall be truthful, accurate, relevant, lawful, up to date, and equitable. The members shall submit evidence to support the information given, as requested by Finovest Chits and Kuries Pvt Limited."
    },
    {
      number: "9",
      content: "Additionally, Finovest Chits and Kuries Pvt Limited disclaims any warranties, whether explicit or implied, for any failure, interruption, or disturbance of the website or the services it offers."
    },
    {
      number: "10",
      content: "Finovest Chits and Kuries Pvt Limited maintains the right to make any changes for the betterment and quality enhancement of the content presented on the site, including additions, adjustments, modifications, insertions, enhancements, and decorations. Customers shall also agree to any changes that may be made to the content for it to be compatible with technological advancements. They must also agree, without reservation, to any modifications that Finovest Chits and Kuries Pvt Limited may deem necessary. Customers must also provide any information or materials that may be needed for the site to be updated or upgraded in light of technological advancements."
    },
    {
      number: "11",
      content: "Members maintain the confidentiality of the information that Finovest Chits and Kuries Pvt Limited, acting in good faith, have entrusted to them. Additionally, if they are provided to members exclusively, they must maintain the extreme confidentiality of passwords, One-Time Passwords (OTP), Chit reference numbers, and other information. Finovest Chits and Kuries Pvt Ltd shall not be responsible for misuse of members’ passwords, OTPs, or chit reference numbers that results from the revelation of such information, regardless of how inadvertent or harmless such usage may be."
    },
    {
      number: "12",
      content: "Neither the Finovest Chits and Kuries Pvt Ltd nor the foreman are liable for any technical problems on the part of the participant that would prevent him from taking part in the online auction. The company or the foremen are not liable if a participant disconnects from the auction for any reason, such as a poor internet connection."
    },
    {
      number: "13",
      content: "By entering the data, you allow merchants from third parties to get in touch with you to verify your KYC data or accept online payment terms and conditions."
    },
    {
      number: "14",
      content: "A waiting time of one month is required for any Subscriber to be eligible to claim the prize money."
    },
    {
      number: "15",
      content: "Every subscriber will get an equal dividend irrespective of Prized or Non-Prized, except for the first installment."
    },
    {
      number: "16",
      content: "On prizing of a Chit, the prized subscriber shall provide appropriate security to release the prize money without delay."
    },
    {
      number: "17",
      content: "The minimum and Maximum bid amount shall be intimated to subscriber on enrolment of Chit."
    }
  ];

  return (
    <div className="relative min-h-screen w-full md:py-8 py-2 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image with Overlay */}
     

      {/* Content Container */}
      <div className="relative z-10 max-w-full  mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 py-4" style={{
          backgroundImage: 'url(/images/terms.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}>
          <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            Terms and <span className="text-primary">Conditions</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our services
          </p>
        </div>

        {/* Terms Cards Container */}
        <div className="space-y-2">
          {terms.map((term, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-2xl"
            >
              {/* Card Background with Blur Effect */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl"></div>
              
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-24 h-24">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-tr-2xl"></div>
              </div>

              {/* Content */}
              <div className="flex  relative p-2">
                {/* Number Badge */}
                <div className="inline-flex items-center justify-center mr-4 rounded-xl">
                  <span className="text-lg font-bold text-black">{term.number}</span>
                </div>

                {/* Term Text */}
                <p className="text-gray-800 text-md leading-relaxed">
                  {term.content}
                </p>

                {/* Bottom Border Animation */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

       

       
      </div>
    </div>
  );
};

export default TermsAndConditions;