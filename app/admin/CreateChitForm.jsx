// app/components/chits/CreateChitForm.js
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, ChevronDown } from 'lucide-react'

export default function CreateChitForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
  chit_value: '',
  location: '',
  state: '',
  branch: '',
  phone_number_1: '',
  phone_number_2: '',
  monthly_contribution: '',
  chit_group: '',
  duration_value: '', // Changed from duration_months
  duration_unit: 'months' // New field: 'months' or 'weeks'
})

  // Dynamic states and branches
  const [states, setStates] = useState([])
  const [branches, setBranches] = useState([])
  const [loadingStates, setLoadingStates] = useState(true)
  const [loadingBranches, setLoadingBranches] = useState(false)

  // Fetch states from database
  const fetchStates = useCallback(async () => {
    setLoadingStates(true)
    try {
      console.log("Fetching states...")
      const response = await fetch('/api/chits/states')
      console.log("States response status:", response.status)
      
      if (!response.ok) {
        console.error("States fetch failed:", response.status, response.statusText)
        throw new Error('Failed to fetch states')
      }
      
      const data = await response.json()
      console.log("States API response:", data)
      
      if (data.success) {
        const statesList = data.states.map(state => ({
          code: state.state,
          name: state.label || state.state,
          icon: state.icon || '🏢'
        }))
        console.log("Processed states:", statesList)
        setStates(statesList)
      } else {
        console.error("States API success is false:", data)
      }
    } catch (error) {
      console.error('Error fetching states:', error)
    } finally {
      setLoadingStates(false)
    }
  }, [])

  // Fetch branches for selected state
  const fetchBranchesByState = useCallback(async (stateCode) => {
    console.log('fetchBranchesByState called with stateCode:', stateCode)
    
    if (!stateCode) {
      console.log('No state code provided, clearing branches')
      setBranches([])
      setFormData(prev => ({ ...prev, branch: '' })) // Reset branch selection
      return
    }

    setLoadingBranches(true)
    
    try {
      const url = `/api/branches?state=${encodeURIComponent(stateCode)}`
      console.log('Fetching from URL:', url)
      
      const response = await fetch(url)
      console.log('Branches response status:', response.status)
      
      if (!response.ok) {
        console.error('Branches fetch failed:', response.status, response.statusText)
        throw new Error(`Failed to fetch branches: ${response.status} ${response.statusText}`)
      }
      
      const result = await response.json()
      console.log('Branches API response:', result)
      
      // Check if the response has the expected structure
      if (result.success && Array.isArray(result.data)) {
        console.log('Setting branches:', result.data)
        setBranches(result.data)
      } else if (Array.isArray(result)) {
        // Fallback: if API returns array directly
        console.log('Setting branches (direct array):', result)
        setBranches(result)
      } else {
        console.error('Unexpected API response structure:', result)
        setBranches([])
      }
      
    } catch (error) {
      console.error('Error fetching branches:', error)
      console.error('Error details:', error.message)
      setBranches([])
    } finally {
      setLoadingBranches(false)
      console.log('Loading branches completed')
    }
  }, [])

  // Initial data fetch - only fetch states
  useEffect(() => {
    console.log("Component mounted, fetching states...")
    fetchStates()
  }, [fetchStates])

  // Fetch branches when state changes
  useEffect(() => {
    console.log("selectedState changed:", formData.state)
    console.log("Current states array:", states)
    
    if (formData.state) {
      const stateObj = states.find(s => s.code === formData.state)
      console.log("Selected state object:", stateObj)
    }
    
    if (formData.state) {
      fetchBranchesByState(formData.state)
    }
  }, [formData.state, fetchBranchesByState, states])

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Handle state change separately to reset branch
    if (name === 'state') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        branch: '' // Reset branch when state changes
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
  const newErrors = {}
  
  // Required fields validation - only chit_value is required now
  if (!formData.chit_value.trim() || parseFloat(formData.chit_value) <= 0) {
    newErrors.chit_value = 'Chit value must be a positive number'
  }
  
  // Phone number validation (if provided)
  if (formData.phone_number_1 && !/^\d{10}$/.test(formData.phone_number_1)) {
    newErrors.phone_number_1 = 'Phone number must be 10 digits'
  }
  
  if (formData.phone_number_2 && !/^\d{10}$/.test(formData.phone_number_2)) {
    newErrors.phone_number_2 = 'Phone number must be 10 digits'
  }
  
  // Optional field validation for numbers
  if (formData.monthly_contribution && parseFloat(formData.monthly_contribution) <= 0) {
    newErrors.monthly_contribution = 'Monthly contribution must be positive'
  }
  
  if (formData.duration_value && parseInt(formData.duration_value) <= 0) {
    newErrors.duration_value = 'Duration must be positive'
  }
  
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

  const handleSubmit = async (e) => {
  e.preventDefault()
  
  if (!validateForm()) {
    return
  }
  
  setLoading(true)
  setErrors({})
  
  try {
    // Clean phone numbers (remove any non-digit characters)
    const cleanPhoneNumber = (phone) => {
      if (!phone) return null
      return phone.replace(/\D/g, '') // Remove non-digits
    }
    
    // Prepare data with proper type conversions
    const dataToSend = {
      chit_value: parseFloat(formData.chit_value),
      location: formData.location.trim() || null,
      state: formData.state.trim() || null,
      branch: formData.branch.trim() || null,
      // Clean phone numbers but keep as strings
      phone_number_1: cleanPhoneNumber(formData.phone_number_1),
      phone_number_2: cleanPhoneNumber(formData.phone_number_2),
      monthly_contribution: formData.monthly_contribution ? 
        parseFloat(formData.monthly_contribution) : null,
      duration_value: formData.duration_value ? parseInt(formData.duration_value) : null,
      duration_unit: formData.duration_unit,
      chit_group: formData.chit_group.trim() || null
    }
    
    console.log('Submitting chit data:', dataToSend)
    
    const response = await fetch('/api/chits/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create chit')
    }
    
    // Success - reset form and show success message
    setFormData({
      chit_value: '',
      location: '',
      state: '',
      branch: '',
      phone_number_1: '',
      phone_number_2: '',
      monthly_contribution: '',
      chit_group: '',
      duration_value: '',
      duration_unit: 'months'
    })
    
    // Show success toast
    showToast('✅ Chit created successfully!', 'success')
    
    // Refresh the page
    setTimeout(() => {
      router.refresh()
    }, 1500)
    
  } catch (error) {
    console.error('Error creating chit:', error)
    setErrors({ submit: error.message || 'Failed to create chit' })
    showToast(`❌ ${error.message || 'Failed to create chit'}`, 'error')
  } finally {
    setLoading(false)
  }
}


  const showToast = (message, type) => {
    // Create toast element
    const toast = document.createElement('div')
    toast.className = `fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-slide-in ${
      type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : 
      type === 'error' ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white' : 
      'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
    }`
    
    toast.innerHTML = `
      <span class="text-xl">${type === 'success' ? '✅' : '❌'}</span>
      <span>${message}</span>
    `
    
    document.body.appendChild(toast)
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.classList.add('animate-slide-out')
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Create New Chit</h1>
              <p className="text-blue-100 mt-2">Fill in the details to register a new chit fund</p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
              <span className="text-sm font-medium">Step 1 of 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-b-2xl shadow-2xl -mt-4 relative z-10 p-8">
        {errors.submit && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700 font-medium">{errors.submit}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Required Fields Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Basic Information</h2>
              <span className="ml-auto text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                REQUIRED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chit Value - Only Required Field */}
              <div className="group">
                <label htmlFor="chit_value" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Chit Value *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    type="number"
                    id="chit_value"
                    name="chit_value"
                    value={formData.chit_value}
                    onChange={handleChange}
                    placeholder="100,000"
                    step="0.01"
                    min="0"
                    className={`pl-10 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.chit_value ? 'border-red-300 bg-red-50' : 'border-gray-300 group-hover:border-blue-400'
                    }`}
                    required
                  />
                </div>
                {errors.chit_value && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.chit_value}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Location, State, Branch - Now Optional Section */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="bg-gray-600 p-2 rounded-lg mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Location Details</h2>
              <span className="ml-auto text-xs font-semibold bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                OPTIONAL
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div className="group">
                <label htmlFor="location" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Mumbai Central"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300 group-hover:border-blue-400'
                  }`}
                />
                <p className="mt-2 text-xs text-gray-500">Optional: Specific area or landmark</p>
              </div>

              {/* State - Dynamic Dropdown */}
              <div className="group">
                <label htmlFor="state" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  State
                </label>
                <div className="relative">
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`appearance-none w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.state ? 'border-red-300 bg-red-50' : 'border-gray-300 group-hover:border-blue-400'
                    }`}
                    disabled={loadingStates}
                  >
                    <option value="">{loadingStates ? "Loading states..." : "Select a state (optional)..."}</option>
                    {states.map(state => (
                      <option key={state.code} value={state.code}>
                        {state.icon} {state.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {loadingStates ? (
                      <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">Optional: Select a state</p>
              </div>

              {/* Branch - Dynamic Dropdown */}
              <div className="group">
                <label htmlFor="branch" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Branch
                </label>
                <div className="relative">
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className={`appearance-none w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.branch ? 'border-red-300 bg-red-50' : 'border-gray-300 group-hover:border-blue-400'
                    } ${
                      !formData.state ? 'bg-gray-50 text-gray-400' : ''
                    }`}
                    disabled={!formData.state || loadingBranches}
                  >
                    <option value="">
                      {loadingBranches ? "Loading branches..." : 
                       !formData.state ? "Select a state first" : 
                       branches.length === 0 ? "No branches available in this state" : 
                       "Select a branch (optional)..."}
                    </option>
                    {branches?.map((branch) => (
                      <option key={branch.id} value={branch.name || branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {loadingBranches ? (
                      <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">Optional: Select a branch (requires state)</p>
              </div>
            </div>
          </div>

          {/* Additional Details Section */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="bg-gray-600 p-2 rounded-lg mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Additional Details</h2>
              <span className="ml-auto text-xs font-semibold bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                OPTIONAL
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Number 1 */}
              <div className="group">
                <label htmlFor="phone_number_1" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Primary Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">+91</span>
                  </div>
                  <input
                    type="text"
                    id="phone_number_1"
                    name="phone_number_1"
                    value={formData.phone_number_1}
                    onChange={handleChange}
                    placeholder="9876543210"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    maxLength="10"
                    className={`pl-12 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.phone_number_1 ? 'border-red-300 bg-red-50' : 'border-gray-300 group-hover:border-blue-400'
                    }`}
                  />
                </div>
                {errors.phone_number_1 && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.phone_number_1}
                  </p>
                )}
              </div>

              {/* Phone Number 2 */}
              <div className="group">
                <label htmlFor="phone_number_2" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Alternate Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">+91</span>
                  </div>
                  <input
                    type="text"
                    id="phone_number_2"
                    name="phone_number_2"
                    value={formData.phone_number_2}
                    onChange={handleChange}
                    placeholder="9876543210"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    maxLength="10"
                    className={`pl-12 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.phone_number_2 ? 'border-red-300 bg-red-50' : 'border-gray-300 group-hover:border-blue-400'
                    }`}
                  />
                </div>
                {errors.phone_number_2 && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.phone_number_2}
                  </p>
                )}
              </div>

              {/* Monthly Contribution */}
              <div className="group">
                <label htmlFor="monthly_contribution" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Monthly Contribution
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    type="number"
                    id="monthly_contribution"
                    name="monthly_contribution"
                    value={formData.monthly_contribution}
                    onChange={handleChange}
                    placeholder="5,000"
                    step="0.01"
                    min="0"
                    className={`pl-10 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.monthly_contribution ? 'border-red-300 bg-red-50' : 'border-gray-300 group-hover:border-blue-400'
                    }`}
                  />
                </div>
                {errors.monthly_contribution && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.monthly_contribution}
                  </p>
                )}
              </div>

              {/* Duration Months */}
              <div className="group md:col-span-2">
  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
    <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    Duration
  </label>
  <div className="flex gap-4">
    <div className="flex-1 relative">
      <input
        type="number"
        id="duration_value"
        name="duration_value"
        value={formData.duration_value}
        onChange={handleChange}
        placeholder={formData.duration_unit === 'months' ? '12' : '52'}
        min="1"
        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
          errors.duration_value ? 'border-red-300 bg-red-50' : 'border-gray-300 group-hover:border-blue-400'
        }`}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span className="text-gray-500">{formData.duration_unit}</span>
      </div>
    </div>
    <div className="w-40">
      <select
        id="duration_unit"
        name="duration_unit"
        value={formData.duration_unit}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="months">Months</option>
        <option value="weeks">Weeks</option>
      </select>
    </div>
  </div>
  {errors.duration_value && (
    <p className="mt-2 text-sm text-red-600 flex items-center">
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {errors.duration_value}
    </p>
  )}
