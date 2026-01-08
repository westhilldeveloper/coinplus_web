"use client";
import { useState, useEffect } from "react";
import { Home, GraduationCap, Heart, Briefcase, Landmark, Timer, ChevronDown, MapPin, Asterisk, Loader2 } from "lucide-react";

const TABS = [
  { key: "education", label: "Education Plan", icon: <GraduationCap size={20} /> },
  { key: "home", label: "Home Plan", icon: <Home size={20} /> },
  { key: "wedding", label: "Wedding Plan", icon: <Heart size={20} /> },
  { key: "short", label: "Short term Plan", icon: <Timer size={20} /> },
  { key: "retirement", label: "Retirement Plan", icon: <Landmark size={20} /> },
  { key: "business", label: "Business Plan", icon: <Briefcase size={20} /> },
  { key: "all", label: "All Plans", icon: <Home size={20} /> },
];

export default function   PlansSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedState, setSelectedState] = useState("");
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [chits, setChits] = useState([]);
  const [filteredChits, setFilteredChits] = useState([]);


  // Fetch states from database
  const fetchStates = async () => {
    try {
      const response = await fetch('/api/chits/states');
      if (!response.ok) throw new Error('Failed to fetch states');
      const data = await response.json();
      
      if (data.success) {
        setStates(data.states);
      }
    } catch (error) {
      console.error('Error fetching states:', error);
    } finally {
      fetchChits();
    }
  };

  // Fetch chits data with filters - MODIFIED TO USE branch PARAM
  const fetchChits = async () => {
  setLoading(true);
  try {
    // Build query parameters
    const params = new URLSearchParams();
    params.append('limit', '100'); // Fetch more items
    console.log("params====>",params)
    // Add state filter directly (since chits have state field)
    if (selectedState && selectedState !== "") {
      params.append('state', selectedState);
    }

    const response = await fetch(`/api/chits/all?${selectedState}`);
    if (!response.ok) throw new Error('Failed to fetch chits');
    const data = await response.json();
    
    if (data.success) {
      setChits(data.data);
      setFilteredChits(data.data);
    }
  } catch (error) {
    console.error('Error fetching chits:', error);
  } finally {
    setLoading(false);
  }
};

  // Initial data fetch
  useEffect(() => {
    fetchStates();
  }, []);

  // Fetch chits when state changes
  useEffect(() => {
    fetchChits();
  }, [selectedState]);

  // Filter chits based on active tab
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredChits(chits);
    } else {
      const filtered = chits.filter(chit => {
        const chitGroup = chit.chit_group?.toLowerCase() || '';
        const chitValue = chit.chit_value;
        
        switch (activeTab) {
          case "education":
            return chitGroup.includes('education') || chitGroup.includes('edu') || 
                   (chitValue >= 1000000 && chitValue <= 5000000);
          case "home":
            return chitGroup.includes('home') || chitGroup.includes('family') ||
                   (chitValue >= 500000 && chitValue <= 10000000);
          case "wedding":
            return chitGroup.includes('wedding') || chitGroup.includes('marriage') ||
                   (chitValue >= 300000 && chitValue <= 2000000);
          case "short":
            return chitGroup.includes('short') || chitGroup.includes('term') ||
                   (chitValue <= 500000 && (chit.duration_months || 0) <= 12);
          case "retirement":
            return chitGroup.includes('retirement') || chitGroup.includes('pension') ||
                   (chitValue >= 1000000 && chitValue <= 5000000);
          case "business":
            return chitGroup.includes('business') || chitGroup.includes('enterprise') ||
                   (chitValue >= 2000000);
          default:
            return true;
        }
      });
      setFilteredChits(filtered);
    }
  }, [activeTab, chits]);

  // Get display amount based on chit value
  const getDisplayAmount = (chit) => {
    return chit.chit_value || 0;
  };

  // Calculate EMI (this is a simplified calculation)
  const calculateEMI = (chit) => {
    const amount = chit.chit_value || 0;
    const months = chit.duration_months || 20;
    
    return Math.round(amount / months);
  };

  // Get the state label
 
  const getStateLabel = (stateCode) => { 
  
    if (!stateCode) return "All Branches";
    const state = states.find(s => s.state === stateCode);
      
    return state ? state.label : stateCode;
  };

 const getInstalmentRange = (total, duration, term) => {
  if (!total) return "-";
  console.log (total, duration, term)
  //instalments
  const monthlyInstalment = total/duration;
  // Calculate 40% of the total
  const fortyPercent = duration> 25 ? total * 0.25 : total * 0.20;
  const weeklyPercent = total * 0.20;
  
  // Subtract 3500 from the 40% amount
  const instalment = term == 'weeks' ? weeklyPercent/duration : fortyPercent / duration  
  const divident = monthlyInstalment - instalment
  
  return divident;
};

  // Get state from chit (try branch first, then chit state)
  const getChitState = (chit) => {
    // Try to get state from branch if available
    if (chit.branch && chit.branch.state) {
      return chit.branch.state;
    }
    // Fall back to chit state field
    return chit.state;
  };

  return (
    <div className="w-full mt-4 sm:mt-6 lg:mt-8 px-0 sm:px-2 md:px-2 lg:px-4 xl:px-8 ">
      {/* Header with Title and State Selector */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6 gap-4 sm:gap-6">
        <div className="lg:w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Discover Your <span className="text-primary">Ideal CoinPlus Plan</span>
          </h1>
          <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg max-w-2xl">
           Browse goal-oriented plans and instantly see which ones are available in your location.
            
          </p>
        </div>
        
        {/* Dynamic State Dropdown */}
        <div className="relative w-full lg:w-auto">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-2">
            <MapPin size={14} className="sm:size-4" />
            <span>Filter by State</span>
          </div>
          <div className="relative group">
            <select
              value={selectedState}
              onChange={(e) => {
                console.log("Selected state:", e.target.value);
                setSelectedState(e.target.value);
              }}
              disabled={loading}
              className="appearance-none w-full lg:w-56 xl:w-64 px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 cursor-pointer hover:border-gray-300 text-gray-800 font-medium text-sm sm:text-base shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <option value="">Loading...</option>
              ) : (
                <>
                  <option value="">All States</option>
                  {states.map((state) => (
                    <option key={state.state} value={state.state}>
                      {state.label} ({state.count || 0})
                    </option>
                  ))}
                </>
              )}
            </select>
            <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              {loading ? (
                <Loader2 className="text-gray-400 animate-spin size-4 sm:size-5" />
              ) : (
                <ChevronDown className="text-gray-400 group-hover:text-primary transition-colors size-4 sm:size-5" />
              )}
            </div>
          </div>
          <div className="mt-1.5 sm:mt-2 text-xs text-gray-500">
            {selectedState ? (
              <>
                Showing plans available in{" "}
                <span className="font-semibold text-primary">
                  {getStateLabel(selectedState)}
                </span>
                {loading && " (loading...)"}
              </>
            ) : (
              <>
                Showing plans from{" "}
                <span className="font-semibold text-primary">All States</span>
                {loading && " (loading...)"}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="relative">
        <div className="flex overflow-x-auto pb-3 sm:pb-4 gap-1.5 sm:gap-2 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-6 rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 font-medium border transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-primary/10 text-primary border-primary shadow-md sm:shadow-lg shadow-primary/20 transform scale-[1.02]"
                  : "bg-gradient-to-br from-primary via-purple-500 to-purple-800 text-white hover:text-primary border-gray-200 hover:bg-gray-100 hover:border-gray-300"
              }`}
            >
              <div className={activeTab === tab.key ? "text-white" : "text-white"}>
                {tab.icon}
              </div>
              <span className="text-xs sm:text-sm md:text-base">{tab.label}</span>
            </button>
          ))}
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute right-0 top-0 bottom-3 sm:bottom-4 w-6 sm:w-8 bg-gradient-to-l from-white to-transparent pointer-events-none lg:hidden"></div>
      </div>

      {/* Plans Section */}
      <div className="mt-6 sm:mt-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
          Best Deals{" "}
          {selectedState ? (
            <>
              in{" "}
              <span className="text-primary">
                {getStateLabel(selectedState)}
              </span>
            </>
          ) : (
            <span className="text-primary">from All States</span>
          )}
        </h2>

        {loading ? (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Loader2 className="text-primary animate-spin size-8" />
            </div>
            <p className="text-gray-600">Loading plans...</p>
          </div>
        ) : filteredChits.length > 0 ? (
          <div className="relative rounded-xl  h-[450px] max-h-[600px] overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/grpimg.jpg')] bg-cover bg-center z-0"></div>
            <div className="absolute inset-0 bg-black/80 z-0"></div>
            <div className="relative z-10 h-full overflow-y-auto p-6">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative z-10">
              {filteredChits.map((chit) => (
                <div
                  key={chit.id}
                  className="border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-white group hover:border-primary/20"
                >
                  {/* Plan Header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div>
                      <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-1.5 sm:mb-2">
                        {chit.chit_group?.toUpperCase() || activeTab.toUpperCase()}
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                        ₹ {getDisplayAmount(chit).toLocaleString("en-IN")}
                      </h3>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <span className="text-primary font-bold text-sm sm:text-base">
                        {chit.duration_value || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Plan Details */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm sm:text-base">Monthly instalment</span>
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">
                        ₹ {chit.monthly_contribution ? chit.monthly_contribution.toLocaleString("en-IN") : calculateEMI(chit).toLocaleString("en-IN")}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm sm:text-base">Duration</span>
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">
                         {chit.duration_value && chit.duration_unit ? (
    <span className="text-green-600">
      {chit.duration_value}<span className="text-red-500"> {chit.duration_unit}</span>
    </span>
  ) : (
    <span className="text-gray-400">—</span>
  )}
                      </span>
                    </div>
                    
                    <div className="flex items-start gap-2 py-1.5 sm:py-2">
                      <Asterisk size={12} className="text-red-400 mt-0.5 sm:mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-600 text-xs sm:text-sm">Instalment Range from</p>
                        <span className="font-medium text-gray-900 text-xs sm:text-sm leading-tight">
                         ₹ {getInstalmentRange(chit.chit_value,chit.duration_value,chit.duration_unit)}
                        </span>
                        {chit.branch && (
                          <p className="text-xs text-gray-500">Branch: {chit.branch}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => window.open("https://subscriber.coinplus.co.in", "_blank")}
                    className="w-full bg-gradient-to-r from-primary to-primary/90 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Invest Now
                  </button>
                </div>
              ))}
            </div>
            </div>
          </div>
        ) : (
          <div className="col-span-full text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <MapPin className="text-gray-400 size-5 sm:size-6" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1.5 sm:mb-2">No Plans Available</h3>
            <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto px-4">
              {selectedState 
                ? `Currently, there are no plans available in ${getStateLabel(selectedState)} for the selected category. Try selecting a different state or category.`
                : 'Currently, there are no plans available for the selected category.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}