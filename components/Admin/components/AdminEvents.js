"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminEvents() {
  const [formData, setFormData] = useState({
    id: '',
    description: '',
    imageUrl: ''
  });
  const [events, setEvents] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
const router = useRouter();
  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/events');
      const data = await response.json();
      
      if (response.ok && data.success) {
        setEvents(data.data);
      } else {
        setErrors({ form: data.error || 'Failed to load events' });
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setErrors({ form: 'Failed to load events. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Clear previous errors
    setErrors(prev => ({ ...prev, imageUrl: '' }));

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, imageUrl: 'Please select an image file (JPEG, PNG, GIF, etc.)' }));
      return;
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, imageUrl: 'Image size should be less than 5MB' }));
      return;
    }

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { 
          method: "POST", 
          body: data 
        }
      );
      
      if (!res.ok) {
        throw new Error(`Upload failed with status: ${res.status}`);
      }
      
      const result = await res.json();
      
      if (!result.secure_url) {
        throw new Error('No secure URL returned from Cloudinary');
      }
      
      setFormData(prev => ({ 
        ...prev, 
        imageUrl: result.secure_url
      }));
      
      setSuccess('✓ Image uploaded successfully');
      setTimeout(() => setSuccess(''), 2000);
      
    } catch (err) {
      console.error("Upload failed:", err);
      setErrors(prev => ({ 
        ...prev, 
        imageUrl: err.message || 'Image upload failed. Please try again.' 
      }));
      setImagePreview('');
      setFormData(prev => ({ ...prev, imageUrl: '' }));
    } finally {
      setUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (!formData.imageUrl) {
      newErrors.imageUrl = 'Please upload an image';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSaving(true);
    
    try {
      const url = isEditing 
        ? `/api/admin/events/${formData.id}`
        : '/api/admin/events';
        
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError);
        throw new Error('Server returned invalid response. Please try again.');
      }
      
      if (!response.ok) {
        throw new Error(data.error || `Failed to ${isEditing ? 'update' : 'save'} event (Status: ${response.status})`);
      }
      
      // Success
      setSuccess(`Event ${isEditing ? 'updated' : 'created'} successfully!`);
      
      // Reset form
      resetForm();
      
      // Refresh events list
      fetchEvents();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      
    } catch (err) {
      console.error(`${isEditing ? 'Update' : 'Save'} failed:`, err);
      setErrors(prev => ({ 
        ...prev, 
        form: err.message || `Failed to ${isEditing ? 'update' : 'save'} event. Please try again.` 
      }));
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setErrors(prev => ({ ...prev, imageUrl: '' }));
  };

  const handleEdit = (event) => {
    setFormData({
      id: event.id,
      description: event.description,
      imageUrl: event.imageUrl
    });
    setImagePreview(event.imageUrl);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/events/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete event');
      }
      
      setSuccess('Event deleted successfully!');
      
      // Refresh events list
      fetchEvents();
      
      // If we're deleting the event currently being edited, reset the form
      if (isEditing && formData.id === id) {
        resetForm();
      }
      
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (err) {
      console.error('Delete failed:', err);
      setErrors(prev => ({ 
        ...prev, 
        form: err.message || 'Failed to delete event. Please try again.' 
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      description: '',
      imageUrl: ''
    });
    setImagePreview('');
    setIsEditing(false);
    setErrors({});
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const cancelEdit = () => {
    resetForm();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
       <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">&nbsp;</h1>
            </div>
            <button
              onClick={()=>router.push('/admin/dashboard')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Dashboard
            </button>
          </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditing ? 'Edit Event' : 'Add New Event'}
            </h2>
            {isEditing && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel Edit
              </button>
            )}
          </div>
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              {success}
            </div>
          )}
          
          {errors.form && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {errors.form}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image *
              </label>
              
              <div className="space-y-3">
                {/* Image Preview */}
                {(imagePreview || formData.imageUrl) ? (
                  <div className="relative">
                    <div className="w-full border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview || formData.imageUrl}
                        alt="Preview"
                        className="w-full h-64 object-contain"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      Upload an image
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                )}
                
                {/* Upload Button */}
                <div>
                  <label className="block">
                    <span className="sr-only">Choose image</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                        cursor-pointer"
                    />
                  </label>
                  {uploading && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-1/2"></div>
                      </div>
                      <p className="mt-1 text-sm text-blue-600">Uploading image...</p>
                    </div>
                  )}
                  {errors.imageUrl && (
                    <p className="mt-2 text-sm text-red-600">{errors.imageUrl}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Write your event description here..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
              <div className="mt-1 flex justify-between text-sm">
                <span className={`${formData.description.length < 10 ? 'text-red-500' : 'text-gray-500'}`}>
                  Minimum 10 characters required
                </span>
                <span className={`${
                  formData.description.length >= 10 ? 'text-green-500' : 'text-gray-500'
                }`}>
                  {formData.description.length}/10
                </span>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={uploading || saving}
                className={`w-full py-3 px-4 rounded-md font-medium text-white flex items-center justify-center ${
                  uploading || saving
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }`}
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    {isEditing ? 'Updating...' : 'Saving...'}
                  </>
                ) : uploading ? (
                  'Uploading Image...'
                ) : (
                  isEditing ? 'Update Event' : 'Save Event'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Events List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">All Events</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-gray-500">No events found. Create your first event!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div 
                  key={event.id} 
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-24 h-24">
                      <img
                        src={event.imageUrl}
                        alt="Event"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                        {event.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        Created: {new Date(event.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}