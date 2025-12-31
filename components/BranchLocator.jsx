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
    <div className="relative py-8 md:py-10 px-4 mx-0 sm:px-5 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] rounded-3xl border-[6px] border-double border-primary/50 bg-gradient-to-br from-primary/5 via-dark/5 to-primary/10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/celebration.jpg')] bg-cover bg-center opacity-10 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-dark/40 to-primary/60"></div>
        {/* Animated floating shapes */}
        
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/10 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary/15 rounded-lg animate-spin"></div>
      </div>

      {/* Blinking neon border effect */}
      <div className="absolute inset-0 border-[3px] border-primary/30 rounded-3xl animate-pulse"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10">
          
          {/* Left Section - EXTREME STYLING */}
          <div className="w-full lg:w-1/2">
            {/* <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary via-yellow-400 to-red-500 rounded-full mb-4 p-2 animate-pulse shadow-[0_0_30px_rgba(255,0,0,0.5)]">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <img 
                  src="/images/location.gif" 
                  alt="Location Pin"
                  className="w-12 h-12 rounded-full object-contain animate-spin-slow"
                />
              </div>
            </div> */}
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-red-500 mb-6 leading-tight tracking-wider animate-bounce">
              FIND YOUR ULTIMATE CHIT DESTINATION!
            </h2>
            
            <p className="text-md font-bold text-white/90 bg-black/40 p-4 rounded-xl border-l-[8px] border-primary mb-8 shadow-lg backdrop-blur-sm">
               DISCOVER THE PERFECT CHIT PLAN AT YOUR NEAREST BRANCH! 
            </p>
            
          </div>

          {/* Right Section - Form with EXTREME styling */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gradient-to-br from-black/60 to-primary/20 backdrop-blur-xl rounded-3xl p-8 border-[3px] border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.2)] transform hover:scale-[1.02] transition-all duration-500">
              
              
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* State Selection - EXTREME */}
                <div className="transform hover:scale-[1.02] transition-all duration-300">
                  <label className="block text-sm font-extrabold text-white mb-3 tracking-wider">
                     SELECT YOUR STATE 
                  </label>
                  <div className="relative group">
                    <select
                      value={selectedState}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full px-4 py-4 pr-12 bg-gradient-to-r from-gray-900 to-black text-white text-sm font-bold rounded-2xl border-[3px] border-primary focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/50 outline-none transition-all appearance-none shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_primary]"
                      required
                      disabled={loadingStates}
                    >
                      <option value="" className="bg-black text-gray-400">
                        {loadingStates ? "🔄 LOADING STATES..." : "CHOOSE YOUR STATE"}
                      </option>
                      {states.map((state) => (
                        <option key={state.code} value={state.code} className="bg-black text-white py-2">
                           {state.name.toUpperCase()} 
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      {loadingStates ? (
                        <Loader2 className="text-yellow-400 animate-spin size-8" />
                      ) : (
                        <ChevronDown className="text-yellow-400 size-8 animate-bounce" />
                      )}
                    </div>
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                {/* Branch Selection - EXTREME */}
                <div className="transform hover:scale-[1.02] transition-all duration-300">
  <label className="block text-sm font-extrabold text-white mb-3 tracking-wider">
    🏢 SELECT YOUR BRANCH 
  </label>
  <div className="relative group">
    <select
      value={selectedBranch}
      onChange={(e) => setSelectedBranch(e.target.value)}
      disabled={!selectedState || loadingBranches}
      className={`w-full px-4 py-4 pr-12 text-sm font-bold rounded-2xl border-[3px] transition-all appearance-none shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] ${
        !selectedState
          ? "bg-gray-800 border-gray-600 text-gray-500 cursor-not-allowed"
          : "bg-gradient-to-r from-gray-900 to-black text-white border-primary hover:border-yellow-400 hover:shadow-[0_0_30px_primary] focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/50 outline-none"
      }`}
      required
      style={{
        height: '56px', // Fixed height for the select
      }}
    >
      <option value="" className="bg-black py-3">
        {loadingBranches ? "🔄 LOADING BRANCHES..." : 
         !selectedState ? "SELECT STATE FIRST" : 
         branches.length === 0 ? "❌ NO BRANCHES AVAILABLE" : 
         "CHOOSE YOUR BRANCH"}
      </option>
      {branches?.map((branch) => (
        <option 
          key={branch.id} 
          value={branch.id} 
          className="bg-black text-white py-2 truncate"
          title={branch.name.toUpperCase()} // Tooltip for full text
          style={{
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          🏦 {branch.name.length > 25 ? branch.name.substring(0, 22).toUpperCase() + '...' : branch.name.toUpperCase()}
        </option>
      ))}
    </select>
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
      {loadingBranches ? (
        <Loader2 className="text-yellow-400 animate-spin size-8" />
      ) : (
        <ChevronDown className="text-yellow-400 size-8 animate-bounce" />
      )}
    </div>
    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </div>
</div>

                {/* Submit Button - EXTREME */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={submitting || !selectedState || !selectedBranch}
                    className={`w-full py-5 text-lg font-black rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 shadow-[0_0_40px_rgba(255,0,0,0.5)] hover:shadow-[0_0_60px_rgba(255,100,0,0.8)] active:scale-95 transform ${
                      submitting || !selectedState || !selectedBranch
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-70'
                        : 'bg-gradient-to-r from-primary via-red-500 to-yellow-400 text-white hover:scale-105 hover:rotate-1'
                    }`}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <span className="animate-pulse">🚀 SEARCHING BRANCHES...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-8 h-8 animate-bounce" />
                        <span className="tracking-widest">FIND MY BRANCH NOW!</span>
                      </>
                    )}
                  </button>
                  
                  {/* Animated decoration */}
                  <div className="mt-6 flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i}
                        className="w-3 h-3 bg-gradient-to-r from-primary to-yellow-400 rounded-full animate-ping"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                  
                 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchLocator;