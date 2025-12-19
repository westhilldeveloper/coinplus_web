// components/Admin/components/AdminGalleryForm.js
"use client";

import { useState, useRef } from 'react';

export default function AdminGalleryForm({ gallery = null, onSuccess, onCancel }) {
  const isEditMode = !!gallery;
  
  const [formData, setFormData] = useState({
    title: gallery?.title || '',
    description: gallery?.description || '',
    images: gallery?.images || []
  });
  
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  // Handle multiple image uploads
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Clear previous errors
    setErrors(prev => ({ ...prev, images: '' }));

    // Validate files
    const validFiles = [];
    const invalidFiles = [];
    
    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        invalidFiles.push(`${file.name}: Not an image file`);
      } else if (file.size > 5 * 1024 * 1024) {
        invalidFiles.push(`${file.name}: Size exceeds 5MB`);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      setErrors(prev => ({ 
        ...prev, 
        images: `Some files were rejected:\n${invalidFiles.join('\n')}` 
      }));
    }

    if (validFiles.length === 0) return;

    setUploading(true);
    
    try {
      // Hardcode Cloudinary credentials for testing
      const cloudName = 'ddsim4ixm'; // Replace with your actual cloud name
      const uploadPreset = 'tour_uploads'; // Replace with your upload preset
      
      console.log('Starting upload of', validFiles.length, 'images');
      
      const uploadPromises = validFiles.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        
       data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: data }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to upload ${file.name}: ${errorText}`);
        }

        const result = await response.json();
        return result.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Add new images to existing ones
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
      
      setSuccess(`✓ ${uploadedUrls.length} image(s) uploaded successfully`);
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (err) {
      console.error("Upload failed:", err);
      setErrors(prev => ({ 
        ...prev, 
        images: err.message || 'Image upload failed. Please try again.' 
      }));
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
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
      const url = isEditMode ? `/api/admin/gallery/${gallery.id}` : '/api/admin/gallery';
      const method = isEditMode ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
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
        throw new Error(data.error || `Failed to ${isEditMode ? 'update' : 'save'} gallery (Status: ${response.status})`);
      }
      
      // Success
      const successMessage = isEditMode ? 'Gallery updated successfully!' : 'Gallery created successfully!';
      setSuccess(successMessage);
      
      // Reset form if not in edit mode
      if (!isEditMode) {
        setFormData({
          title: '',
          description: '',
          images: []
        });
      }
      
      // Call success callback if provided
      if (onSuccess) {
        setTimeout(() => {
          onSuccess(data.data);
        }, 1000);
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      
    } catch (err) {
      console.error('Save failed:', err);
      setErrors(prev => ({ 
        ...prev, 
        form: err.message || `Failed to ${isEditMode ? 'update' : 'save'} gallery. Please try again.` 
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

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditMode ? 'Edit Gallery' : 'Create New Gallery'}
      </h2>
      
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
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gallery Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter gallery title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
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
            rows="4"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe your gallery..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
          <div className="mt-1 text-sm text-gray-500">
            {formData.description.length} characters (minimum 10)
          </div>
        </div>
        
        {/* Images Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images * (Multiple allowed)
          </label>
          
          <div className="space-y-4">
            {/* Image Grid Preview */}
            {formData.images.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    {formData.images.length} image(s) uploaded
                  </span>
                  {formData.images.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, images: [] }))}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove All
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {formData.images.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                        <img
                          src={url}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="text-xs text-center mt-1 text-gray-500 truncate">
                        Image {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Upload Area */}
            <div className={`border-2 border-dashed ${errors.images ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg p-6 text-center transition-colors duration-200`}>
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Drag and drop images here, or
                </p>
                <label className="mt-2 inline-block">
                  <span className="sr-only">Choose images</span>
                  <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 cursor-pointer font-medium text-sm">
                    Browse Files
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG, GIF up to 5MB each. You can select multiple files.
                </p>
              </div>
              
              {uploading && (
                <div className="mt-4">
                  <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse w-1/2"></div>
                  </div>
                  <p className="mt-2 text-sm text-blue-600">Uploading images...</p>
                </div>
              )}
            </div>
            
            {errors.images && (
              <p className="mt-2 text-sm text-red-600 whitespace-pre-line">{errors.images}</p>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="pt-4 flex justify-end space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={uploading || saving}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            disabled={uploading || saving}
            className={`px-5 py-2.5 rounded-md font-medium text-white flex items-center ${
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
                {isEditMode ? 'Updating...' : 'Creating...'}
              </>
            ) : uploading ? (
              'Uploading Images...'
            ) : (
              isEditMode ? 'Update Gallery' : 'Create Gallery'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}