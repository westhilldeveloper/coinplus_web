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
  ExternalLink
} from 'lucide-react';
import YouTubePlayer from './YouTubePlayer';

const ChitFundFAQ = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [activeSection, setActiveSection] = useState('about-chit-fund');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const sectionRefs = useRef({});

  // YouTube Configuration - Replace with your actual channel ID
  const YOUTUBE_CHANNEL_ID = "UCZLUQLlKCXhQH_bvP4GmWHg";
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  // Sample video data - Replace with your actual video IDs
  const videoData = {
    'benefits': '7E_WfBXfTIg',
    'operation': 'zzz_HabBI3M',
    'payment': 'LT8mDipP92I',
    'auction': 'XZufAD-u0C4',
    'bidding': '9nte4r_FiGQ',
    'tax': 'uGDr8kkzSfI',
    'sureties': '9nte4r_FiGQ',
    'payout': '0e3JYDJXFzg',
    'finovest': '9nte4r_FiGQ',
    'values': 'QYUnKj8RmnU',
    'enroll': '6v-1Xk1eLaM',
    'security': 'zzz_HabBI3M',
    'online-auction': 'elrf36X5_m4'
  };

  /* ===================== DATA ===================== */

  const faqItems = [
    {
      id: 1,
      question: "What are the benefits of a chit fund?",
      answer:
        "Chit funds offer regular savings, access to lump sum without credit checks, attractive returns, and flexibility in bidding.",
      videoId: videoData.benefits,
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 2,
      question: "How does a chit fund operate?",
      answer:
        "Subscribers contribute monthly. Every month an auction is conducted where the lowest bidder receives the prize amount.",
      videoId: videoData.operation,
      icon: <HelpCircle className="w-5 h-5" />
    },
    {
      id: 3,
      question: "What are the modes of payment?",
      answer:
        "Payments can be made via cash, cheque, bank transfer, UPI, and online gateways.",
      videoId: videoData.payment,
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      id: 4,
      question: "When can I participate in the auction?",
      answer:
        "You can participate from the first month itself unless foreman rules apply.",
      videoId: videoData.auction,
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: 5,
      question: "What is the purpose of bidding?",
      answer:
        "Bidding helps subscribers access funds earlier while sharing dividends with others.",
      videoId: videoData.bidding,
      icon: <Gavel className="w-5 h-5" />
    },
    {
      id: 6,
      question: "What are the Income Tax benefits?",
      answer:
        "Chit fund savings may qualify under Section 80C. Prize amount is not treated as income.",
      videoId: videoData.tax,
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 7,
      question: "What are the sureties to be submitted?",
      answer:
        "ID proof, address proof, income proof, photographs, and guarantors if required.",
      videoId: videoData.sureties,
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 8,
      question: "How soon can I expect payment?",
      answer:
        "Payments are generally disbursed within 24–48 hours after winning the bid.",
      videoId: videoData.payout,
      icon: <Clock className="w-5 h-5" />
    }
  ];

  const FinovestItems = [
    {
      id: 'm1',
      question: "Why choose Finovest?",
      answer:
        "Finovest is a trusted chit fund company with transparency, compliance, and timely payouts.",
      videoId: videoData.finovest,
      icon: <Building className="w-5 h-5" />
    },
    {
      id: 'm2',
      question: "What chit values are available?",
      answer:
        "Chit values range from ₹50,000 to ₹1,00,00,000.",
      videoId: videoData.values,
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
      videoId: videoData.enroll,
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 'm5',
      question: "How secure is my money?",
      answer:
        "Registered under the Chit Funds Act with full regulatory compliance.",
      videoId: videoData.security,
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
      videoId: videoData['online-auction'],
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

  // Fetch YouTube videos from your channel
  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      if (!YOUTUBE_API_KEY) {
        console.warn('YouTube API key not found. Using sample data.');
        // Fallback to sample videos
        setVideos([
          { id: { videoId: 'xXQdXQdXQdQ' }, snippet: { title: 'Understanding Chit Funds' } },
          { id: { videoId: 'yYQdYQdYQdY' }, snippet: { title: 'How to Invest in Chit Funds' } },
          { id: { videoId: 'zZQdZQdZQdZ' }, snippet: { title: 'Benefits of Chit Fund Investment' } }
        ]);
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`
        );
        const data = await response.json();
        
        if (data.items) {
          setVideos(data.items);
        } else {
          // Fallback if API fails
          setVideos([
            { id: { videoId: 'xXQdXQdXQdQ' }, snippet: { title: 'Understanding Chit Funds' } },
            { id: { videoId: 'yYQdYQdYQdY' }, snippet: { title: 'How to Invest in Chit Funds' } }
          ]);
        }
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        // Fallback on error
        setVideos([
          { id: { videoId: 'xXQdXQdXQdQ' }, snippet: { title: 'Understanding Chit Funds' } },
          { id: { videoId: 'yYQdYQdYQdY' }, snippet: { title: 'How to Invest in Chit Funds' } }
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
      { threshold: 0.3 }
    );

    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const renderItem = (item) => {
    const hasVideo = item.videoId;

    return (
      <div key={item.id} className="border-2 border-primary/20 rounded-xl mb-4 hover:border-primary/40 transition-colors">
        <button
          onClick={() => toggleItem(item.id)}
          className="w-full p-4 flex justify-between items-center bg-white hover:bg-indigo-50/50 transition-colors"
        >
          <div className="flex gap-3 items-center">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              {item.icon}
            </div>
            <span className="font-semibold text-sm text-left">{item.question}</span>
            {hasVideo && (
              <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full flex items-center gap-1">
                <Youtube className="w-3 h-3" /> Video
              </span>
            )}
          </div>
          {activeItem === item.id ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
        </button>

        {activeItem === item.id && (
          <div className="p-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
            <div className="text-sm text-gray-700 mb-4">{item.answer}</div>
            
            {hasVideo && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold flex items-center gap-2 text-gray-800">
                    <Youtube className="w-5 h-5 text-red-600" />
                    Related Video Tutorial
                  </h4>
                  <a
                    href={`https://www.youtube.com/watch?v=${item.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" /> Open
                  </a>
                </div>
                
                {/* YouTube Video Player */}
                <YouTubePlayer 
                  videoId={item.videoId} 
                  title={`Video: ${item.question}`}
                />

                {/* YouTube Links */}
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <a
                    href={`https://www.youtube.com/watch?v=${item.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    <Youtube className="w-4 h-4" />
                    Watch on YouTube
                  </a>
                  <a
                    href={`https://www.youtube.com/watch?v=${item.videoId}&t=0s`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <Play className="w-4 h-4" />
                    Play in new tab
                  </a>
                </div>
              </div>
            )}

            {/* Show channel videos if no specific video is assigned */}
            {!hasVideo && videos.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold flex items-center gap-2 text-gray-800">
                    <Youtube className="w-5 h-5 text-red-600" />
                    More Learning Videos
                  </h4>
                  <a
                    href={`https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                  >
                    View all <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {videos.slice(0, 2).map((video) => (
                    <a
                      key={video.id.videoId}
                      href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-90 transition-opacity"
                    >
                      <YouTubePlayer 
                        videoId={video.id.videoId}
                        title={video.snippet.title}
                        thumbnailOnly={true}
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  /* ===================== UI ===================== */

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl">

        {/* ===== STICKY HEADER ===== */}
        <div className="sticky top-14 md:top-18 bg-white border-b shadow-sm z-10">
          <div className="p-4">
            <h2 className="font-bold text-xl text-gray-800">
              Frequently Asked Questions
              <span className="block text-sm font-normal text-gray-600 mt-1">
                {activeSection === 'about-chit-fund' && 'Learn about chit funds with video tutorials'}
                {activeSection === 'about-Finovest' && 'Discover Finovest features and benefits'}
                {activeSection === 'support' && 'Get help and support resources'}
              </span>
            </h2>
          </div>
        </div>

        {/* ===== SCROLLABLE CONTENT ===== */}
        <div className="p-6">
          <section id="about-chit-fund" ref={el => sectionRefs.current['about-chit-fund'] = el} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">All About Chit Fund</h3>
            </div>
            {faqItems.map(renderItem)}
          </section>

          <section id="about-Finovest" ref={el => sectionRefs.current['about-Finovest'] = el} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">All About Finovest</h3>
            </div>
            {FinovestItems.map(renderItem)}
          </section>

          <section id="support" ref={el => sectionRefs.current['support'] = el} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <HeadphonesIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Support & Resources</h3>
            </div>
            {supportItems.map(renderItem)}
          </section>

          {/* YouTube Channel Banner */}
          <div className="mt-12 p-6 bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 rounded-xl border border-red-100">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Youtube className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">
                      Subscribe to Our YouTube Channel
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Learn, grow, and succeed with our video tutorials
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Access exclusive video content covering chit fund basics, investment strategies, 
                  success stories, and financial planning tips. Stay updated with our latest tutorials 
                  and educational content.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                  >
                    <Youtube className="w-5 h-5" />
                    Visit Our Channel
                  </a>
                  <a
                    href={`https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}?sub_confirmation=1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-black transition-colors shadow-sm"
                  >
                    <Youtube className="w-5 h-5" />
                    Subscribe Now
                  </a>
                </div>
              </div>
              <div className="md:w-1/3">
                {videos.length > 0 ? (
                  <a
                    href={`https://www.youtube.com/watch?v=${videos[0]?.id?.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-lg transform hover:scale-[1.02] transition-transform">
                      <YouTubePlayer 
                        videoId={videos[0]?.id?.videoId}
                        title={videos[0]?.snippet?.title}
                        thumbnailOnly={true}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <p className="text-white font-semibold text-sm line-clamp-2">
                          Latest: {videos[0]?.snippet?.title}
                        </p>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Loading video...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChitFundFAQ;