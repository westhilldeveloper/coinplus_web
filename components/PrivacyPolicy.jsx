import React from 'react';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Privacy & Policy",
      type: "header",
      content: "Financial Crisis and Market Put Limited under Financial Group. Our goal is to disrupt industries in existing ways, providing innovative financial solutions and able to realise with the demands of our clients. We are committed to protect your privacy. This policy outlines how we collects, use, and safeguard your personal information about our role that provides."
    },
    {
      title: "Collection of Information",
      type: "section",
      items: [
        "Personal Information: Any information contained in identity or specific persons, such as full name, email address, mobile number, Auditor Card No. 804, more of names, IP address, URL, etc., is called personal information.",
        "Address and IDA numbers, binomial data, bank account, debit card, and other payment details, sensitive passwords, sexual orientation, and other specified information are compiled at *personal order*. (Findable link not referenced in images and fingerprints)",
        "Transaction Data records of you can find transactions, contributions, and withdrawals.",
        "Communication Data Information from your interactions with us, including emails, WhatsApp and text messages."
      ]
    },
    {
      title: "How We Use Your Information",
      type: "section",
      items: [
        "To confirm your address with BMS, CST No. Request to be full online number.",
        "By using your information, we can recognize the your service and support requests more quickly.",
        "To process your transaction connectivity.",
        "To periodically give you an EME regarding the transactions you've done, as well as a reminder regarding the auditors and the DIE signals payment deadline."
      ]
    },
    {
      title: "Data Protection",
      type: "section",
      content: "No matter how or from where you share personal information with us, PROVEST OFTS AND USRES PVT UNITED is committed to protect the privacy of that information. That includes any information that may be obtained from a user's browser by one of our servers, affiliated businesses, subsidiaries, or representatives."
    },
    {
      title: "Sharing Your Information",
      type: "section",
      content: "We do not add or rent your personal information to third parties. We may share your information with:",
      items: [
        "Government Regulatory bodies as required by law.",
        "Service providers who assist us in operating our services (e.g., Payment Gateway, SMS providers etc.).",
      
      ]
    },
    {
      title: "Changes to This Privacy Policy :",
      type: "section",
      content:"You will share the data/information with prudence. Generally speaking:",
      items: [
        "To confirm that a webpage is secured, always look for https in the address bar.",
        "Always steer clear of third-party browser add-ons, plug-ins, and extensions.",
        "Refrain from using the Dark Web or hidden services, and avoid autofill choices.",
        "Before using any applications, review the terms of use and the website's privacy policy.",
        "You shall download mobile app only from the Apple Store and Play Store."
      ]
    },
    {
      title: "PROTECTION OF PRIVACY OF CHILDREN/MINOR:",
      type: "section",
      content: "Use of the Website is available only to persons who can form legally binding contracts under applicable law. Persons who are incompetent to contract within the meaning of the Indian Contract Act, 1872 including un-discharged insolvents, etc. are not eligible to use the Website.",
      
    },
    {
      title: "Disclosure of Information",
      type: "section",
      items:[
        "Legal Compliance: When necessary for legal compliance, Finovest Chits and Kuries Pvt Limited may provide any statutory or regulatory government institutions with the personal information you have given. We may use personal information to respond to court orders or other legal proceedings to establish or carry out our legal rights or to defend against legal claims.",
        "Service Providers: Finovest Chits and Kuries Pvt Limited would do everything in its power to safeguard client data and information. That being said, Finovest Chits and Kuries Pvt Limited shall not be held liable for any data security breaches brought on by outside causes.",
        "Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that business transaction."
      ]
    },
    
  ];

  return (
    <div className="relative min-h-screen w-full md:py-4 py-2 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Content Container */}
      <div className="relative z-10 max-w-full mx-auto">
        {/* Header Section with Background Image */}
        <div 
          className="text-center mb-6 py-12 relative overflow-hidden"
          style={{
            backgroundImage: 'url(/images/terms.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy & <span className="text-yellow-300">Policy</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-6"></div>
            <p className="text-white/90 text-lg max-w-3xl mx-auto px-4">
              Protecting your personal information is our top priority. Learn how we collect, use, and safeguard your data.
            </p>
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl"
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200"></div>
              
              {/* Decorative Accent */}
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-600 to-purple-600"></div>

              {/* Content */}
              <div className="relative p-6 md:p-8">
                {/* Section Title */}
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-4">
                    {section.type === "header" ? (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-lg">{index}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h2 className={`font-bold ${
                      section.type === "header" 
                        ? "text-2xl md:text-3xl text-gray-900" 
                        : "text-xl md:text-2xl text-gray-800"
                    }`}>
                      {section.title}
                    </h2>
                    
                    {/* Section Content */}
                    {section.content && (
                      <p className="mt-3 text-gray-700 leading-relaxed">
                        {section.content}
                      </p>
                    )}
                  </div>
                </div>

                {/* List Items */}
                {section.items && (
                  <div className="ml-14 mt-4 space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start">
                        <div className="flex-shrink-0 mt-1 mr-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bottom Border Animation */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;