// components/Admin/components/AdminBlogForm.js
"use client";

import { useState, useRef, useEffect } from 'react';

export default function AdminBlogForm({ blog = null, onSuccess, onCancel }) {
  const isEditMode = !!blog;
  
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    description: blog?.description || '',
    imageUrl: blog?.imageUrl || ''
  });
  
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Handle image upload (same as before)
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
      const cloudName = 'ddsim4ixm'; // Your cloud name
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
      
      setFormData({ 
        ...formData, 
        imageUrl: result.secure_url
      });
      
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

  // Formatting helper functions for the textarea
  const insertFormatting = (format) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    let newText;
    let newCursorPos;
    
    switch(format) {
      case 'bold':
        newText = text.substring(0, start) + '**' + selectedText + '**' + text.substring(end);
        newCursorPos = end + 4;
        break;
      case 'italic':
        newText = text.substring(0, start) + '*' + selectedText + '*' + text.substring(end);
        newCursorPos = end + 2;
        break;
      case 'bullet':
        if (selectedText.includes('\n')) {
          // Add bullet points to each line
          const lines = selectedText.split('\n');
          const bulletedLines = lines.map(line => line.trim() ? `• ${line}` : '').join('\n');
          newText = text.substring(0, start) + bulletedLines + text.substring(end);
          newCursorPos = end + (bulletedLines.length - selectedText.length);
        } else {
          newText = text.substring(0, start) + '• ' + selectedText + text.substring(end);
          newCursorPos = end + 2;
        }
        break;
      case 'number':
        if (selectedText.includes('\n')) {
          const lines = selectedText.split('\n');
          const numberedLines = lines.map((line, index) => line.trim() ? `${index + 1}. ${line}` : '').join('\n');
          newText = text.substring(0, start) + numberedLines + text.substring(end);
          newCursorPos = end + (numberedLines.length - selectedText.length);
        } else {
          newText = text.substring(0, start) + '1. ' + selectedText + text.substring(end);
          newCursorPos = end + 3;
        }
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          newText = text.substring(0, start) + `[${selectedText || 'link'}](${url})` + text.substring(end);
          newCursorPos = end + (selectedText ? 0 : 4) + url.length + 3;
        }
        return;
      default:
        return;
    }
    
    setFormData(prev => ({ ...prev, description: newText }));
    
    // Restore cursor position after state update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
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
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
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
      const url = isEditMode ? `/api/admin/blog/${blog.id}` : '/api/admin/blog';
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
        throw new Error(data.error || `Failed to ${isEditMode ? 'update' : 'save'} blog (Status: ${response.status})`);
      }
      
      // Success
      const successMessage = isEditMode ? 'Blog updated successfully!' : 'Blog created successfully!';
      setSuccess(successMessage);
      
      // Reset form if not in edit mode
      if (!isEditMode) {
        setFormData({
          title: '',
          description: '',
          imageUrl: ''
        });
        setImagePreview('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
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
        form: err.message || `Failed to ${isEditMode ? 'update' : 'save'} blog. Please try again.` 
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

  // Preview rendering function
  const renderPreview = () => {
    const formatText = (text) => {
      // Convert markdown-like formatting to HTML
      let formatted = text
        // Convert line breaks to <br> for preview
        .replace(/\n/g, '<br>')
        // Convert paragraphs (double line breaks)
        .replace(/<br><br>/g, '</p><p>')
        // Convert bold **text** to <strong>
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Convert italic *text* to <em>
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Convert bullet points • to list items
        .replace(/•\s*(.*?)(?=<br>|$)/g, '<li>$1</li>')
        // Convert numbered lists 1. to list items
        .replace(/(\d+)\.\s*(.*?)(?=<br>|$)/g, '<li>$2</li>')
        // Convert links [text](url) to <a>
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');

      // Wrap in paragraph tags
      return `<p>${formatted}</p>`;
    };

    return (
      <div className="prose prose-lg max-w-none">
        <div 
          className="text-gray-700 whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: formatText(formData.description) }}
        />
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
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
            Blog Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter blog title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>
        
        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Featured Image *
          </label>
          
          <div className="space-y-3">
            {/* Image Preview */}
            {(imagePreview || formData.imageUrl) ? (
              <div className="relative">
                <div className="w-full max-w-md border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
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
                  Upload a featured image
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
        
        {/* Description Field with Formatting Tools */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Blog Content *
            </label>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showPreview ? 'Show Editor' : 'Show Preview'}
            </button>
          </div>
          
          {/* Formatting Toolbar */}
          <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-50 rounded-md border border-gray-200">
            <button
              type="button"
              onClick={() => insertFormatting('bold')}
              className="px-3 py-1.5 text-sm font-bold bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Bold (Ctrl+B)"
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('italic')}
              className="px-3 py-1.5 text-sm italic bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Italic (Ctrl+I)"
            >
              <em>I</em>
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('bullet')}
              className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center"
              title="Bullet List"
            >
              <span className="mr-1">•</span> List
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('number')}
              className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Numbered List"
            >
              1. List
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('link')}
              className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="Insert Link"
            >
              🔗 Link
            </button>
            <div className="text-xs text-gray-500 ml-auto flex items-center">
              <span>Press Enter for new paragraph, Shift+Enter for line break</span>
            </div>
          </div>
          
          {/* Formatting Help */}
          <div className="text-xs text-gray-500 mb-2 p-2 bg-blue-50 rounded">
            <div className="grid grid-cols-2 gap-2">
              <div><strong>Bold:</strong> **text**</div>
              <div><em>Italic:</em> *text*</div>
              <div>Bullet: • item</div>
              <div>Numbered: 1. item</div>
              <div>Link: [text](url)</div>
              <div>Line break: Press Enter</div>
            </div>
          </div>
          
          {showPreview ? (
            // Preview Panel
            <div className={`border rounded-md p-4 min-h-[200px] bg-gray-50 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}>
              {formData.description ? (
                renderPreview()
              ) : (
                <p className="text-gray-400 italic">Preview will appear here...</p>
              )}
            </div>
          ) : (
            // Text Editor
            <textarea
              ref={textareaRef}
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="15"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Write your blog content here...
              
Use **bold** for important text
Use *italic* for emphasis
Use • for bullet points
Use 1. for numbered lists
Press Enter for new paragraphs
              
Example:
**Introduction**
This is a sample blog post.

• First point
• Second point
• Third point

1. Step one
2. Step two
3. Step three"
            />
          )}
          
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
          <div className="mt-1 flex justify-between text-sm">
            <span className={`${formData.description.length < 50 ? 'text-red-500' : 'text-gray-500'}`}>
              Minimum 50 characters required
            </span>
            <span className={`${
              formData.description.length >= 50 ? 'text-green-500' : 'text-gray-500'
            }`}>
              {formData.description.length} characters
            </span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="pt-4 flex justify-end space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
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
                {isEditMode ? 'Updating...' : 'Publishing...'}
              </>
            ) : uploading ? (
              'Uploading Image...'
            ) : (
              isEditMode ? 'Update Blog Post' : 'Publish Blog Post'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}