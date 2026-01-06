"use client";

import { useState, useEffect, useRef } from "react";
import { Play, X, Users, Star, Youtube, Loader2, AlertCircle } from "lucide-react";

const RealStories = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const YOUTUBE_CHANNEL_ID = "UCZLUQLlKCXhQH_bvP4GmWHg";
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  
  

  // Fallback videos in case API fails
  const fallbackVideos = [
    {
      id: "1",
      youtubeId: "9nte4r_FiGQ",
      title: "Customer Success Story",
      subtitle: "Real People, Real Results",
      description: "See how our services have transformed lives.",
      duration: "4:32"
    },
    {
      id: "2",
      youtubeId: "Cxgy0EA_3f0",
      title: "Financial Journey",
      subtitle: "Achieving Dreams Together",
      description: "Watch inspiring stories of financial growth.",
      duration: "3:45"
    },
    {
      id: "3",
      youtubeId: "elrf36X5_m4",
      title: "Trust & Partnership",
      subtitle: "Building Relationships",
      description: "Discover why customers trust us with their goals.",
      duration: "5:21"
    },
    // {
    //   id: "4",
    //   youtubeId: "0e3JYDJXFzg",
    //   title: "Success Stories",
    //   subtitle: "Real Customer Experiences",
    //   description: "Hear directly from our satisfied customers.",
    //   duration: "6:15"
    // }
  ];

  // Format duration from ISO 8601
  const formatDuration = (duration) => {
    if (!duration || duration === "Loading...") return "Watch Now";
    
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "Watch Now";
    
    const hours = (match[1] || "").replace("H", "");
    const minutes = (match[2] || "").replace("M", "");
    const seconds = (match[3] || "").replace("S", "");
    
    if (hours) return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    if (minutes) return `${minutes}:${seconds.padStart(2, '0')}`;
    return `0:${seconds.padStart(2, '0')}`;
  };

  // Fetch videos from YouTube channel
  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        setLoading(true);
        
        if (!YOUTUBE_API_KEY) {
          console.warn("YouTube API key not found. Using fallback videos.");
          setVideos(fallbackVideos);
          setLoading(false);
          return;
        }

        // Step 1: Get channel's uploads playlist
        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
        );
        
        if (!channelResponse.ok) {
          throw new Error(`Channel API error: ${channelResponse.status}`);
        }
        
        const channelData = await channelResponse.json();
        
        if (!channelData.items || channelData.items.length === 0) {
          throw new Error("YouTube channel not found");
        }
        
        const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
        
        // Step 2: Get latest videos from uploads playlist
        const videosResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=3&key=${YOUTUBE_API_KEY}`
        );
        
        if (!videosResponse.ok) {
          throw new Error(`Videos API error: ${videosResponse.status}`);
        }
        
        const videosData = await videosResponse.json();
        
        if (videosData.items && videosData.items.length > 0) {
          // Step 3: Get video details including duration
          const videoIds = videosData.items.map(item => item.snippet.resourceId.videoId).join(',');
          
          const detailsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${YOUTUBE_API_KEY}`
          );
          
          if (detailsResponse.ok) {
            const detailsData = await detailsResponse.json();
            
            // Combine data
            const fetchedVideos = videosData.items.map((item, index) => {
              const videoDetails = detailsData.items.find(
                video => video.id === item.snippet.resourceId.videoId
              ) || {};
              
              // Clean title (remove channel name if present)
              let title = item.snippet.title;
              title = title.replace(/Coinplusindia|Coinplus India/g, '').trim();
              title = title.replace(/\|/g, '-').trim();
              
              // Extract subtitle from description or use default
              let subtitle = "Customer Success Story";
              const descLines = item.snippet.description.split('\n');
              if (descLines.length > 1) {
                subtitle = descLines[0].substring(0, 60);
              }
              
              return {
                id: item.id,
                youtubeId: item.snippet.resourceId.videoId,
                title: title || "Customer Story",
                subtitle: subtitle,
                description: item.snippet.description.substring(0, 80) + '...',
                duration: formatDuration(videoDetails.contentDetails?.duration || "PT0M0S"),
                publishedAt: item.snippet.publishedAt
              };
            });
            
            setVideos(fetchedVideos);
          } else {
            // If details API fails, use basic data
            const basicVideos = videosData.items.map((item, index) => ({
              id: item.id,
              youtubeId: item.snippet.resourceId.videoId,
              title: item.snippet.title,
              subtitle: "Customer Success Story",
              description: "Watch this inspiring customer story.",
              duration: "Watch Now",
              publishedAt: item.snippet.publishedAt
            }));
            
            setVideos(basicVideos);
          }
        } else {
          // No videos found, use fallback
          setVideos(fallbackVideos);
        }
        
        setLoading(false);
        setError(null);
        
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
        
        // Provide user-friendly error message
        let errorMessage = "Failed to load live videos. ";
        if (err.message.includes("quota")) {
          errorMessage += "API quota exceeded. Using sample videos.";
        } else if (err.message.includes("not found")) {
          errorMessage += "YouTube channel not found. Using sample videos.";
        } else {
          errorMessage += "Using sample videos.";
        }
        
        setError(errorMessage);
        setVideos(fallbackVideos);
        setLoading(false);
      }
    };

    fetchYouTubeVideos();
  }, []);

  const openVideoModal = (youtubeId) => {
    setSelectedVideo(youtubeId);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    document.body.style.overflow = "auto";
  };

  // Get YouTube thumbnail URLs with fallback
  const getYouTubeThumbnail = (youtubeId, quality = "mqdefault") => {
    return `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`;
  };

  if (loading) {
    return (
      <div className="w-full py-6 md:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trust Built on Real Results
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto my-8 rounded-full"></div>
          </div>
          
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-gray-600">Loading videos from YouTube...</p>
            <p className="text-sm text-gray-500">Fetching latest videos from your channel</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 md:py-8 px-0 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-left mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl  text-gray-900 mb-4">
            Trust Built on Real Results
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 text-left max-w-full leading-relaxed">
            See for yourself how our plans are helping members turn their goals into reality.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary/60 text-left my-8 rounded-full"></div>
        </div>

        {/* Error Message (if any) */}
        {error && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-700">{error}</div>
          </div>
        )}

       
        

        {/* YouTube Videos Grid */}
        {videos.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div 
                  key={video.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                >
                  {/* Video Thumbnail with Play Button */}
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-black">
                      <img 
                        src={getYouTubeThumbnail(video.youtubeId, "hqdefault")}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = getYouTubeThumbnail(video.youtubeId, "default");
                          e.currentTarget.onerror = () => {
                            e.currentTarget.src = "/images/video-placeholder.jpg";
                          };
                        }}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Duration Badge */}
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      
                      {/* Play Button - Always Visible */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        onClick={() => openVideoModal(video.youtubeId)}
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/90 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-2xl">
                          <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
                      {video.title}
                    </h3>
                   
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* YouTube Channel Link */}
        <div className="text-center md:text-xl text-xs mb-8">
          <a
            href={`https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Youtube className="w-8 h-8" />
            Visit Our YouTube Channel for More Stories
          </a>
        </div>

      </div>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-20"
            >
              <X className="w-8 h-8" />
            </button>
            
            {/* YouTube Video Iframe */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
            
            {/* Click outside to close */}
            <div 
              className="fixed inset-0 -z-10 cursor-pointer"
              onClick={closeVideoModal}
            ></div>
          </div>
        </div>
      )}

      {/* Add custom scrollbar hide */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RealStories;