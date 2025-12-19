'use client'

import { useState, useEffect } from 'react'

export default function ChitPlansComponent() {
  const [chits, setChits] = useState([])
  const [filteredChits, setFilteredChits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) 
  
  // Filter states
  
  const [selectedState, setSelectedState] = useState('all')
  const [selectedBranch, setSelectedBranch] = useState('all')
  const [selectedDuration, setSelectedDuration] = useState('all')
  const [sortBy, setSortBy] = useState('chit_value_desc')
  
  // Extract unique values for filters
  const states = ['all', ...new Set(chits.map(chit => chit.state))]
  const branches = ['all', ...new Set(chits.map(chit => chit.branch))]
  const durations = ['all', ...new Set(chits.map(chit => chit.duration_months).filter(Boolean))]
  
  useEffect(() => {
    fetchChits()
  }, [])
  
  useEffect(() => {
    applyFilters()
  }, [chits, selectedState, selectedBranch, selectedDuration, sortBy])
  
  const fetchChits = async () => {
    try {
      setLoading(true)
      // This would be your API endpoint to fetch chits
      const response = await fetch('/api/chits')
      const data = await response.json()
      
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
  
  const applyFilters = () => {
    let result = [...chits]
    
    // Apply state filter
    if (selectedState !== 'all') {
      result = result.filter(chit => chit.state === selectedState)
    }
    
    // Apply branch filter
    if (selectedBranch !== 'all') {
      result = result.filter(chit => chit.branch === selectedBranch)
    }
    
    // Apply duration filter
    if (selectedDuration !== 'all') {
      result = result.filter(chit => chit.duration_months === parseInt(selectedDuration))
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'chit_value_asc':
          return a.chit_value - b.chit_value
        case 'chit_value_desc':
          return b.chit_value - a.chit_value
        case 'duration_asc':
          return (a.duration_months || 0) - (b.duration_months || 0)
        case 'duration_desc':
          return (b.duration_months || 0) - (a.duration_months || 0)
        default:
          return 0
      }
    })
    
    setFilteredChits(result)
  }
  
  const resetFilters = () => {
    setSelectedState('all')
    setSelectedBranch('all')
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
       
        <div className="   px-2 ">
          <div className="flex justify-end">
  <div className="relative group bg-primary">
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
        {/* Filter Section */}
        <div className="bg-primary  shadow-md p-2 mb-8">
          <div className="flex justify-end">
  
</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* State Filter */}
            <div className=''>
            
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-3 border-0  border-gray-300 text-white rounded-t-lg focus:ring-0 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-colors"
  >
                {states.map((state) => (
                  <option key={state} value={state} className='text-gray-800'>
                    {state === 'all' ? 'All States' : state}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Branch Filter */}
            <div>
             
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-4 py-3 border-0  border-gray-300 text-white rounded-t-lg focus:ring-0 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-colors"
  >
                {branches.map((branch) => (
                  <option key={branch} value={branch} className='text-gray-800'>
                    {branch === 'all' ? 'All Branches' : branch}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Duration Filter */}
            <div>
  <select
    value={selectedState}
    onChange={(e) => setSelectedState(e.target.value)}
    className="w-full px-4 py-3 border-0  border-gray-300 text-white rounded-t-lg focus:ring-0 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-colors"
  >
    {durations.map((duration) => (
      <option key={duration} value={duration} className='text-gray-700'>
        {duration === 'all' ? 'All Durations' : `${duration} months`}
      </option>
    ))}
  </select>
</div>
            
            {/* Sort Filter */}
            <div>
            
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                 className="w-full px-4 py-3 border-0  border-gray-300 text-white rounded-t-lg focus:ring-0 focus:outline-none focus:border-b-2 focus:border-blue-500 transition-colors"
  >
                <option value="chit_value_desc" className='text-gray-800'>Chit Value: High to Low</option>
                <option value="chit_value_asc" className='text-gray-800'>Chit Value: Low to High</option>
                <option value="duration_asc" className='text-gray-800'>Duration: Low to High</option>
                <option value="duration_desc" className='text-gray-800'>Duration: High to Low</option>
              </select>
            </div>
          </div>
          
         
        </div>
        
        {/* Chit Plans Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Chit Plans Available</h2>
          
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredChits.map((chit) => (
                <div key={chit.id} className="bg-primary rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="p-4">
                   
                    
                    {/* Chit Value */}
                    <div className="mb-2">
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        ₹{formatCurrency(chit.chit_value)}
                      </h3>
                      <p className="text-yellow-500 text-xs mt-1">Total Chit Value</p>
                    </div>
                    
                    {/* Location */}
                    <div className="mt-4">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-white mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <div>
                          <p className="font-medium text-white">{chit.location}</p>
                          <p className="text-xs text-red-300">{chit.branch}, {chit.state}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Details Grid */}
                    <div className=" justify-between items-center">
                      <div className=" px-4 rounded-lg">
                        
                        <p className="font-semibold text-white">
                          {chit.monthly_contribution ? `₹${formatCurrency(chit.monthly_contribution)} /Month` : 'N/A'}
                        </p>
                      </div>
                      
                      <div className="flex items-center py-4 rounded-lg">
  <span className="text-sm font-medium text-white px-3 py-1 rounded-full flex items-center">
    <svg className="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
    </svg>
    <span>Duration: &nbsp; </span> {chit.duration_months || 'N/A'} months
  </span>
</div>
                    </div>
                    
                    {/* Contact Information */}
                    <div className="border-t border-gray-100 pt-0">
                      <p className="text-sm font-medium text-white mb-2">Contact Numbers:</p>
                      <div className="space-y-2">
                        {chit.phone_number_1 && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <span className="text-sm text-green-600 font-semibold">{chit.phone_number_1}</span>
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
        
        {/* Footer */}
        <footer className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-green-600">© 2023 Chit Plans Dashboard. All rights reserved.</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-green-600">Contact: support@chitplans.com</p>
              <p className="text-green-600">Phone: 1800-123-4567</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}