"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const BranchLocator = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [states, setStates] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingBranches, setLoadingBranches] = useState(false);
  const [submitting, setSubmitting] = useState(false);

   const router = useRouter();

  // Fetch states from database
  const fetchStates = async () => {
    setLoadingStates(true);
    try {
      console.log("Fetching states...");
      const response = await fetch('/api/chits/states');
      console.log("States response status:", response.status);
      
      if (!response.ok) {
        console.error("States fetch failed:", response.status, response.statusText);
        throw new Error('Failed to fetch states');
      }
      
      const data = await response.json();
      console.log("States API response:", data);
      
      if (data.success) {
        const statesList = data.states.map(state => ({
          code: state.state,
          name: state.label || state.state
        }));
        console.log("Processed states:", statesList);
        setStates(statesList);
      } else {
        console.error("States API success is false:", data);
      }
    } catch (error) {
      console.error('Error fetching states:', error);
    } finally {
      setLoadingStates(false);
    }
  };

  // Fetch branches for selected state
  const fetchBranchesByState = useCallback(async (stateCode) => {
    console.log('fetchBranchesByState called with stateCode:', stateCode);
    
    if (!stateCode) {
      console.log('No state code provided, clearing branches');
      setBranches([]);
      return;
    }

    setLoadingBranches(true);
    setSelectedBranch(""); // Reset branch selection when state changes
    
    try {
      const url = `/api/branches?state=${encodeURIComponent(stateCode)}`;
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url);
      console.log('Branches response status:', response.status);
      console.log('Branches response headers:', [...response.headers.entries()]);
      
      if (!response.ok) {
        console.error('Branches fetch failed:', response.status, response.statusText);
        throw new Error(`Failed to fetch branches: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Branches API response:', result);

      console.log('Response success:', result.success);
      console.log('Response data type:', typeof result.data);
      console.log('Is data array?', Array.isArray(result.data));
      console.log('Data length:', result.data?.length || 0);
      
      // Check if the response has the expected structure
      if (result.success && Array.isArray(result.data)) {
        console.log('Setting branches:', result.data);
        setBranches(result.data);
      } else if (Array.isArray(result)) {
        // Fallback: if API returns array directly
        console.log('Setting branches (direct array):', result);
        setBranches(result);
      } else {
        console.error('Unexpected API response structure:', result);
        setBranches([]);
      }
      
    } catch (error) {
      console.error('Error fetching branches:', error);
      console.error('Error details:', error.message);
      setBranches([]);
    } finally {
      setLoadingBranches(false);
      console.log('Loading branches completed');
    }
  }, []);

  // Initial data fetch - only fetch states
  useEffect(() => {
    console.log("Component mounted, fetching states...");
    fetchStates();
  }, []);

  // Fetch branches when state changes
  useEffect(() => {
    console.log("selectedState changed:", selectedState);
    console.log("Current states array:", states);
    
    if (selectedState) {
      const stateObj = states.find(s => s.code === selectedState);
      console.log("Selected state object:", stateObj);
    }
    
    fetchBranchesByState(selectedState);
  }, [selectedState, fetchBranchesByState]);

  const handleStateChange = (stateCode) => {
    setSelectedState(stateCode);
    setSelectedBranch("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedState || !selectedBranch) {
      alert("Please select both state and branch");
      return;
    }

    setSubmitting(true);
    try {
      // Find selected branch details
      const selectedBranchObj = branches.find(b => b.id === parseInt(selectedBranch));
      
      // Navigate to chitplans page with query parameters
      if (selectedBranchObj) {
        router.push(`/branches?state=${selectedState}&branch=${selectedBranchObj.name}&branchId=${selectedBranch}`);
      } else {
        router.push(`/branches?state=${selectedState}&branch=${selectedBranch}`);
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative py-8 md:py-10 px-4 mx-8 sm:px-6 shadow-md">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/celebration.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-dark to-primary/70"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Section */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <img 
                src="/images/location.gif" 
                alt="Location Pin"
                className="w-12 h-12 rounded-full object-contain"
              />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
              Check the desired chit at your nearest branch
            </h2>
            
           
          </div>

          {/* Right Section - Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-transperant backdrop-blur-sm rounded-2xl  ">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* State Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select your State
                  </label>
                  <div className="relative">
                    <select
                      value={selectedState}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-3/4 px-4 py-3 pr-10 bg-gray-50  rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                      required
                      disabled={loadingStates}
                    >
                      <option value="">{loadingStates ? "Loading states..." : "Choose a state"}</option>
                      {states.map((state) => (
                        <option key={state.code} value={state.code}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      {loadingStates ? (
                        <Loader2 className="text-gray-400 animate-spin size-4" />
                      ) : (
                        <ChevronDown className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Branch Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select your Branch
                  </label>
                  <div className="relative">
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      disabled={!selectedState || loadingBranches}
                      className={`w-3/4 px-4 py-3 pr-10 rounded-md  transition-all appearance-none ${
                        !selectedState
                          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-50 border-primary/20 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                      }`}
                      required
                    >
                      <option value="">
                        {loadingBranches ? "Loading branches..." : 
                         !selectedState ? "Select a state first" : 
                         branches.length === 0 ? "No branches available in this state" : 
                         "Choose a branch"}
                      </option>
                      {branches?.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      {loadingBranches ? (
                        <Loader2 className="text-gray-400 animate-spin size-4" />
                      ) : (
                        <ChevronDown className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting || !selectedState || !selectedBranch}
                  className={`w-3/4 py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 ${
                    submitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Submit
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchLocator;