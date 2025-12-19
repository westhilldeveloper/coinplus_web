// app/components/chits/ChitDashboard.js
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import debounce from 'lodash/debounce'

export default function ChitDashboard() {
  const router = useRouter()
  
  const [chits, setChits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedChits, setSelectedChits] = useState(new Set())
  const [editingChit, setEditingChit] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [chitToDelete, setChitToDelete] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  
  // Pagination
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  })
  
  // Filters
  const [filters, setFilters] = useState({
    state: '',
    branch: '',
    minValue: '',
    maxValue: '',
    search: '',
    sortBy: 'created_at',
    sortOrder: 'desc'
  })

  // Get unique states and branches for filter options
  const [filterOptions, setFilterOptions] = useState({
    states: [],
    branches: []
  })

  // Fetch chits with debounced search
  const fetchChits = useCallback(async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      }).toString()

      const response = await fetch(`/api/chits?${queryParams}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch chits')
      }

      setChits(data.data)
      setPagination(data.pagination)
      
      // Extract unique states and branches
      const uniqueStates = [...new Set(data.data.map(chit => chit.state))].sort()
      const uniqueBranches = [...new Set(data.data.map(chit => chit.branch))].sort()
      
      setFilterOptions({
        states: uniqueStates,
        branches: uniqueBranches
      })
      
    } catch (error) {
      setError(error.message)
      showToast(`❌ ${error.message}`, 'error')
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, filters])

  // Debounced search
  const debouncedFetchChits = useCallback(
    debounce(() => fetchChits(), 500),
    [fetchChits]
  )

  // Initial fetch and when filters change
  useEffect(() => {
    debouncedFetchChits()
    return () => debouncedFetchChits.cancel()
  }, [debouncedFetchChits])

  // Fetch filter options on mount
  useEffect(() => {
    fetchFilterOptions()
  }, [])

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch('/api/chits?limit=1000')
      const data = await response.json()
      
      if (response.ok) {
        const allChits = data.data
        const uniqueStates = [...new Set(allChits.map(chit => chit.state))].sort()
        const uniqueBranches = [...new Set(allChits.map(chit => chit.branch))].sort()
        
        setFilterOptions({
          states: uniqueStates,
          branches: uniqueBranches
        })
      }
    } catch (error) {
      console.error('Failed to fetch filter options:', error)
    }
  }

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key === 'search' ? 1 : prev.page // Reset to page 1 on search
    }))
  }

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }))
  }

  // Handle sort
  const handleSort = (column) => {
    setFilters(prev => ({
      ...prev,
      sortBy: column,
      sortOrder: prev.sortBy === column && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }))
  }

  // Handle chit selection
  const toggleChitSelection = (id) => {
    const newSelected = new Set(selectedChits)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedChits(newSelected)
  }

  const selectAllChits = () => {
    if (selectedChits.size === chits.length) {
      setSelectedChits(new Set())
    } else {
      setSelectedChits(new Set(chits.map(chit => chit.id)))
    }
  }

  // Handle chit edit
  const handleEdit = (chit) => {
    setEditingChit({ ...chit })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/chits/${editingChit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingChit)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update chit')
      }

      showToast('✅ Chit updated successfully!', 'success')
      setEditingChit(null)
      fetchChits()
    } catch (error) {
      showToast(`❌ ${error.message}`, 'error')
    }
  }

  // Handle chit delete
  const confirmDelete = (chit) => {
    setChitToDelete(chit)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/chits/${chitToDelete.id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete chit')
      }

      showToast('✅ Chit deleted successfully!', 'success')
      setShowDeleteModal(false)
      setChitToDelete(null)
      fetchChits()
    } catch (error) {
      showToast(`❌ ${error.message}`, 'error')
    }
  }

  // Handle bulk actions
  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedChits.size} chits?`)) return
    
    try {
      const deletePromises = Array.from(selectedChits).map(id =>
        fetch(`/api/chits/${id}`, { method: 'DELETE' })
      )
      
      await Promise.all(deletePromises)
      showToast(`✅ ${selectedChits.size} chits deleted successfully!`, 'success')
      setSelectedChits(new Set())
      fetchChits()
    } catch (error) {
      showToast(`❌ Failed to delete chits: ${error.message}`, 'error')
    }
  }

  const handleBulkExport = () => {
    const selectedChitsData = chits.filter(chit => selectedChits.has(chit.id))
    const csvData = convertToCSV(selectedChitsData)
    downloadCSV(csvData, `chits_export_${new Date().toISOString().split('T')[0]}.csv`)
  }

  // Utility functions
  const convertToCSV = (data) => {
    const headers = ['ID', 'Chit Value', 'Location', 'State', 'Branch', 'Phone 1', 'Phone 2', 'Monthly Contribution', 'Chit Group', 'Duration', 'Created At']
    const rows = data.map(chit => [
      chit.id,
      chit.chit_value,
      chit.location,
      chit.state,
      chit.branch,
      chit.phone_number_1 || '',
      chit.phone_number_2 || '',
      chit.monthly_contribution || '',
      chit.chit_group || '',
      chit.duration_months || '',
      new Date(chit.created_at).toLocaleDateString()
    ])
    
    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
  }

  const downloadCSV = (csvData, filename) => {
    const blob = new Blob([csvData], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const showToast = (message, type) => {
    // Implementation from previous component
    const toast = document.createElement('div')
    toast.className = `fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-slide-in ${
      type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' : 
      'bg-gradient-to-r from-red-500 to-rose-600 text-white'
    }`
    
    toast.innerHTML = `
      <span class="text-xl">${type === 'success' ? '✅' : '❌'}</span>
      <span>${message}</span>
    `
    
    document.body.appendChild(toast)
    
    setTimeout(() => {
      toast.classList.add('animate-slide-out')
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, 3000)
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  // Get sort icon
  const getSortIcon = (column) => {
    if (filters.sortBy !== column) return '↕️'
    return filters.sortOrder === 'asc' ? '⬆️' : '⬇️'
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Chit Management</h1>
            <p className="text-blue-100 mt-1">Manage and monitor all chit funds</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.push('/admin/chits/create')}
              className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              New Chit
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="border-b border-gray-200 px-8 py-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search by location or group..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* State Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All States</option>
                {filterOptions.states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Branch Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
              <select
                value={filters.branch}
                onChange={(e) => handleFilterChange('branch', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Branches</option>
                {filterOptions.branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            {/* Value Range */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Value</label>
                <input
                  type="number"
                  value={filters.minValue}
                  onChange={(e) => handleFilterChange('minValue', e.target.value)}
                  placeholder="Min"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Value</label>
                <input
                  type="number"
                  value={filters.maxValue}
                  onChange={(e) => handleFilterChange('maxValue', e.target.value)}
                  placeholder="Max"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setFilters({
                state: '',
                branch: '',
                minValue: '',
                maxValue: '',
                search: '',
                sortBy: 'created_at',
                sortOrder: 'desc'
              })}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedChits.size > 0 && (
        <div className="bg-blue-50 border-b border-blue-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-blue-700 font-medium">
                {selectedChits.size} chit{selectedChits.size > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBulkExport}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Selected
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className="border-b border-gray-200 px-8 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Chits</p>
            <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(chits.reduce((sum, chit) => sum + chit.chit_value, 0))}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Avg. Monthly Contribution</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(
                chits.reduce((sum, chit) => sum + (chit.monthly_contribution || 0), 0) / 
                (chits.filter(c => c.monthly_contribution).length || 1)
              )}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Avg. Duration</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(
                chits.reduce((sum, chit) => sum + (chit.duration_months || 0), 0) / 
                (chits.filter(c => c.duration_months).length || 1)
              )} months
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading chits...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchChits}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : chits.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No chits found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your filters or create a new chit</p>
            <button
              onClick={() => router.push('/admin/chits/create')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create New Chit
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedChits.size === chits.length && chits.length > 0}
                    onChange={selectAllChits}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center">
                    ID {getSortIcon('id')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('chit_value')}
                >
                  <div className="flex items-center">
                    Amount {getSortIcon('chit_value')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('location')}
                >
                  <div className="flex items-center">
                    Location {getSortIcon('location')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('state')}
                >
                  <div className="flex items-center">
                    State {getSortIcon('state')}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('branch')}
                >
                  <div className="flex items-center">
                    Branch {getSortIcon('branch')}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monthly
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('created_at')}
                >
                  <div className="flex items-center">
                    Created {getSortIcon('created_at')}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {chits.map((chit) => (
                <tr 
                  key={chit.id} 
                  className={`hover:bg-gray-50 ${selectedChits.has(chit.id) ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedChits.has(chit.id)}
                      onChange={() => toggleChitSelection(chit.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      #{chit.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{formatCurrency(chit.chit_value)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{chit.location}</div>
                    {chit.chit_group && (
                      <div className="text-sm text-gray-500">{chit.chit_group}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {chit.state}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{chit.branch}</div>
                  </td>
                  <td className="px-6 py-4">
                    {chit.monthly_contribution ? (
                      <span className="text-green-600 font-medium">
                        {formatCurrency(chit.monthly_contribution)}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {chit.duration_months ? (
                      <span className="text-gray-600">
                        {chit.duration_months} months
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(chit.created_at).toLocaleDateString()}
                    <div className="text-xs text-gray-400">
                      {new Date(chit.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(chit)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => confirmDelete(chit)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <button
                        onClick={() => router.push(`/admin/chits/${chit.id}`)}
                        className="text-gray-600 hover:text-gray-800 p-1"
                        title="View Details"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {chits.length > 0 && (
        <div className="border-t border-gray-200 px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="text-sm text-gray-700 mb-4 md:mb-0">
              Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span>{' '}
              of <span className="font-medium">{pagination.total}</span> results
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1
                } else if (pagination.page <= 3) {
                  pageNum = i + 1
                } else if (pagination.page >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i
                } else {
                  pageNum = pagination.page - 2 + i
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 rounded-lg ${
                      pagination.page === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>

            <div className="mt-4 md:mt-0">
              <select
                value={pagination.limit}
                onChange={(e) => setPagination(prev => ({ ...prev, limit: parseInt(e.target.value), page: 1 }))}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="10">10 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingChit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Chit #{editingChit.id}</h2>
                <button
                  onClick={() => setEditingChit(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chit Value</label>
                    <input
                      type="number"
                      value={editingChit.chit_value}
                      onChange={(e) => setEditingChit({...editingChit, chit_value: parseFloat(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={editingChit.location}
                      onChange={(e) => setEditingChit({...editingChit, location: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      value={editingChit.state}
                      onChange={(e) => setEditingChit({...editingChit, state: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                    <input
                      type="text"
                      value={editingChit.branch}
                      onChange={(e) => setEditingChit({...editingChit, branch: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setEditingChit(null)}
                    className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && chitToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Delete Chit?</h2>
              <p className="text-gray-600 text-center mb-8">
                Are you sure you want to delete chit #{chitToDelete.id} from {chitToDelete.location}?
                This action cannot be undone.
              </p>
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false)
                    setChitToDelete(null)
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700"
                >
                  Delete Chit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}