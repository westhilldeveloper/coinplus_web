'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  HelpCircle,
  DollarSign,
  Calendar,
  Gavel,
  TrendingUp,
  Shield,
  Clock,
  Building,
  HeadphonesIcon
} from 'lucide-react';

const ChitFundFAQ = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [activeSection, setActiveSection] = useState('about-chit-fund');
  const sectionRefs = useRef({});

  /* ===================== DATA ===================== */

  const faqItems = [
    {
      id: 1,
      question: "What are the benefits of a chit fund?",
      answer:
        "Chit funds offer regular savings, access to lump sum without credit checks, attractive returns, and flexibility in bidding.",
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 2,
      question: "How does a chit fund operate?",
      answer:
        "Subscribers contribute monthly. Every month an auction is conducted where the lowest bidder receives the prize amount.",
      icon: <HelpCircle className="w-5 h-5" />
    },
    {
      id: 3,
      question: "What are the modes of payment?",
      answer:
        "Payments can be made via cash, cheque, bank transfer, UPI, and online gateways.",
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      id: 4,
      question: "When can I participate in the auction?",
      answer:
        "You can participate from the first month itself unless foreman rules apply.",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: 5,
      question: "What is the purpose of bidding?",
      answer:
        "Bidding helps subscribers access funds earlier while sharing dividends with others.",
      icon: <Gavel className="w-5 h-5" />
    },
    {
      id: 6,
      question: "What are the Income Tax benefits?",
      answer:
        "Chit fund savings may qualify under Section 80C. Prize amount is not treated as income.",
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 7,
      question: "What are the sureties to be submitted?",
      answer:
        "ID proof, address proof, income proof, photographs, and guarantors if required.",
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 8,
      question: "How soon can I expect payment?",
      answer:
        "Payments are generally disbursed within 24–48 hours after winning the bid.",
      icon: <Clock className="w-5 h-5" />
    }
  ];

  const FinovestItems = [
    {
      id: 'm1',
      question: "Why choose Finovest?",
      answer:
        "Finovest is a trusted chit fund company with transparency, compliance, and timely payouts.",
      icon: <Building className="w-5 h-5" />
    },
    {
      id: 'm2',
      question: "What chit values are available?",
      answer:
        "Chit values range from ₹50,000 to ₹1,00,00,000.",
      icon: <HelpCircle className="w-5 h-5" />
    },
    {
      id: 'm3',
      question: "What are the durations?",
      answer:
        "Durations range from 10 to 60 months based on scheme and value.",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: 'm4',
      question: "How to enroll?",
      answer:
        "Enroll via branch visit, online registration, or home assistance.",
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'm5',
      question: "How secure is my money?",
      answer:
        "Registered under the Chit Funds Act with full regulatory compliance.",
      icon: <Shield className="w-5 h-5" />
    }
  ];

  const supportItems = [
    {
      id: 's1',
      question: "Bid Offer in Advance",
      answer:
        "Subscribers can place advance bids for future auctions.",
      icon: <Gavel className="w-5 h-5" />
    },
    {
      id: 's2',
      question: "Online Auction Participation",
      answer:
        "Participate securely via mobile app or web portal.",
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 's3',
      question: "Customer Support",
      answer:
        "Support via helpline, WhatsApp, email, and branches.",
      icon: <HeadphonesIcon className="w-5 h-5" />
    }
  ];

  /* ===================== LOGIC ===================== */

  const toggleItem = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderItem = (item) => (
    <div key={item.id} className="border-2 border-primary rounded-xl mb-4">
      <button
        onClick={() => toggleItem(item.id)}
        className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-indigo-50"
      >
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            {item.icon}
          </div>
          <span className="font-semibold text-sm">{item.question}</span>
        </div>
        {activeItem === item.id ? <ChevronUp /> : <ChevronDown />}
      </button>

      {activeItem === item.id && (
        <div className="p-4 text-sm bg-blue-50 text-gray-700">
          {item.answer}
        </div>
      )}
    </div>
  );

  /* ===================== UI ===================== */

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl">

        {/* ===== STICKY HEADER (FIXED) ===== */}
        <div className="sticky top-14 md:top-18  bg-white border-b shadow-md">
          <div className="p-4 flex justify-between items-center">
            <h2 className="font-bold text-lg text-primary">
              {activeSection === 'about-chit-fund' && 'All About Chit Fund'}
              {activeSection === 'about-Finovest' && 'All About Finovest'}
              {activeSection === 'support' && 'Support'}
            </h2>

            {/* <div className="hidden md:flex gap-3">
              <button onClick={() => scrollToSection('about-chit-fund')} className="px-3 py-1 bg-gray-100 rounded">Chit Fund</button>
              <button onClick={() => scrollToSection('about-Finovest')} className="px-3 py-1 bg-gray-100 rounded">Finovest</button>
              <button onClick={() => scrollToSection('support')} className="px-3 py-1 bg-gray-100 rounded">Support</button>
            </div> */}
          </div>
        </div>

        {/* ===== SCROLLABLE CONTENT ===== */}
        <div className=" overflow-y-auto p-6">

          <section id="about-chit-fund" ref={el => sectionRefs.current['about-chit-fund'] = el}>
            {faqItems.map(renderItem)}
          </section>

          <section id="about-Finovest" ref={el => sectionRefs.current['about-Finovest'] = el}>
            {FinovestItems.map(renderItem)}
          </section>

          <section id="support" ref={el => sectionRefs.current['support'] = el}>
            {supportItems.map(renderItem)}
          </section>

        </div>
      </div>
    </div>
  );
};

export default ChitFundFAQ;
