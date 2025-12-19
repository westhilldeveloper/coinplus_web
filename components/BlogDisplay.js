// components/BlogDisplay.js - Fixed version
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogDisplay() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch blogs');
      }
      
      setBlogs(data.data || []);
      setError('');
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Format text with preserved formatting
  const formatBlogContent = (content) => {
    if (!content) return '';
    
    // Split by double line breaks for paragraphs
    const paragraphs = content.split(/\n\n+/);
    
    return paragraphs.map((paragraph, index) => {
      if (!paragraph.trim()) return null;
      
      // Check if paragraph starts with bullet or number
      if (paragraph.trim().startsWith('•') || /^\d+\./.test(paragraph.trim())) {
        const lines = paragraph.split('\n').filter(line => line.trim());
        const isNumbered = /^\d+\./.test(lines[0]?.trim());
        
        return (
          <div key={index} className="my-4">
            {isNumbered ? (
              <ol className="list-decimal pl-6 space-y-2">
                {lines.map((line, lineIndex) => (
                  <li key={lineIndex} className="text-gray-700">
                    {formatInlineText(line.replace(/^\d+\.\s*/, ''))}
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="list-disc pl-6 space-y-2">
                {lines.map((line, lineIndex) => (
                  <li key={lineIndex} className="text-gray-700">
                    {formatInlineText(line.replace(/^•\s*/, ''))}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }
      
      // Regular paragraph with inline formatting
      return (
        <p key={index} className="my-4 text-gray-700 leading-relaxed">
          {formatInlineText(paragraph)}
        </p>
      );
    });
  };

  // Format inline text (bold, italic, links)
  const formatInlineText = (text) => {
    const elements = [];
    let lastIndex = 0;
    
    // Combine all patterns
    const combinedPattern = /\*\*(.*?)\*\*|\*(.*?)\*|\[(.*?)\]\((.*?)\)/g;
    
    let match;
    while ((match = combinedPattern.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        elements.push(text.substring(lastIndex, match.index));
      }
      
      // Process the match
      if (match[0].startsWith('**')) { // Bold
        elements.push(<strong key={match.index} className="font-bold">{match[1]}</strong>);
      } else if (match[0].startsWith('*') && !match[0].startsWith('**')) { // Italic
        elements.push(<em key={match.index} className="italic">{match[2]}</em>);
      } else if (match[0].startsWith('[')) { // Link
        elements.push(
          <a 
            key={match.index} 
            href={match[4]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {match[3]}
          </a>
        );
      }
      
      lastIndex = combinedPattern.lastIndex;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }
    
    return elements.length > 0 ? elements : text;
  };

  // Truncate content for preview
  const truncateContent = (content, maxLength = 200) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    
    // Find a good breaking point (end of sentence or word)
    const truncated = content.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    const lastPeriod = truncated.lastIndexOf('.');
    const breakPoint = Math.max(lastPeriod, lastSpace);
    
    return breakPoint > maxLength * 0.5 
      ? truncated.substring(0, breakPoint) + '...'
      : truncated + '...';
  };

  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = searchTerm === '' || 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'recent' && 
       new Date(blog.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesCategory;
  });

  // Get the latest blog date in a readable format
  const getLatestUpdate = () => {
    if (blogs.length === 0) return 'No updates';
    
    const latestDate = new Date(Math.max(...blogs.map(b => new Date(b.createdAt).getTime())));
    
    // Format as "MMM yyyy" (e.g., "Jan 2024")
    const month = latestDate.toLocaleDateString('en-US', { month: 'short' });
    const year = latestDate.getFullYear();
    
    return `${month} ${year}`;
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-12">
      <div className="text-red-600 mb-2">Error loading blogs</div>
      <div className="text-sm text-gray-600 mb-4">{error}</div>
      <button 
        onClick={fetchBlogs}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-80 px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setSelectedCategory('recent')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'recent'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Recent
              </button>
            </div>
          </div>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block p-8 bg-white rounded-full mb-4 shadow-lg">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Blog Posts Yet</h3>
            <p className="text-gray-500">Check back soon for new articles.</p>
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
              {filteredBlogs.map((blog) => (
                <div 
                  key={blog.id}
                  className=" rounded-md overflow-hidden  "
                >
                  {/* Blog Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-contain hover:scale-105 object:fit  transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Blog Content */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-bold text-md text-primary mb-4 line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    {/* Preview Content */}
                    <div className="text-gray-600 text-sm mb-6 line-clamp-3">
                      {formatInlineText(truncateContent(blog.description, 150))}
                    </div>
                    
                    {/* Read More Button */}
                    <Link 
  href={`/media/blog/${blog.id}`}
  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
>
  <span>Read More</span>
  <img 
    src="/images/right-arrow.gif" 
    alt="arrow" 
    className="w-7 h-7 ml-2"
    loading="lazy"
  />
</Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Blog (if any) */}
            {blogs.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Article</h2>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <div className="h-full">
                        <img
                          src={blogs[0].imageUrl}
                          alt={blogs[0].title}
                          className="w-full h-full object-contain min-h-[400px]"
                        />
                      </div>
                    </div>
                    <div className="md:w-1/2 p-8 md:p-12">
                      <div className="text-sm text-blue-600 font-semibold mb-3">FEATURED</div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-4">{blogs[0].title}</h3>
                      <div className="flex items-center text-gray-500 mb-6">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {Math.ceil(blogs[0].description.split(' ').length / 200)} min read
                      </div>
                      <div className="text-gray-600 mb-8 line-clamp-4">
                        {formatInlineText(truncateContent(blogs[0].description, 300))}
                      </div>
                      <Link 
                        href={`/blog/${blogs[0].id}`}
                        className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 font-medium"
                      >
                        <span>Read Full Story</span>
                        
                       <img 
    src="/images/right-arrow.gif" 
    alt="arrow" 
    className="w-7 h-7 ml-2 rounded-full"
    loading="lazy"
  />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="bg-gradient-to-r from-primary to-purple-800 rounded-2xl p-8 text-white">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold mb-2">{blogs.length}</div>
                  <div className="text-gray-300">Total Articles</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">
                    {blogs.reduce((total, blog) => total + blog.description.split(' ').length, 0).toLocaleString()}
                  </div>
                  <div className="text-gray-300">Words Written</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">
                    {getLatestUpdate()}
                  </div>
                  <div className="text-gray-300">Latest Update</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}