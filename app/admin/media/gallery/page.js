import GalleryList from '../../../../components/Admin/components/GalleryList';

export default function GalleryAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
            <p className="text-gray-600 mt-2">Create and manage your photo galleries</p>
          </div>
          
          <GalleryList />
        </div>
      </div>
    </div>
  );
}