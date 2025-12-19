// components/GalleryDisplay.js
"use client";

import { useState, useEffect } from 'react';

export default function GalleryDisplay() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch galleries');
      }
      
      setGalleries(data.data || []);
      setError('');
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openGallery = (gallery) => {
    setSelectedGallery(gallery);
    setSelectedImageIndex(0);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setSelectedGallery(null);
    // Re-enable body scroll
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (selectedGallery) {
      setSelectedImageIndex(prev => 
        prev === selectedGallery.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedGallery) {
      setSelectedImageIndex(prev => 
        prev === 0 ? selectedGallery.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-12">
      <div className="text-red-600 mb-2">Error loading galleries</div>
      <div className="text-sm text-gray-600 mb-4">{error}</div>
      <button 
        onClick={fetchGalleries}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Photo Galleries</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our collection of beautiful moments and memories
          </p>
        </div>
        
        {galleries.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block p-8 bg-gray-100 rounded-full mb-4">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Galleries Available</h3>
            <p className="text-gray-500">Check back later for new photo collections.</p>
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleries.map((gallery) => (
                <div 
                  key={gallery.id}
                  className="group cursor-pointer"
                  onClick={() => openGallery(gallery)}
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    {/* Gallery Cover */}
                    <div className="relative h-64 w-full overflow-hidden">
                      {gallery.images.length > 0 ? (
                        <>
                          <img
                            src={gallery.images[0]}
                            alt={gallery.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="flex items-center justify-between">
                                <span className="bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                                  {gallery.images.length} photos
                                </span>
                                <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
                                  View
                                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Gallery Info */}
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-800 mb-3 line-clamp-1">
                        {gallery.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {gallery.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(gallery.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        
                        <div className="flex items-center text-blue-600 font-medium">
                          <span>View Gallery</span>
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Stats */}
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-800">Our Photo Collection</h3>
                  <p className="text-gray-600">Beautiful moments captured forever</p>
                </div>
                <div className="flex space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{galleries.length}</div>
                    <div className="text-sm text-gray-600">Galleries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {galleries.reduce((total, gallery) => total + gallery.images.length, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Photos</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Gallery Modal */}
      {selectedGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl">
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Navigation Buttons */}
            {selectedGallery.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Main Image */}
            <div className="relative rounded-lg overflow-hidden bg-black">
              <img
                src={selectedGallery.images[selectedImageIndex]}
                alt={`${selectedGallery.title} - Image ${selectedImageIndex + 1}`}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              {/* Gallery Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedGallery.title}</h3>
                <p className="text-gray-200 mb-3">{selectedGallery.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-300">
                    <span>Image {selectedImageIndex + 1} of {selectedGallery.images.length}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedGallery.images.length} photos total</span>
                  </div>
                  <div className="text-sm text-gray-300">
                    {new Date(selectedGallery.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Thumbnail Strip */}
            {selectedGallery.images.length > 1 && (
              <div className="mt-4 flex space-x-2 overflow-x-auto py-2">
                {selectedGallery.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 ${
                      index === selectedImageIndex 
                        ? 'border-blue-500 ring-2 ring-blue-300' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}