// components/NewsList.js
"use client";

import { useState, useEffect } from 'react';

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/admin/news');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch news');
      }
      
      setNews(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-12">
      <div className="text-red-600 mb-2">Error loading news</div>
      <div className="text-sm text-gray-600 mb-4">{error}</div>
      <button 
        onClick={fetchNews}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-primary px-4">Recent News</h2>
      
      {news.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-lg">No news articles yet</p>
          <p className="text-sm mt-1">Start by adding your first news article!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {news.map((item) => (
            <div 
              key={item.id} 
              className=" overflow-hidden"
            >
              {/* Image Section - Full width on top */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt="News"
                  className="w-full h-full object-fit hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x256/cccccc/969696?text=Image+Not+Available';
                  }}
                />
              </div>
              
              {/* Content Section - Below image */}
              <div className="p-5">
                {/* Date */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                  <span className="mx-2">•</span>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {new Date(item.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                
                {/* Description */}
                <div className="mb-4">
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                    {item.description}
                  </p>
                  {item.description.length > 200 && (
                    <span className="text-primary text-sm font-medium mt-2 inline-block">
                      Read more
                    </span>
                  )}
                </div>
                
               
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Refresh Button */}
      {news.length > 0 && (
        <div className="flex justify-center pt-4">
          <button 
            onClick={fetchNews}
            className="flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh News
          </button>
        </div>
      )}
    </div>
  );
}