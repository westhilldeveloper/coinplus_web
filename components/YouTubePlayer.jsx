// components/YouTubePlayer.jsx
'use client';

import { useState } from 'react';
import { Play, Youtube } from 'lucide-react';

const YouTubePlayer = ({ videoId, title = "YouTube video", thumbnailOnly = false }) => {
  const [playing, setPlaying] = useState(false);

  if (thumbnailOnly) {
    return (
      <div className="relative group cursor-pointer">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm font-medium line-clamp-2">{title}</p>
      </div>
    );
  }

  if (!playing) {
    return (
      <div 
        className="relative w-full aspect-video rounded-lg overflow-hidden bg-black cursor-pointer"
        onClick={() => setPlaying(true)}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white font-semibold">{title}</p>
          <p className="text-gray-300 text-sm mt-1 flex items-center gap-2">
            <Youtube className="w-4 h-4" />
            Click to play
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;