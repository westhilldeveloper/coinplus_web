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
  HeadphonesIcon,
  Youtube,
  Play,
  ExternalLink,
  Sparkles,
  Zap,
  Star,
  Target,
  Award,
  Users,
  Globe,
  Menu,
  X,
  Check,
  Circle
} from 'lucide-react';
import YouTubePlayer from './YouTubePlayer';

const ChitFundFAQ = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [activeSection, setActiveSection] = useState('about-chit-fund');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sectionRefs = useRef({});

  // YouTube Configuration
  const YOUTUBE_CHANNEL_ID = "UCZLUQLlKCXhQH_bvP4GmWHg";
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  // Sample video data
  const videoData = {
    'benefits': '9nte4r_FiGQ',
    'operation': '0e3JYDJXFzg',
    'payment': 'LT8mDipP92I',
    'auction': 'XZufAD-u0C4',
    'bidding': '9nte4r_FiGQ',
    'tax': 'uGDr8kkzSfI',
    'sureties': '9nte4r_FiGQ',
    'payout': '0e3JYDJXFzg',
    'finovest': '9nte4r_FiGQ',
    'values': 'QYUnKj8RmnU',
    'enroll': '4uT5mVZZuyo',
    'security': 'zzz_HabBI3M',
    'online-auction': 'elrf36X5_m4',
    'whatis':'Cxgy0EA_3f0'
  };

  /* ===================== HELPER FUNCTIONS ===================== */
  
  // Function to parse answer text into bullet points
  const parseAnswerToBullets = (answerText) => {
    if (!answerText) return [];
    
    // Split by newlines and filter empty lines
    const lines = answerText.split('\n').filter(line => line.trim());
    
    // Process lines to detect bullet patterns
    const parsedLines = lines.map(line => {
      const trimmedLine = line.trim();
      
      // Check for bullet patterns
      const isBullet = trimmedLine.match(/^[•\-\*]|^\d+\./) || 
                       trimmedLine.match(/^[A-Z][^:]*:/) || 
                       trimmedLine.includes(':');
      
      return {
        text: trimmedLine,
        isBullet: isBullet,
        isHeading: trimmedLine.match(/^[A-Z][^:]*:$/) && !trimmedLine.includes('.')
      };
    });
    
    return parsedLines;
  };

  /* ===================== DATA ===================== */

  const faqItems = [
     {
      id: 0,
      question: "what is  CoinPlus?",
      answer: `CoinPlus brings the trusted tradition of systematic savings plans (SSPs), also known as “chits,” into the digital age. Manage everything from the convenience of your phone, with complete transparency and ease. CoinPlus fosters a compulsory savings habit, helping you achieve your financial goals.`,
      videoId: videoData.whatis,
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-purple-600 to-pink-500",
      glow: "shadow-purple-500/20 sm:shadow-purple-500/30"
    },
     {
      id: 1,
      question: "Why should I join CoinPlus?",
      answer: `CoinPlus brings the trusted tradition of systematic savings plans (SSPs), also known as “chits,” into the digital age. Manage everything from the convenience of your phone, with complete transparency and ease. CoinPlus fosters a compulsory savings habit, helping you achieve your financial goals.`,
      videoId: videoData.benefits,
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-purple-600 to-pink-500",
      glow: "shadow-purple-500/20 sm:shadow-purple-500/30"
    },
   
    {
      id: 2,
      question: "How are Chit funds (SSPs) beneficial?",
      answer: `Chit funds (SSPs) are beneficial because they act as a dual instrument—they help you save consistently until the end of the chit, often yielding better returns than a bank savings account or recurring deposit (RD). They also allow you to borrow. In case of any unforeseen circumstances, you can lend more than what you have saved, providing financial flexibility. Additionally, the dividends received from chits are tax-free, making them a tax-efficient savings and borrowing tool.`,
      videoId: videoData.operation,
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-purple-600 to-pink-500",
      glow: "shadow-purple-500/20 sm:shadow-purple-500/30"
    },
   
    {
      id: 3,
      question: "What are the modes of payment on CoinPlus?",
      answer: `CoinPlus supports multiple payment modes, including:

UPI: Use your preferred UPI app for seamless contributions.
Netbanking: Transfer funds securely from your bank account.
Cheque: Traditional payment method.
Auto-Debit: Set up automatic recurring payments for hassle-free savings.
Cash collection & UPI payment at doorstep: Convenient doorstep services.`,
      // videoId: videoData.payment,
      icon: <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-purple-600 to-pink-500",
      glow: "shadow-emerald-500/20 sm:shadow-emerald-500/30"
    },
    
    
   
    {
      id: 4,
      question: "What are the sureties accepted while availing the prize money?",
      answer: `The following sureties are accepted:

Gold (22 carat & above)
Non-Prized Chit (NPC)
Fixed Deposits (FDs) from Nationalized and scheduled banks
Surrender value of LIC policies
Personal guarantee of salaried professionals
Bank guarantee from scheduled commercial banks
Unencumbered Land & Building`,
      icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-purple-600 to-pink-500",
      glow: "shadow-indigo-500/20 sm:shadow-indigo-500/30"
    },
    
    
   
    {
      id: 5,
      question: "What does a share of discount or dividend mean?",
      answer: `In chit funds, dividends represent the portion of profits or returns distributed to members, typically after each auction or on a monthly basis, continuing until the chit cycle concludes.`,
      
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-purple-600 to-pink-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 6,
      question: "What happens if nobody participates in an auction?",
      answer: `If no one participates in an auction, one of the prompt, non-prized subscribers will be selected through a high-tech lottery process, ensuring transparency and fairness.`,
      
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-purple-600 to-pink-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 7,
      question: "Is online auction legal in India?",
      answer: `Yes, online auctions are legal in India as per the Amendment Bill 2019 of Chit Fund Act 1982.`,
    
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-purple-600 to-pink-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 8,
      question: "What are the charges to join an SSP?",
      answer: `The charges to join an SSP are 0.1% of the chit value, subject to a minimum of ₹200 and a maximum of ₹500. This is a one-time membership fee, and you can join as many groups as you wish.`,
     
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-purple-600 to-pink-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 9,
      question: "Can NRIs join in chit groups?",
      answer: `Yes, NRIs can join chit groups. NRIs need to provide a valid passport and visa, while`,
     
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-purple-600 to-pink-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 10,
      question: " Can Business entities join in chit groups?",
      answer: `Yes, GST registered business entities can join chit groups.`,
     
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-purple-600 to-pink-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
    {
      id: 11,
      question: "Can a single person join multiple chit groups?",
      answer: `Yes, you can join multiple groups. However, you will need to furnish sufficient securities while releasing the prized amount.`,
     
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-purple-600 to-pink-500",
      glow: "shadow-teal-500/20 sm:shadow-teal-500/30"
    },
   
    
  ];

  const FinovestItems = [
    {
      id: 'm1',
      question: "Why choose Finovest?",
      answer: "Finovest is a trusted chit fund company with transparency, compliance, and timely payouts.",
      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />,
      videoId: videoData.benefits,
      gradient: "from-fuchsia-500 to-purple-500",
      glow: "shadow-fuchsia-500/20 sm:shadow-fuchsia-500/30"
    },
    {
      id: 'm2',
      question: "What chit values are available?",
      answer: "Chit values range from ₹50,000 to ₹1,00,00,000.",
      // videoId: videoData.values,
      icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-orange-500 to-red-500",
      glow: "shadow-orange-500/20 sm:shadow-orange-500/30"
    },
    {
      id: 'm3',
      question: "What are the durations?",
      answer: "Durations range from 10 to 60 months/weeks based on scheme and value.",
      icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-cyan-500 to-blue-500",
      glow: "shadow-cyan-500/20 sm:shadow-cyan-500/30"
    },
    {
      id: 'm4',
      question: "How to enroll?",
      answer: "Enroll via branch visit, online registration, or home assistance.",
      videoId: videoData.enroll,
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-lime-500 to-green-500",
      glow: "shadow-lime-500/20 sm:shadow-lime-500/30"
    },
    {
      id: 'm5',
      question: "How secure is my money?",
      answer: "Registered under the Chit Funds Act with full regulatory compliance.",
      // videoId: videoData.security,
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
      gradient: "from-amber-500 to-yellow-500",
      glow: "shadow-amber-500/20 sm:shadow-amber-500/30"
    }
  ];

  
  /* ===================== RESPONSIVE LOGIC ===================== */

  const toggleItem = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  // Fetch YouTube videos
  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      if (!YOUTUBE_API_KEY) {
        setVideos([
          { id: { videoId: 'xXQdXQdXQdQ' }, snippet: { title: 'Understanding Chit Funds' } },
          { id: { videoId: 'yYQdYQdYQdY' }, snippet: { title: 'How to Invest in Chit Funds' } },
        ]);
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=5&type=video`
        );
        const data = await response.json();
        if (data.items) {
          setVideos(data.items);
        }
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        setVideos([
          { id: { videoId: 'xXQdXQdXQdQ' }, snippet: { title: 'Understanding Chit Funds' } },
          { id: { videoId: 'yYQdYQdYQdY' }, snippet: { title: 'How to Invest in Chit Funds' } },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchYouTubeVideos();
  }, [YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu when clicking on a section
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  /* ===================== RENDER FUNCTION WITH BULLETS ===================== */

  const renderItem = (item) => {
    const hasVideo = item.videoId;
    const isActive = activeItem === item.id;
    const isHovered = hoveredItem === item.id;
    const parsedAnswer = parseAnswerToBullets(item.answer);

    return (
      <div 
        key={item.id} 
        className={`
          relative mb-2 sm:mb-2 group cursor-pointer
          transform transition-all duration-300 
          active:scale-[0.99] sm:hover:scale-[1.01] ${isActive ? 'scale-[1.01]' : ''}
        `}
        onMouseEnter={() => !window.matchMedia('(max-width: 640px)').matches && setHoveredItem(item.id)}
        onMouseLeave={() => !window.matchMedia('(max-width: 640px)').matches && setHoveredItem(null)}
      >
        {/* Animated Background Glow - Reduced on mobile */}
        <div className={`
          absolute inset-0 rounded-xl sm:rounded-2xl blur-lg opacity-10 sm:opacity-20 
          sm:group-hover:opacity-40 transition-all duration-300 ${item.glow}
          ${isActive ? 'opacity-20 sm:opacity-40' : ''}
        `} />
        
        {/* Main Card - Mobile optimized padding */}
        <div className={`
          relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 sm:border-white/20
          backdrop-blur-sm bg-gradient-to-br from-white/90 via-white/80 to-white/70
          sm:from-white/80 sm:via-white/60 sm:to-white/40
          shadow-md sm:shadow-lg shadow-black/5
          ${isActive ? 'ring-1 sm:ring-2 ring-white/30 sm:ring-white/50' : ''}
        `}>
          {/* Animated Gradient Border - Simplified on mobile */}
          <div className={`
            absolute inset-0 rounded-xl sm:rounded-2xl p-[1px] sm:p-[2px] bg-gradient-to-r ${item.gradient} opacity-0
            sm:group-hover:opacity-100 transition-opacity duration-300
            ${isActive ? 'opacity-100' : ''}
          `}>
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/90 sm:bg-white/80 backdrop-blur-sm" />
          </div>
          
          {/* Content - Mobile optimized layout */}
          <div className="relative z-10">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full p-2 sm:p-4 flex justify-between items-center text-left"
            >
              <div className="flex gap-3 sm:gap-4 items-center flex-1 min-w-0">
                {/* Icon with Gradient Background - Responsive sizing */}
                <div className={`
                  relative p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.gradient} 
                  shadow-md sm:shadow-lg ${item.glow} flex-shrink-0
                  transform transition-transform duration-300
                  active:scale-95 sm:group-hover:scale-110 ${isActive ? 'scale-95 sm:scale-110' : ''}
                `}>
                  <div className="relative text-white">
                    {item.icon}
                  </div>
                  {/* Floating particles effect - Hidden on mobile */}
                  {isHovered && !window.matchMedia('(max-width: 640px)').matches && (
                    <>
                      <div className="absolute -top-1 -right-1 w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-ping" />
                      <div className="absolute -bottom-1 -left-1 w-1 h-1 sm:w-2 sm:h-2 bg-white/50 rounded-full animate-ping" />
                    </>
                  )}
                </div>
                
                <div className="flex justify-between w-full min-w-0">
                  <span className="font-bold text-xs sm:text-sm md:text-md text-gray-800 group-hover:text-gray-900 block truncate sm:whitespace-normal">
                    {item.question}
                  </span>
                  {hasVideo && (
                    <div className="flex items-center gap-1 sm:gap-2 mt-1">
                      <span className="px-0 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-full flex items-center gap-1 shadow-sm sm:shadow-lg shadow-red-500/20 sm:shadow-red-500/30 flex-shrink-0">
                        <Youtube className="w-2 h-2 sm:w-3 sm:h-3" /> 
                        <span className="hidden xs:inline">Video</span>
                      </span>
                      <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-500 animate-pulse flex-shrink-0" />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Animated Chevron - Responsive sizing */}
              <div className={`
                p-1 sm:p-2 rounded-full bg-gradient-to-br from-white to-gray-100 ml-2 flex-shrink-0
                shadow-sm sm:shadow-lg transform transition-all duration-300
                ${isActive ? 'rotate-180' : ''}
              `}>
                {isActive ? 
                  <ChevronUp className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" /> : 
                  <ChevronDown className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
                }
              </div>
            </button>

            {/* Expanded Content - Responsive padding */}
            {isActive && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 animate-fadeIn">
                {/* Answer with bullet formatting */}
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm">
                  <div className="space-y-3 sm:space-y-4">
                    {parsedAnswer.map((line, index) => {
                      // Check if this is a heading line
                      if (line.isHeading) {
                        return (
                          <div key={index} className="mb-2">
                            <h4 className="font-bold text-gray-800 text-sm sm:text-base flex items-center gap-2">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-purple-600 to-pink-500" />
                              {line.text}
                            </h4>
                          </div>
                        );
                      }
                      
                      // Check if this is a bullet point
                      if (line.isBullet) {
                        return (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                                {line.text}
                              </p>
                            </div>
                          </div>
                        );
                      }
                      
                      // Regular text (no bullet)
                      return (
                        <div key={index} className="ml-5">
                          <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                            {line.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Video Section */}
                {hasVideo && (
                  <div className="space-y-4 sm:space-y-6">
                   
                    
                    {/* Video Player - Responsive aspect ratio */}
                    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl shadow-black/10 sm:shadow-black/20">
                      <div className="aspect-video">
                        <YouTubePlayer 
                          videoId={item.videoId} 
                          title={`Video: ${item.question}`}
                          responsive={true}
                        />
                      </div>
                    </div>
                    
                    {/* Action Buttons - Responsive grid */}
                    <div className="flex">
                      <a
                        href={`https://www.youtube.com/watch?v=${item.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-r from-red-600 to-red-700 p-3 sm:p-4 text-white shadow-md hover:shadow-lg hover:shadow-red-500/20 sm:hover:shadow-red-500/30 transition-all duration-300 active:scale-95 sm:hover:scale-[1.02] w-full"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                          <Youtube className="w-4 h-4 sm:w-6 sm:h-6" />
                          <span className="font-bold text-sm sm:text-base">Watch on YouTube</span>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ===================== RESPONSIVE UI ===================== */

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated Background Elements - Responsive positioning */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500/5 rounded-full blur-xl sm:blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500/5 rounded-full blur-xl sm:blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-pink-500/5 rounded-full blur-xl sm:blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative max-w-4xl lg:max-w-6xl mx-auto">
        {/* Header Section - Responsive typography */}
      

        {/* Main Content */}
        <div className="relative">
          {/* Glass Morphism Container - Responsive border radius */}
          <div className="backdrop-blur-lg sm:backdrop-blur-xl bg-white/80 rounded-md sm:rounded-3xl border border-gray-200 shadow-lg sm:shadow-2xl shadow-black/5 sm:shadow-black/10 overflow-hidden">
            {/* Sticky Navigation - Responsive layout */}
            <div className="sticky top-0 z-50">
              <div className="bg-gradient-to-r from-primary to-purple-900 backdrop-blur-lg sm:backdrop-blur-xl border-b border-gray-200">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h2 className="font-bold text-md sm:text-lg md:text-xl text-white truncate">
                        Interactive FAQ Explorer
                      </h2>
                      <p className="text-xs sm:text-sm font-normal text-gray-200 mt-1 truncate">
                        <Sparkles className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-500" />
                        {activeSection === 'about-chit-fund' && 'Explore Chit Fund Fundamentals'}
                        {activeSection === 'about-Finovest' && 'Discover Finovest Excellence'}
                        {activeSection === 'support' && 'Get Expert Support & Tools'}
                      </p>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-2 ml-4">
                      {['about-chit-fund', 'about-Finovest', 'support'].map((section) => (
                        <button
                          key={section}
                          onClick={() => {
                            document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={`
                            px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap
                            ${activeSection === section 
                              ? 'bg-white  text-primary shadow-lg' 
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }
                          `}
                        >
                          {section.split('-')[1]}
                        </button>
                      ))}
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="md:hidden ml-3 p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
                    >
                      {isMobileMenuOpen ? <X className="w-5 h-5 text-blue-700" /> : <Menu className="w-5 h-5 text-blue-700" />}
                    </button>
                  </div>
                </div>
                
                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                  <div className="md:hidden bg-white border-t border-gray-200 px-2 py-3 animate-slideDown">
                    <div className="flex flex-col gap-2">
                      {['about-chit-fund', 'about-Finovest', 'support'].map((section) => (
                        <button
                          key={section}
                          onClick={() => {
                            document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                            setIsMobileMenuOpen(false);
                          }}
                          className={`
                            px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-left
                            ${activeSection === section 
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }
                          `}
                        >
                          {section === 'about-chit-fund' && '📊 Chit Funds'}
                          {section === 'about-Finovest' && '🏆 Finovest'}
                          {section === 'support' && '🛠️ Support'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content - Responsive padding */}
            <div className="p-4 sm:p-6 md:p-8">
              {/* Chit Fund Section */}
              <section 
                id="about-chit-fund" 
                ref={el => sectionRefs.current['about-chit-fund'] = el} 
                className="mb-12 sm:mb-16 scroll-mt-20 sm:scroll-mt-24"
              >
                <div className="relative mb-6 sm:mb-8">
                  <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl blur opacity-10 sm:opacity-20" />
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2.5 sm:p-4 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl flex-shrink-0">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm  md:text-md font-bold text-gray-800 truncate"> CoinPlus Chits</h3>
                        <p className="text-gray-600 text-xs sm:text-sm truncate">Learn everything about CoinPlus Chits</p>
                      </div>
                    </div>
                  </div>
                </div>
                {faqItems.map(renderItem)}
              </section>

              {/* Finovest Section */}
              <section 
                id="about-Finovest" 
                ref={el => sectionRefs.current['about-Finovest'] = el} 
                className="mb-12 sm:mb-16 scroll-mt-20 sm:scroll-mt-24"
              >
                <div className="relative mb-6 sm:mb-8">
                  <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl sm:rounded-2xl blur opacity-10 sm:opacity-20" />
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-purple-100">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="p-2.5 sm:p-4 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl flex-shrink-0">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-md sm:text-lg md:text-xl font-bold text-gray-800 truncate">Why Finovest?</h3>
                        <p className="text-gray-600 text-sm sm:text-md truncate">Discover the excellence</p>
                      </div>
                    </div>
                  </div>
                </div>
                {FinovestItems.map(renderItem)}
              </section>

             

              {/* YouTube Channel Section - Responsive layout */}
              <div className="relative mt-12 sm:mt-16 md:mt-20">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border border-red-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/5 to-yellow-500/5" />
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations to global CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .text-balance {
            text-wrap: balance;
          }
        }
      `}</style>
    </div>
  );
};

export default ChitFundFAQ;