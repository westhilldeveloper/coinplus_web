// components/BranchLocator.js
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Track if Google Maps script is already loaded globally
let googleMapsLoaded = false;
let googleMapsLoading = false;
let googleMapsLoadCallbacks = [];

// Google Maps component
const BranchMap = ({ latitude, longitude, branchName, address }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const initializeMap = () => {
      // Check if Google Maps is loaded
      if (!window.google || !window.google.maps) {
        console.error('Google Maps not loaded');
        return;
      }

      const mapOptions = {
        center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            "featureType": "poi.business",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "transit",
            "elementType": "labels.icon",
            "stylers": [{ "visibility": "off" }]
          }
        ]
      };

      // Create map
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);

      // Create marker
      markerRef.current = new window.google.maps.Marker({
        position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        map: mapInstanceRef.current,
        title: branchName,
        animation: window.google.maps.Animation.DROP,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="15" fill="#2563eb" opacity="0.9"/>
              <circle cx="20" cy="20" r="6" fill="white"/>
              <circle cx="20" cy="20" r="3" fill="#2563eb"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 40)
        }
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; color: #1e3a8a; font-weight: 600; font-size: 14px;">${branchName}</h3>
            <p style="margin: 0; color: #4b5563; font-size: 13px; line-height: 1.4;">${address}</p>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
              <a href="https://www.google.com/maps?q=${latitude},${longitude}" 
                 target="_blank" 
                 style="color: #2563eb; text-decoration: none; font-size: 13px; font-weight: 500;">
                Open in Google Maps →
              </a>
            </div>
          </div>
        `,
      });

      // Open info window by default
      infoWindow.open(mapInstanceRef.current, markerRef.current);
      setMapReady(true);
    };

    // Function to load Google Maps script
    const loadGoogleMaps = () => {
      return new Promise((resolve, reject) => {
        if (googleMapsLoaded) {
          resolve();
          return;
        }

        if (window.google && window.google.maps) {
          googleMapsLoaded = true;
          resolve();
          return;
        }

        // Add to callbacks if already loading
        if (googleMapsLoading) {
          googleMapsLoadCallbacks.push(resolve);
          return;
        }

        googleMapsLoading = true;

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          googleMapsLoaded = true;
          googleMapsLoading = false;
          resolve();
          // Resolve all waiting callbacks
          googleMapsLoadCallbacks.forEach(cb => cb());
          googleMapsLoadCallbacks = [];
        };
        
        script.onerror = (error) => {
          googleMapsLoading = false;
          reject(error);
        };

        document.head.appendChild(script);
      });
    };

    // Load and initialize
    loadGoogleMaps()
      .then(() => {
        if (mapRef.current) {
          initializeMap();
        }
      })
      .catch(error => {
        console.error('Failed to load Google Maps:', error);
      });

    // Cleanup
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (mapInstanceRef.current) {
        // No explicit destroy needed
      }
    };
  }, [latitude, longitude, branchName, address]);

  if (!latitude || !longitude) {
    return (
      <div className="bg-gray-100 h-48 rounded-lg flex flex-col items-center justify-center">
        <div className="text-gray-400 mb-2">📍</div>
        <p className="text-gray-500 text-sm">No location coordinates available</p>
      </div>
    );
  }

  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="w-full h-48 rounded-lg overflow-hidden border border-gray-300"
      />
      {!mapReady && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      <div className="absolute bottom-2 right-2 flex gap-1">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-1.5 rounded shadow-sm hover:shadow transition-shadow"
          title="Get Directions"
        >
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-1.5 rounded shadow-sm hover:shadow transition-shadow"
          title="Open in Google Maps"
        >
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

// Simple static map fallback (no JavaScript required)
const SimpleStaticMap = ({ latitude, longitude, branchName }) => {
  if (!latitude || !longitude) {
    return (
      <div className="bg-gray-100 h-48 rounded-lg flex flex-col items-center justify-center">
        <div className="text-gray-400 mb-2">📍</div>
        <p className="text-gray-500 text-sm">No location coordinates available</p>
      </div>
    );
  }

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&markers=color:blue%7C${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <div className="relative group">
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <img
          src={staticMapUrl}
          alt={`${branchName} location`}
          className="w-full h-48 rounded-lg object-cover border border-gray-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&markers=color:blue%7C${latitude},${longitude}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg group-hover:from-black/20 transition-all" />
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
          Click to open in Google Maps
        </div>
      </a>
    </div>
  );
};

// Alternative: Load script at page level instead of component level
export const loadGoogleMapsScript = () => {
  if (typeof window === 'undefined') return Promise.resolve();
  
  return new Promise((resolve, reject) => {
    if (googleMapsLoaded) {
      resolve();
      return;
    }

    if (window.google && window.google.maps) {
      googleMapsLoaded = true;
      resolve();
      return;
    }

    if (googleMapsLoading) {
      googleMapsLoadCallbacks.push(resolve);
      return;
    }

    googleMapsLoading = true;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      googleMapsLoaded = true;
      googleMapsLoading = false;
      resolve();
      googleMapsLoadCallbacks.forEach(cb => cb());
      googleMapsLoadCallbacks = [];
    };
    
    script.onerror = reject;

    document.head.appendChild(script);
  });
};

// Main BranchLocator component
const BranchLocator = () => {
   const searchParams = useSearchParams();
  const router = useRouter();

  const urlState = searchParams.get('state');
  const urlBranchName = searchParams.get('branch');
  const urlBranchId = searchParams.get('branchId');

  console.log("url state",urlState, urlBranchName, urlBranchId)

  const [branchData, setBranchData] = useState({});
  const [selectedState, setSelectedState] = useState(urlState ||'');
  const [selectedBranch, setSelectedBranch] = useState(urlBranchName || null);
  const [loading, setLoading] = useState(true);
  const [useInteractiveMap, setUseInteractiveMap] = useState(true);
  const [mapsScriptLoaded, setMapsScriptLoaded] = useState(false);

 

  // Pre-load Google Maps script when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadGoogleMapsScript().then(() => {
        setMapsScriptLoaded(true);
      }).catch(console.error);
    }
  }, []);

  useEffect(() => {
  const fetchBranches = async () => {
    try {
      const response = await fetch('/api/admin/branches');
      const data = await response.json();

      const groupedData = data.reduce((acc, branch) => {
        if (!acc[branch.state]) {
          acc[branch.state] = [];
        }
        acc[branch.state].push(branch);
        return acc;
      }, {});

      setBranchData(groupedData);

      // ✅ CASE 1: URL params exist → respect them
      if (urlState && groupedData[urlState]) {
        setSelectedState(urlState);

        // Find branch by name OR id
        const matchedBranch =
          groupedData[urlState].find(
            (b) =>
              b.name === urlBranchName ||
              String(b.id) === String(urlBranchId)
          );

        if (matchedBranch) {
          setSelectedBranch(matchedBranch);
        } else {
          // fallback to first branch of that state
          setSelectedBranch(groupedData[urlState][0]);
        }

        return;
      }

      // ✅ CASE 2: No params → set defaults
      const firstState = Object.keys(groupedData)[0];
      if (firstState) {
        setSelectedState(firstState);
        setSelectedBranch(groupedData[firstState][0]);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchBranches();
}, [urlState, urlBranchName, urlBranchId]);

  const handleStateSelect = (state) => {
    setSelectedState(state);
    if (branchData[state] && branchData[state].length > 0) {
      setSelectedBranch(branchData[state][0]);
    }
  };

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
  };

  if (loading) {
    return (
      <div className="w-full mx-auto p-8 text-center">
        <div className="text-lg">Loading branches...</div>
      </div>
    );
  }

  if (Object.keys(branchData).length === 0) {
    return (
      <div className="w-full mx-auto p-8 text-center">
        <div className="text-lg text-gray-500">No branches found</div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-8 font-sans">
      <h1 className="text-lg md:text-xl font-bold text-primary mb-8">Branches</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <h2 className="text-md md:text-lg font-semibold text-gray-700 mb-4">Select State</h2>
          <div className="flex flex-wrap lg:flex-col text-sm gap-2">
            {Object.keys(branchData).map((state) => (
              <button
                key={state}
                onClick={() => handleStateSelect(state)}
                className={`px-4 py-3 rounded-lg text-left transition-colors ${
                  selectedState === state
                    ? 'bg-primary text-white font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:w-1/3">
          <h2 className="text-md md:text-lg font-semibold text-gray-700 mb-4">
            Collection Centres in {selectedState}
          </h2>
          <div className="space-y-2 text-sm max-h-[400px] overflow-y-auto pr-2">
            {branchData[selectedState]?.map((branch) => (
              <button
                key={branch.id}
                onClick={() => handleBranchSelect(branch)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedBranch?.id === branch.id
                    ? 'bg-primary/20 border-l-4 border-primary'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span className="font-medium text-gray-800">{branch.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:w-2/4">
          <h2 className="text-md md:text-lg font-semibold text-gray-700 mb-4">Centres Details</h2>
          {selectedBranch ? (
            <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-primary mb-4">
                {selectedBranch.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Address</h4>
                  <p className="text-gray-600 text-sm">
                    {selectedBranch.address},<br />
                    {selectedBranch.city}, {selectedBranch.state}
                  </p>
                  <p className="text-gray-600 mt-1">
                    <span className="font-medium text-sm">Pin:</span> {selectedBranch.pincode}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 text-sm mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span>{' '}
                      <a
                        href={`mailto:${selectedBranch.email}`}
                        className="text-primary/50 hover:text-primary hover:underline transition-colors"
                      >
                        {selectedBranch.email}
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Phone 1:</span>{' '}
                      <a
                        href={`tel:${selectedBranch.phone1}`}
                        className="text-primary/50 hover:text-primary hover:underline transition-colors"
                      >
                        {selectedBranch.phone1}
                      </a>
                    </p>
                    {selectedBranch.phone2 && (
                      <p className="text-gray-600">
                        <span className="font-medium">Phone 2:</span>{' '}
                        <a
                          href={`tel:${selectedBranch.phone2}`}
                          className="text-primary/60 hover:text-primary hover:underline transition-colors"
                        >
                          {selectedBranch.phone2}
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                {/* Map Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-700">Location</h4>
                    {selectedBranch.latitude && selectedBranch.longitude && (
                      <button
                        onClick={() => setUseInteractiveMap(!useInteractiveMap)}
                        className="text-xs text-primary hover:text-primary-dark"
                      >
                        {useInteractiveMap ? 'Switch to Static Map' : 'Switch to Interactive Map'}
                      </button>
                    )}
                  </div>
                  
                  {selectedBranch.latitude && selectedBranch.longitude ? (
                    useInteractiveMap ? (
                      <BranchMap
                        latitude={selectedBranch.latitude}
                        longitude={selectedBranch.longitude}
                        branchName={selectedBranch.name}
                        address={`${selectedBranch.address}, ${selectedBranch.city}`}
                      />
                    ) : (
                      <SimpleStaticMap
                        latitude={selectedBranch.latitude}
                        longitude={selectedBranch.longitude}
                        branchName={selectedBranch.name}
                      />
                    )
                  ) : (
                    <div className="bg-gray-100 h-48 rounded-lg flex flex-col items-center justify-center">
                      <div className="text-gray-400 mb-2">📍</div>
                      <p className="text-gray-500 text-sm">No location coordinates available</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Latitude/Longitude not provided for this Centre
                      </p>
                    </div>
                  )}
                  
                  {selectedBranch.latitude && selectedBranch.longitude && (
                    <div className="mt-2 text-xs text-gray-500 flex justify-between">
                      <span>Coordinates: {selectedBranch.latitude}, {selectedBranch.longitude}</span>
                      <a
                        href={`https://www.google.com/maps?q=${selectedBranch.latitude},${selectedBranch.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Open in new tab →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-300 text-center">
              <p className="text-gray-500">Select a centre to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BranchLocator;