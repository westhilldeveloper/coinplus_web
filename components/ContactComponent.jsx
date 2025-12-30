"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';

const EnquiryForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    chitValue: '',
    tenure: '',
    occupation: '',
    monthlyIncome: '',
    state: '',
    branch: '',
    message: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'care@coinplus.co.in',
          subject: 'New Enquiry - Margadarsi Chit Fund',
          formData
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Thank you! Your enquiry has been submitted successfully.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          chitValue: '',
          tenure: '',
          occupation: '',
          monthlyIncome: '',
          state: '',
          branch: '',
          message: '',
          consent: false
        });
        
        // Auto close after 3 seconds on success
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Failed to submit. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Options for dropdowns
  const chitValues = [
    '₹ 10,000', '₹ 25,000', '₹ 50,000', '₹ 1,00,000', 
    '₹ 2,00,000', '₹ 3,00,000', '₹ 5,00,000', '₹ 10,00,000'
  ];

  const tenures = [
    '10 Months', '15 Months', '20 Months', '25 Months',
    '30 Months', '35 Months', '40 Months', '50 Months'
  ];

  const occupations = [
    'Business', 'Salaried', 'Professional', 'Self-Employed',
    'Agriculture', 'Retired', 'Housewife', 'Student'
  ];

  const monthlyIncomes = [
    'Below ₹ 20,000', '₹ 20,000 - ₹ 50,000', '₹ 50,000 - ₹ 1,00,000',
    '₹ 1,00,000 - ₹ 2,00,000', 'Above ₹ 2,00,000'
  ];

  const states = [
    'Andhra Pradesh', 'Telangana', 'Tamil Nadu', 'Karnataka',
    'Maharashtra', 'Delhi', 'Kerala', 'Other'
  ];

  const branches = [
    'Hyderabad - Banjara Hills', 'Hyderabad - Secunderabad', 'Vijayawada', 'Visakhapatnam',
    'Bengaluru', 'Chennai', 'Warangal', 'Guntur', 'Other'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <X className="w-6 h-6 text-primary" />
        </button>

        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            backgroundImage: 'url(/images/hp_fmly.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-transparent"></div>

          {/* Header Section */}
          <div className="text-white relative z-10 py-4 px-6 md:px-8 lg:px-12">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-200"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3">
              Invest smart - with Coinplus
            </h1>
            <p className="text-center text-sm sm:text-base md:text-lg opacity-90">
              Enquire today
            </p>
          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-8 md:p-12 relative z-10">
            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg ${submitMessage.includes('Thank you') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 focus:border-b-red-600 placeholder:text-white/80 bg-transparent focus:ring-0 focus:outline-none"
                    placeholder="Name *"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 focus:border-b-red-600 placeholder:text-white/80 bg-transparent focus:ring-0 focus:outline-none"
                    placeholder="Email *"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 focus:border-b-red-600 placeholder:text-white/80 bg-transparent focus:ring-0 focus:outline-none"
                    placeholder="Phone Number *"
                  />
                </div>

                <div>
                  <select
                    name="chitValue"
                    value={formData.chitValue}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 focus:border-b-red-600 bg-transparent focus:ring-0 focus:outline-none text-white"
                  >
                    <option value="" className="text-gray-400">Select chit value</option>
                    {chitValues.map((value, index) => (
                      <option key={index} value={value} className="text-primary">{value}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <select
                    name="tenure"
                    value={formData.tenure}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 focus:border-b-red-600 bg-transparent focus:ring-0 focus:outline-none text-white"
                  >
                    <option value="" className="text-gray-400">Select tenure</option>
                    {tenures.map((tenure, index) => (
                      <option key={index} value={tenure} className="text-primary">{tenure}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 focus:border-b-red-600 bg-transparent focus:ring-0 focus:outline-none text-white"
                  >
                    <option value="" className="text-gray-400">Select occupation</option>
                    {occupations.map((occupation, index) => (
                      <option key={index} value={occupation} className="text-primary">{occupation}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <select
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 focus:border-b-red-600 bg-transparent focus:ring-0 focus:outline-none text-white"
                  >
                    <option value="" className="text-gray-400">Select monthly income</option>
                    {monthlyIncomes.map((income, index) => (
                      <option key={index} value={income} className="text-primary">{income}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 focus:border-b-red-600 bg-transparent focus:ring-0 focus:outline-none text-white"
                  >
                    <option value="" className="text-gray-400">Select state</option>
                    {states.map((state, index) => (
                      <option key={index} value={state} className="text-primary">{state}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 5 - Branch Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 focus:border-b-red-600 bg-transparent focus:ring-0 focus:outline-none text-white"
                  >
                    <option value="" className="text-gray-400">Select branch</option>
                    {branches.map((branch, index) => (
                      <option key={index} value={branch} className="text-primary">{branch}</option>
                    ))}
                  </select>
                </div>

                {/* Empty column for alignment */}
                <div></div>
              </div>

              {/* Message Field */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border-0 border-b-2 border-gray-300 focus:border-b-red-600 placeholder:text-white/80 bg-transparent focus:ring-0 focus:outline-none"
                  placeholder="Any additional information or specific requirements..."
                />
              </div>

              {/* Consent Checkbox */}
              <div className="bg-white/10 p-6 rounded-lg border border-white/20 backdrop-blur-sm">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    className="mt-1 h-5 w-5 text-primary rounded focus:ring-primary bg-white"
                  />
                  <span className="text-white text-sm">
                    I hereby give my explicit consent to Margadarsi Chit Fund Pvt. Ltd. to contact me via phone, email, or other communication channels to discuss the interest I have expressed through this form and to offer suitable schemes tailored to my specific needs.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-white text-white hover:bg-white/10 rounded-full transition-all duration-300"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-white to-white/90 hover:from-white/90 hover:to-white text-primary font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Form</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactComponent = () => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <div 
        className="relative flex justify-between items-center min-h-[180px] md:min-h-[220px] px-4 sm:px-6 lg:px-8 py-8 md:py-12 rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `url('/images/family.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/70 to-primary"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 w-full mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
            {/* Text section */}
            <div className="lg:w-2/3 text-center lg:text-left">
             
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
                Get Expert Guidance,<br />Tailored for You
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-yellow-300/90 mb-8 md:mb-10 font-medium drop-shadow-lg">
                Speak directly with our chit fund specialists for personalized support.
              </p>
              
             
              
            </div>
            
            {/* Button section */}
            <div className="lg:w-1/3 flex justify-center lg:justify-end">
              <button 
                onClick={handleButtonClick}
                className="group relative flex items-center justify-center gap-4 bg-white/10 backdrop-blur-md text-white font-bold py-4 px-8 md:py-5 md:px-10 rounded-2xl transition-all duration-500 hover:bg-white/20 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 active:scale-95 whitespace-nowrap overflow-hidden"
              >
                {/* Button Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent group-hover:from-primary/40 transition-all duration-500"></div>
                
                {/* Animated Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/50 rounded-full transition-all duration-500"></div>
                
                {/* Button Content */}
                <img 
                  src="/images/info.gif" 
                  alt="Get a Quote" 
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white/50 group-hover:border-white transition-all duration-300"
                />
                
                
                {/* Hover Arrow */}
                <svg 
                  className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Form */}
      {showForm && <EnquiryForm onClose={handleCloseForm} />}
    </>
  );
};

export default ContactComponent;