</div>

              {/* Chit Group - Full Width */}
              <div className="md:col-span-2 group">
                <label htmlFor="chit_group" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Chit Group Name
                </label>
                <input
                  type="text"
                  id="chit_group"
                  name="chit_group"
                  value={formData.chit_group}
                  onChange={handleChange}
                  placeholder="e.g., Gold Members Group, Premium Investors, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-blue-400"
                />
                <p className="mt-2 text-xs text-gray-500">Give a name to identify this chit group</p>
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="bg-green-600 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Ready to Create Chit</h3>
                  <p className="text-sm text-gray-600">Only chit value is required. All other fields are optional.</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      chit_value: '',
                      location: '',
                      state: '',
                      branch: '',
                      phone_number_1: '',
                      phone_number_2: '',
                      monthly_contribution: '',
                      chit_group: '',
                      duration_months: ''
                    })
                    setErrors({})
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear All
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Chit...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Create Chit
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Only chit value (*) is required</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Your data is secure with us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slide-out {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-slide-out {
          animation: slide-out 0.3s ease-in;
        }
        
        /* Custom scrollbar for select */
        select {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }
        
        select::-webkit-scrollbar {
          width: 8px;
        }
        
        select::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        
        select::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 4px;
        }
        
        /* Smooth focus transitions */
        input, select {
          transition: all 0.2s ease;
        }
        
        /* Placeholder styling */
        ::placeholder {
          color: #9ca3af;
        }
        
        /* Focus styling */
        input:focus, select:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </div>
  )
}