"use client";

import AdminGalleryForm from '../../../../../components/Admin/components/AdminGalleryForm';
import { useRouter } from 'next/navigation';

export default function CreateGalleryPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/admin/media/gallery');
  };

  const handleCancel = () => {
    router.push('/admin/media/gallery');
  };

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
        
        <AdminGalleryForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </div>
  );
}