'use client'

import { useState, useEffect } from 'react'
import { Asterisk } from "lucide-react";

export default function ChitPlansComponent() {
  const [chits, setChits] = useState([])
  const [filteredChits, setFilteredChits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) 
  
  // Filter states
  const [selectedChitValue, setSelectedChitValue] = useState('all')
  const [selectedDuration, setSelectedDuration] = useState('all')
  const [sortBy, setSortBy] = useState('chit_value_desc')
  
  // Extract unique values for filters
  const chitValues = ['all', ...new Set(chits
    .map(chit => chit.chit_value)
    .filter(value => value != null && !isNaN(value))
    .sort((a, b) => a - b)
  )]
  
  // Create a unique list of durations with their units
  const durationOptions = ['all', ...Array.from(new Set(chits
    .filter(chit => chit.duration_value != null && !isNaN(chit.duration_value) && chit.duration_value > 0)
    .map(chit => `${chit.duration_value}_${chit.duration_unit || 'months'}`)
  ))].sort((a, b) => {
    if (a === 'all' || b === 'all') return 0;
    const aValue = parseInt(a.split('_')[0]);
    const bValue = parseInt(b.split('_')[0]);
    return aValue - bValue;
  });
  
  // Log for debugging
  useEffect(() => {
    console.log('Chits data:', chits)
    console.log('Available chit values:', chitValues)
    console.log('Available duration options:', durationOptions)
  }, [chits])
  
  useEffect(() => {
    fetchChits()
  }, [])
  
  useEffect(() => {
    applyFilters()
  }, [chits, selectedChitValue, selectedDuration, sortBy])
  
  const fetchChits = async () => {
    try {
      setLoading(true)
      // This would be your API endpoint to fetch chits
      const response = await fetch('/api/chits')
      const data = await response.json()
      
      console.log('API Response:', data) // Debug log
      
      if (data.success) {
        setChits(data.data || [])
      } else {
        setError(data.error || 'Failed to fetch chits')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  // Get the state label
  const getStateLabel = (total, duration, term) => {
    if (!total) return "-";
    console.log(total, duration, term)
    //instalments
    const monthlyInstalment = total/duration;
    // Calculate 40% of the total
    const fortyPercent = duration > 25 ? total * 0.25 : total * 0.20;
    const weeklyPercent = total * 0.20;
    
    // Subtract 3500 from the 40% amount
    const instalment = term == 'weeks' ? weeklyPercent/duration : fortyPercent / duration  
    const divident = monthlyInstalment - instalment
    
    return divident;
  };

  const applyFilters = () => {
    let result = [...chits]
    
    console.log('Applying filters with:', {
      selectedChitValue,
      selectedDuration,
      totalChits: chits.length
    }) // Debug log
    
    // Apply chit value filter
    if (selectedChitValue !== 'all') {
      const value = parseInt(selectedChitValue)
      result = result.filter(chit => chit.chit_value === value)
      console.log(`After chit value filter (${value}):`, result.length) // Debug log
    }
    
    // Apply duration filter
    if (selectedDuration !== 'all') {
      const [durationValue, durationUnit] = selectedDuration.split('_');
      const value = parseInt(durationValue);
      result = result.filter(chit => 
        chit.duration_value === value && 
        (chit.duration_unit || 'months') === durationUnit
      )
      console.log(`After duration filter (${value} ${durationUnit}):`, result.length) // Debug log
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'chit_value_asc':
          return a.chit_value - b.chit_value
        case 'chit_value_desc':
          return b.chit_value - a.chit_value
        case 'duration_asc':
          return (a.duration_value || 0) - (b.duration_value || 0)
        case 'duration_desc':
          return (b.duration_value || 0) - (a.duration_value || 0)
        default:
          return 0
      }
    })
    
    console.log('Final filtered results:', result.length) // Debug log
    setFilteredChits(result)
  }
  
  const resetFilters = () => {
    setSelectedChitValue('all')
    setSelectedDuration('all')
    setSortBy('chit_value_desc')
  }
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(amount)
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700">Error: {error}</p>
            <button 
              onClick={fetchChits}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        
        
        {/* Filter Section */}
        <div className="bg-gradient-to-t from-primary via-purple-500 to-purple-800 rounded-md shadow-md p-2 mb-8">
          <div className="flex justify-end"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {/* Chit Value Filter */}
            <div className=''>
              <select
                value={selectedChitValue}
                onChange={(e) => setSelectedChitValue(e.target.value)}
                className="w-full px-4 py-3 border-0 border-gray-300 text-white rounded-t-lg focus:ring-0 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-colors"
              >
                <option value="all" className='text-gray-800'>All Chit Values</option>
                {chitValues
                  .filter(val => val !== 'all' && val != null)
                  .map((value) => (
                    <option key={value} value={value} className='text-gray-800'>
                      ₹{formatCurrency(value)}
                    </option>
                  ))
                }
              </select>
            </div>
            
            {/* Duration Filter */}
            <div>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full px-4 py-3 border-0 border-gray-300 text-white rounded-t-lg focus:ring-0 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-colors"
              >
                <option value="all" className='text-gray-800'>All Durations</option>
                {durationOptions
                  .filter(val => val !== 'all' && val != null)
                  .map((durationOption) => {
                    if (durationOption === 'all') return null;
                    const [value, unit] = durationOption.split('_');
                    return (
                      <option key={durationOption} value={durationOption} className='text-gray-800'>
                        {value} {unit}
                      </option>
                    );
                  })
                }
              </select>
            </div>

            <div className="px-0">
          <div className="flex justify-end">
            <div className="relative group rounded-md bg-primary">
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-lg hover:bg-primary/50 transition-colors font-medium"
                aria-label="Reset all filters"
              >
                <img 
                  src="/images/rotate.gif" 
                  className="w-10 h-10 rounded-full" 
                  alt="Reset"
                />
              </button>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Reset all filters
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
        
        {/* Debug Information (you can remove this in production) */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-yellow-800">
            Info: {chits.length} chits loaded, {durationOptions.length - 1} unique durations available
          </p>
        </div>
        
        {/* Chit Plans Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Chit Plans Available ({filteredChits.length})</h2>
          
          {filteredChits.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="text-white mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No chit plans found</h3>
              <p className="text-yellow-500 mb-6">Try adjusting your filters to see more results</p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredChits.map((chit) => (
                <div key={chit.id} className="bg-gradient-to-br from-primary via-purple-600 to-purple-800 rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg md:mx-0 mx-10 transition-shadow">
                  <div className="p-4">
                    {/* Chit Value */}
                    <div className="mb-2">
                      <p className="text-yellow-300 text-xs mt-1">Total Chit Value</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        ₹{formatCurrency(chit.chit_value)}
                      </h3>
                    </div>
                    
                    {/* Duration Display */}
                    <div className="mb-2">
                      <p className="text-blue-200 text-xs">Duration</p>
                      <p className="text-lg font-semibold text-white">
                        {chit.duration_value && chit.duration_unit ? 
                          `${chit.duration_value} ${chit.duration_unit}` : 'N/A'}
                      </p>
                    </div>
                    
                    {/* Details Grid */}
                    <div className="justify-between items-center">
                      <div className="px-4 rounded-lg">
                        <p className="font-semibold text-white">
                          {chit.monthly_contribution ? `₹${formatCurrency(chit.monthly_contribution)} / ${chit.duration_unit}` : 'N/A'}
                        </p>
                      </div>
                      
                      <div className="flex items-center py-0 rounded-lg">
                        <span className="text-sm font-medium text-white px-3 py-1 rounded-full flex items-center">
                          <svg className="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span>Duration: &nbsp; </span>
                          {chit.duration_value && chit.duration_unit ? (
                            <span className="text-green-400 text-lg font-bold">
                              {chit.duration_value}<span className="text-red-300"> {chit.duration_unit}</span>
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </span>
                      </div>

                      {/* instalment range */}
                      <div className="my-4">
                        <div className="flex items-start">
                          <Asterisk size={12} className="text-red-400 mt-0.5 sm:mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-white text-xs sm:text-sm">Instalment Range from</p>
                            <p className="font-medium text-white text-xs sm:text-sm leading-tight">
                              {chit.location} {getStateLabel(chit.chit_value, chit.duration_value, chit.duration_unit || 'months')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Contact Information */}
                    <div className="border-t border-gray-100 pt-0">
                      <p className="text-sm font-medium text-white mb-2">Contact Numbers:</p>
                      <div className="space-y-2">
                        {chit.phone_number_1 && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-red-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <span className="text-sm text-green-300 font-semibold">{chit.phone_number_1}</span>
                          </div>
                        )}
                        
                        {chit.phone_number_2 && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                            </svg>
                            <span className="text-sm text-green-600 font-semibold">{chit.phone_number_2}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}