"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminGalleryForm from '../../../../../../components/Admin/components/AdminGalleryForm';

export default function EditGalleryPage() {
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    fetchGallery();
  }, [params.id]);

  const fetchGallery = async () => {
    try {
      const response = await fetch(`/api/admin/gallery/${params.id}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch gallery');
      }
      
      setGallery(data.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    router.push('/admin/media/gallery');
  };

  const handleCancel = () => {
    router.push('/admin/media/gallery');
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="text-red-600 mb-2">Error loading gallery</div>
          <div className="text-sm text-gray-600 mb-4">{error}</div>
          <button 
            onClick={() => router.push('/admin/media/gallery')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Galleries
          </button>
        </div>
      </div>
    </div>
  );

  if (!gallery) return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="text-gray-600">Gallery not found</div>
          <button 
            onClick={() => router.push('/admin/media/gallery')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Galleries
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={handleCancel}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Galleries
          </button>
        </div>
        
        <AdminGalleryForm gallery={gallery} onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </div>
  );
}