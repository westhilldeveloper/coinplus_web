// app/careers/page.jsx
"use client";

import { useState, useRef } from 'react';
import { 
  Upload, 
  Send, 
  Users, 
  Target, 
  Shield, 
  Mail, 
  Phone, 
  User, 
  File,
  CheckCircle,
  Award,
  Briefcase,
  TrendingUp,
  HeartHandshake,
  Building,
  Clock,
  DollarSign,
  Users as UsersIcon
} from 'lucide-react';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});
  
  const fileInputRef = useRef(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear submit error
    if (submitError) {
      setSubmitError('');
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          resume: 'File size should be less than 5MB'
        }));
        return;
      }
      
      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const allowedExtensions = ['pdf', 'doc', 'docx', 'txt'];
      
      if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
        setErrors(prev => ({
          ...prev,
          resume: 'Only PDF, Word documents and text files are allowed'
        }));
        return;
      }
      
      setResume(file);
      setResumeName(file.name);
      setErrors(prev => ({
        ...prev,
        resume: ''
      }));
    }
  };

  // Trigger file input click
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!resume) {
      newErrors.resume = 'Resume is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('message', formData.message || '');
      if (resume) {
        formDataToSend.append('resume', resume);
      }
      
      // Send data to API
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formDataToSend,
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        setResume(null);
        setResumeName('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setSubmitError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Why Choose Us Features
  const features = [
    {
      icon: <Shield className="text-blue-600" size={24} />,
      title: "Legacy of Trust",
      description: "Over 60 years of trusted financial services"
    },
    {
      icon: <Users className="text-green-600" size={24} />,
      title: "Strong Team",
      description: "Join our family of 4,200+ professionals"
    },
    {
      icon: <TrendingUp className="text-purple-600" size={24} />,
      title: "Growth Opportunities",
      description: "Continuous learning and career advancement"
    },
    {
      icon: <HeartHandshake className="text-red-600" size={24} />,
      title: "Supportive Environment",
      description: "Work-life balance and employee welfare"
    },
    {
      icon: <Building className="text-orange-600" size={24} />,
      title: "Pan-India Presence",
      description: "Opportunities across multiple locations"
    },
    {
      icon: <Award className="text-yellow-600" size={24} />,
      title: "Recognition & Rewards",
      description: "Performance-based incentives and awards"
    }
  ];

  

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className=" ">
  <div className="relative w-full h-auto ">
        <img
          src="/images/img_careers.jpg"
          alt="FAQs Banner"
          fill
          className="object-cover"
        />
      </div>
  </div>
      
      

      

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Content */}
          <div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-md mb-8">
                Whether you're a seasoned professional or a fresh graduate looking to start your journey, Finovest offers meaningful opportunities across various departments and locations. Become part of an organization built on values, vision, and a commitment to empowering lives through trusted financial services.
              </p>
            </div>

            {/* Why Choose Us */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-primary mb-8">Why Choose Finovest?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md transition-all">
                    <div className="flex-shrink-0 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           
          </div>

          {/* Right Column - Application Form */}
          <div id="apply" className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 sticky top-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-md text-primary mb-2">Apply Now</h2>
              <p className="text-gray-600 text-sm">Submit your application and join our team</p>
            </div>

            {submitSuccess ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted Successfully!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in joining Finovest. We have received your application and will contact you soon.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <User size={16} />
                      Name *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <Mail size={16} />
                      Email *
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <Phone size={16} />
                      Phone Number *
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your 10-digit phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center gap-2">
                      <File size={16} />
                      Upload Resume *
                    </span>
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={handleFileButtonClick}
                      className={`w-full px-4 py-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
                        errors.resume 
                          ? 'border-red-500 bg-red-50' 
                          : resume 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                      }`}
                    >
                      <Upload className={`mb-2 ${resume ? 'text-green-600' : 'text-gray-400'}`} size={24} />
                      <span className={`font-medium ${resume ? 'text-green-700' : 'text-gray-600'}`}>
                        {resume ? resumeName : 'Choose file'}
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        {resume ? 'Click to change file' : 'PDF, DOC, DOCX, TXT (Max 5MB)'}
                      </span>
                    </button>
                    {errors.resume && (
                      <p className="text-sm text-red-600">{errors.resume}</p>
                    )}
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Tell us about your experience, interests, or any other information..."
                  />
                </div>

                {/* Submit Error */}
                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700">{submitError}</p>
                  </div>
                )}

                {/* Privacy Note */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-xs text-primary">
                    By submitting this form, you agree to our privacy policy and consent to being contacted by Finovest regarding career opportunities. We respect your privacy and will not share your information with third parties.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                    isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-primary/60 hover:bg-primary'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Submit Application
                    </>
                  )}
                </button>

                {/* Contact Info */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Need help? Contact our HR team at{' '}
                    <a href="mailto:hr@Finovest.com" className="text-blue-600 hover:underline">
                      hr@Finovest.com
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xl font-bold text-primary mb-4">Employee Benefits</h2>
            <p className="text-gray-600 max-w-2xl text-xs mx-auto">
              We value our employees and offer comprehensive benefits to support their professional and personal growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Competitive Salary</h3>
              <p className="text-gray-600 text-sm">Industry-standard compensation with regular performance reviews and increments</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Health & Wellness</h3>
              <p className="text-gray-600 text-sm">Comprehensive health insurance, wellness programs, and medical check-ups</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Career Development</h3>
              <p className="text-gray-600 text-sm">Training programs, workshops, and opportunities for skill enhancement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}