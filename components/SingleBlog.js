// components/SingleBlog.js
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SingleBlog() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  console.log("params",params);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/admin/blog/${params.id}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Blog post not found');
      }
      
      setBlog(data.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Format text with preserved formatting (same as BlogDisplay)
  const formatBlogContent = (content) => {
    if (!content) return '';
    
    const paragraphs = content.split(/\n\n+/);
    
    return paragraphs.map((paragraph, index) => {
      if (!paragraph.trim()) return null;
      
      // Check if paragraph starts with bullet or number
      if (paragraph.trim().startsWith('•') || /^\d+\./.test(paragraph.trim())) {
        const lines = paragraph.split('\n').filter(line => line.trim());
        const isNumbered = /^\d+\./.test(lines[0]?.trim());
        
        return (
          <div key={index} className="my-6">
            {isNumbered ? (
              <ol className="list-decimal pl-8 space-y-3">
                {lines.map((line, lineIndex) => (
                  <li key={lineIndex} className="text-gray-700 text-lg">
                    {formatInlineText(line.replace(/^\d+\.\s*/, ''))}
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="list-disc pl-8 space-y-3">
                {lines.map((line, lineIndex) => (
                  <li key={lineIndex} className="text-gray-700 text-lg">
                    {formatInlineText(line.replace(/^•\s*/, ''))}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }
      
      // Check if it's a heading (lines with no ending punctuation)
      if (paragraph.length < 100 && !paragraph.match(/[.!?]$/)) {
        return (
          <h3 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">
            {formatInlineText(paragraph)}
          </h3>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="my-6 text-gray-700 text-lg leading-relaxed">
          {formatInlineText(paragraph)}
        </p>
      );
    });
  };

  const formatInlineText = (text) => {
    const elements = [];
    let lastIndex = 0;
    
    const combinedPattern = /\*\*(.*?)\*\*|\*(.*?)\*|\[(.*?)\]\((.*?)\)/g;
    
    let match;
    while ((match = combinedPattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(text.substring(lastIndex, match.index));
      }
      
      if (match[0].startsWith('**')) {
        elements.push(<strong key={match.index} className="font-bold">{match[1]}</strong>);
      } else if (match[0].startsWith('*') && !match[0].startsWith('**')) {
        elements.push(<em key={match.index} className="italic">{match[2]}</em>);
      } else if (match[0].startsWith('[')) {
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
    
    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }
    
    return elements.length > 0 ? elements : text;
  };

  const getReadingTime = (content) => {
    const words = content.split(' ').length;
    return Math.ceil(words / 200); // 200 words per minute
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link 
          href="/media/blog"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );

  if (!blog) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-fit"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 py-24 text-white">
          <Link 
            href="/media/blog"
            className="inline-flex items-center text-white/80 hover:text-white mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {getReadingTime(blog.description)} min read
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>
          
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-lg max-w-none">
          {formatBlogContent(blog.description)}
        </article>
        
        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
             
              
            </div>
            
            <Link 
              href="/media/blog"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
            >
              Back to All Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}