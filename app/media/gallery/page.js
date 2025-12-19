// components/GalleryDisplay.js
"use client";

import { useState, useEffect } from 'react';

export default function GalleryDisplay() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await fetch('/api/admin/gallery');
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

  const openImageModal = (imageUrl, galleryTitle, imageIndex) => {
    setSelectedImage({ imageUrl, galleryTitle, imageIndex });
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
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
              
        {galleries.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block p-8 bg-gray-100 rounded-full mb-4">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">No Galleries Available</h3>
            <p className="text-gray-500">Check back later for new photo collections.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {galleries.map((gallery) => (
              <div key={gallery.id} className="gallery-section">
                {/* Gallery Title */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-primary mb-4">{gallery.title}</h2>
                  {gallery.description && (
                    <p className="text-sm text-gray-600 leading-relaxed max-w-4xl">
                      {gallery.description}
                    </p>
                  )}
                  <div className="flex items-center text-sm text-gray-500 mt-4">
                    <div className="flex items-center mr-6">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(gallery.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {gallery.images.length} photos
                    </div>
                  </div>
                </div>

                {/* Images Grid */}
                {gallery.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {gallery.images.map((image, index) => (
                      <div 
                        key={index}
                        className="group cursor-pointer"
                        onClick={() => openImageModal(image, gallery.title, index)}
                      >
                        <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
                          <img
                            src={image}
                            alt={`${gallery.title} - Image ${index + 1}`}
                            className="w-full h-full object-fit group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          {/* Image number overlay */}
                          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            #{index + 1}
                          </div>
                          {/* View overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white/90 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Stats */}
            <div className="mt-12 p-6 bg-gradient-to-r from-primary to-purple-600 rounded-2xl border border-blue-100">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-white">Our Photo Collection</h3>
                  <p className="text-gray-300">Beautiful moments captured forever</p>
                </div>
                <div className="flex space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300">{galleries.length}</div>
                    <div className="text-sm text-gray-300">Galleries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300">
                      {galleries.reduce((total, gallery) => total + gallery.images.length, 0)}
                    </div>
                    <div className="text-sm text-gray-300">Total Photos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Main Image */}
            <div className="relative rounded-lg overflow-hidden bg-black">
              <img
                src={selectedImage.imageUrl}
                alt={`${selectedImage.galleryTitle}`}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              {/* Image Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-bold text-white mb-1">{selectedImage.galleryTitle}</h3>
                <p className="text-gray-300 text-sm">Image #{selectedImage.imageIndex + 1}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}