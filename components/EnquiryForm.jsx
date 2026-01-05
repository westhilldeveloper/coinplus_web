"use client";

import React, { useState } from 'react';

const EnquiryForm = () => {
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
          subject: 'New Enquiry - Finovest Chit Fund',
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
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-2 lg:px-2 py-2 md:py-2 border-2 border-primary rounded-lg">
      <div
  className="relative rounded-2xl shadow-2xl overflow-hidden"
  style={{
    backgroundImage: 'url(/images/hp_fmly.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
     <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-transparent"></div>

        {/* Header Section */}
        <div className="text-white relative z-10 py-2 px-4 md:px-6 lg:px-12">
          <h1 className="text-lg sm:text-lg md:text-xl lg:text-xl font-bold text-center mb-2 sm:mb-3">
            Invest smart - with Coinplus
          </h1>
          <p className="text-center text-sm sm:text-sm md:text-md lg:text-lg opacity-90">
            Enquire today
          </p>
        </div>

        {/* Form Section */}
        <div className="p-4 relative z-10 sm:p-6 md:p-8 lg:p-12">
          {submitMessage && (
            <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg text-sm sm:text-base ${submitMessage.includes('Thank you') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-1 py-1 text-sm sm:text-base border-0 border-b-2 border-gray-300 focus:border-b-red-600 placeholder:text-white focus:ring-0 focus:outline-none rounded-t-lg"
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
                  className="w-full px-1 py-1 text-sm sm:text-base border-0 border-b-2 border-gray-300 focus:border-b-red-600 focus:outline-none placeholder:text-white focus:border-transparent"
                  placeholder="Email *"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-1 py-1 text-sm sm:text-base border-0 border-b-2 border-gray-300 focus:border-b-red-600 focus:outline-none placeholder:text-white focus:border-transparent"
                  placeholder="Phone Number *"
                />
              </div>

              <div>
                <select
                  name="chitValue"
                  value={formData.chitValue}
                  onChange={handleChange}
                  required
                  className="w-full px-1 py-1 text-sm sm:text-base border-0 border-b-2 border-gray-300 focus:border-b-red-600 focus:outline-none text-white focus:border-transparent"
                >
                  <option value="" className="text-gray-400 text-sm sm:text-base">Select chit value</option>
                  {chitValues.map((value, index) => (
                    <option className="text-primary text-sm sm:text-base" key={index} value={value}>{value}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <select
                  name="tenure"
                  value={formData.tenure}
                  onChange={handleChange}
                  required
                  className="w-full px-1 py-1 text-sm sm:text-base border-0 border-b-2 border-gray-300 focus:border-b-red-600 focus:outline-none text-white focus:border-transparent"
                >
                  <option value="" className="text-gray-400 text-sm sm:text-base">Select tenure</option>
                  {tenures.map((tenure, index) => (
                    <option className="text-primary text-sm sm:text-base" key={index} value={tenure}>{tenure}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                  className="w-full px-1 py-1 text-sm sm:text-base border-0 border-b-2 border-gray-300 focus:border-b-red-600 focus:outline-none text-white focus:border-transparent"
                >
                  <option value="" className="text-gray-400 text-sm sm:text-base">Select occupation</option>
                  {occupations.map((occupation, index) => (
                    <option className="text-primary text-sm sm:text-base" key={index} value={occupation}>{occupation}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <select
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  required
                  className="w-full px-1 py-1 text-sm sm:text-base border-0 border-b-2 border-gray-300 focus:border-b-red-600 focus:outline-none text-white focus:border-transparent"
                >
                  <option value="" className="text-gray-400 text-sm sm:text-base">Select monthly income</option>
                  {monthlyIncomes.map((income, index) => (
                    <option className="text-primary text-sm sm:text-base" key={index} value={income}>{income}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-1 py-1 text-sm sm:text-base border-0 border-b-2 border-gray-300 focus:border-b-red-600 focus:outline-none text-white focus:border-transparent"
                >
                  <option value="" className="text-gray-400 text-sm sm:text-base">Select state</option>
                  {states.map((state, index) => (
                    <option className="text-primary text-sm sm:text-base" key={index} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 5 - Branch Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                  className="w-full px-1 py-1 text-sm sm:text-base border-0 border-b-2 border-gray-300 focus:border-b-red-600 focus:outline-none text-white focus:border-transparent"
                >
                  <option value="" className="text-gray-400 text-sm sm:text-base">Select branch</option>
                  {branches.map((branch, index) => (
                    <option className="text-primary text-sm sm:text-base" key={index} value={branch}>{branch}</option>
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
                className="w-full px-1 py-1 text-sm sm:text-base border-0 border-b-2 border-gray-300 focus:border-b-red-600 focus:outline-none placeholder:text-white focus:border-transparent"
                placeholder="Any additional information or specific requirements..."
              />
            </div>

            {/* Consent Checkbox */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200">
              <label className="flex items-start space-x-2 sm:space-x-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                  className="mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5 text-primary rounded focus:ring-primary"
                />
                <span className="text-primary text-xs sm:text-sm md:text-base">
                  I hereby give my explicit consent to Finovest Chit Fund Pvt. Ltd. to contact me via phone, email, or other communication channels to discuss the interest I have expressed through this form and to offer suitable schemes tailored to my specific needs.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4 sm:pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold py-2 sm:py-3 md:py-4 px-6 sm:px-8 md:px-12 rounded-full text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto space-x-1 sm:space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-xs sm:text-sm md:text-base">Submitting...</span>
                  </>
                ) : (
                  <>
                    <span className="text-xs sm:text-sm md:text-base">Submit Form</span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  );
};

export default EnquiryForm;