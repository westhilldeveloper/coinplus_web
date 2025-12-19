(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/contactus/BranchLocator.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/BranchLocator.js
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "loadGoogleMapsScript",
    ()=>loadGoogleMapsScript
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
// Track if Google Maps script is already loaded globally
let googleMapsLoaded = false;
let googleMapsLoading = false;
let googleMapsLoadCallbacks = [];
// Google Maps component
const BranchMap = ({ latitude, longitude, branchName, address })=>{
    _s();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapInstanceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [mapReady, setMapReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BranchMap.useEffect": ()=>{
            if (!latitude || !longitude) return;
            const initializeMap = {
                "BranchMap.useEffect.initializeMap": ()=>{
                    // Check if Google Maps is loaded
                    if (!window.google || !window.google.maps) {
                        console.error('Google Maps not loaded');
                        return;
                    }
                    const mapOptions = {
                        center: {
                            lat: parseFloat(latitude),
                            lng: parseFloat(longitude)
                        },
                        zoom: 15,
                        mapTypeControl: false,
                        streetViewControl: true,
                        fullscreenControl: true,
                        zoomControl: true,
                        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
                        styles: [
                            {
                                "featureType": "poi.business",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit",
                                "elementType": "labels.icon",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            }
                        ]
                    };
                    // Create map
                    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
                    // Create marker
                    markerRef.current = new window.google.maps.Marker({
                        position: {
                            lat: parseFloat(latitude),
                            lng: parseFloat(longitude)
                        },
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
        `
                    });
                    // Open info window by default
                    infoWindow.open(mapInstanceRef.current, markerRef.current);
                    setMapReady(true);
                }
            }["BranchMap.useEffect.initializeMap"];
            // Function to load Google Maps script
            const loadGoogleMaps = {
                "BranchMap.useEffect.loadGoogleMaps": ()=>{
                    return new Promise({
                        "BranchMap.useEffect.loadGoogleMaps": (resolve, reject)=>{
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
                            script.src = `https://maps.googleapis.com/maps/api/js?key=${"TURBOPACK compile-time value", "AIzaSyA6DfhegFXqMkTjJIenP7FPjCvQ8bGOYtM"}`;
                            script.async = true;
                            script.defer = true;
                            script.onload = ({
                                "BranchMap.useEffect.loadGoogleMaps": ()=>{
                                    googleMapsLoaded = true;
                                    googleMapsLoading = false;
                                    resolve();
                                    // Resolve all waiting callbacks
                                    googleMapsLoadCallbacks.forEach({
                                        "BranchMap.useEffect.loadGoogleMaps": (cb)=>cb()
                                    }["BranchMap.useEffect.loadGoogleMaps"]);
                                    googleMapsLoadCallbacks = [];
                                }
                            })["BranchMap.useEffect.loadGoogleMaps"];
                            script.onerror = ({
                                "BranchMap.useEffect.loadGoogleMaps": (error)=>{
                                    googleMapsLoading = false;
                                    reject(error);
                                }
                            })["BranchMap.useEffect.loadGoogleMaps"];
                            document.head.appendChild(script);
                        }
                    }["BranchMap.useEffect.loadGoogleMaps"]);
                }
            }["BranchMap.useEffect.loadGoogleMaps"];
            // Load and initialize
            loadGoogleMaps().then({
                "BranchMap.useEffect": ()=>{
                    if (mapRef.current) {
                        initializeMap();
                    }
                }
            }["BranchMap.useEffect"]).catch({
                "BranchMap.useEffect": (error)=>{
                    console.error('Failed to load Google Maps:', error);
                }
            }["BranchMap.useEffect"]);
            // Cleanup
            return ({
                "BranchMap.useEffect": ()=>{
                    if (markerRef.current) {
                        markerRef.current.setMap(null);
                    }
                    if (mapInstanceRef.current) {
                    // No explicit destroy needed
                    }
                }
            })["BranchMap.useEffect"];
        }
    }["BranchMap.useEffect"], [
        latitude,
        longitude,
        branchName,
        address
    ]);
    if (!latitude || !longitude) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-100 h-48 rounded-lg flex flex-col items-center justify-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-gray-400 mb-2",
                    children: "📍"
                }, void 0, false, {
                    fileName: "[project]/components/contactus/BranchLocator.jsx",
                    lineNumber: 163,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 text-sm",
                    children: "No location coordinates available"
                }, void 0, false, {
                    fileName: "[project]/components/contactus/BranchLocator.jsx",
                    lineNumber: 164,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/contactus/BranchLocator.jsx",
            lineNumber: 162,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mapRef,
                className: "w-full h-48 rounded-lg overflow-hidden border border-gray-300"
            }, void 0, false, {
                fileName: "[project]/components/contactus/BranchLocator.jsx",
                lineNumber: 174,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            !mapReady && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gray-100 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                }, void 0, false, {
                    fileName: "[project]/components/contactus/BranchLocator.jsx",
                    lineNumber: 180,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/contactus/BranchLocator.jsx",
                lineNumber: 179,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-2 right-2 flex gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: directionsUrl,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "bg-white p-1.5 rounded shadow-sm hover:shadow transition-shadow",
                        title: "Get Directions",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4 text-blue-600",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M9 5l7 7-7 7"
                            }, void 0, false, {
                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                lineNumber: 192,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/contactus/BranchLocator.jsx",
                            lineNumber: 191,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: googleMapsUrl,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "bg-white p-1.5 rounded shadow-sm hover:shadow transition-shadow",
                        title: "Open in Google Maps",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-4 h-4 text-green-600",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            }, void 0, false, {
                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/contactus/BranchLocator.jsx",
                            lineNumber: 202,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/contactus/BranchLocator.jsx",
                lineNumber: 183,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/contactus/BranchLocator.jsx",
        lineNumber: 173,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(BranchMap, "Q7Rvq+5S3fL6VsN99MnAHXTsiCQ=");
_c = BranchMap;
// Simple static map fallback (no JavaScript required)
const SimpleStaticMap = ({ latitude, longitude, branchName })=>{
    if (!latitude || !longitude) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-100 h-48 rounded-lg flex flex-col items-center justify-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-gray-400 mb-2",
                    children: "📍"
                }, void 0, false, {
                    fileName: "[project]/components/contactus/BranchLocator.jsx",
                    lineNumber: 216,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 text-sm",
                    children: "No location coordinates available"
                }, void 0, false, {
                    fileName: "[project]/components/contactus/BranchLocator.jsx",
                    lineNumber: 217,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/contactus/BranchLocator.jsx",
            lineNumber: 215,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&markers=color:blue%7C${latitude},${longitude}&key=${("TURBOPACK compile-time value", "AIzaSyA6DfhegFXqMkTjJIenP7FPjCvQ8bGOYtM")}`;
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative group",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: googleMapsUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "block",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: staticMapUrl,
                    alt: `${branchName} location`,
                    className: "w-full h-48 rounded-lg object-cover border border-gray-300",
                    onError: (e)=>{
                        e.target.onerror = null;
                        e.target.src = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&markers=color:blue%7C${latitude},${longitude}`;
                    }
                }, void 0, false, {
                    fileName: "[project]/components/contactus/BranchLocator.jsx",
                    lineNumber: 233,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg group-hover:from-black/20 transition-all"
                }, void 0, false, {
                    fileName: "[project]/components/contactus/BranchLocator.jsx",
                    lineNumber: 242,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs",
                    children: "Click to open in Google Maps"
                }, void 0, false, {
                    fileName: "[project]/components/contactus/BranchLocator.jsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/contactus/BranchLocator.jsx",
            lineNumber: 227,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/contactus/BranchLocator.jsx",
        lineNumber: 226,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = SimpleStaticMap;
const loadGoogleMapsScript = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return new Promise((resolve, reject)=>{
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
        script.src = `https://maps.googleapis.com/maps/api/js?key=${"TURBOPACK compile-time value", "AIzaSyA6DfhegFXqMkTjJIenP7FPjCvQ8bGOYtM"}`;
        script.async = true;
        script.defer = true;
        script.onload = ()=>{
            googleMapsLoaded = true;
            googleMapsLoading = false;
            resolve();
            googleMapsLoadCallbacks.forEach((cb)=>cb());
            googleMapsLoadCallbacks = [];
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
};
// Main BranchLocator component
const BranchLocator = ()=>{
    _s1();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const urlState = searchParams.get('state');
    const urlBranchName = searchParams.get('branch');
    const urlBranchId = searchParams.get('branchId');
    console.log("url state", urlState, urlBranchName, urlBranchId);
    const [branchData, setBranchData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [selectedState, setSelectedState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(urlState || '');
    const [selectedBranch, setSelectedBranch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(urlBranchName || null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [useInteractiveMap, setUseInteractiveMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [mapsScriptLoaded, setMapsScriptLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    console.log("selected state and branch===>", selectedState, selectedBranch);
    // Pre-load Google Maps script when component mounts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BranchLocator.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                loadGoogleMapsScript().then({
                    "BranchLocator.useEffect": ()=>{
                        setMapsScriptLoaded(true);
                    }
                }["BranchLocator.useEffect"]).catch(console.error);
            }
        }
    }["BranchLocator.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BranchLocator.useEffect": ()=>{
            const fetchBranches = {
                "BranchLocator.useEffect.fetchBranches": async ()=>{
                    try {
                        const response = await fetch('/api/admin/branches');
                        const data = await response.json();
                        const groupedData = data.reduce({
                            "BranchLocator.useEffect.fetchBranches.groupedData": (acc, branch)=>{
                                if (!acc[branch.state]) {
                                    acc[branch.state] = [];
                                }
                                acc[branch.state].push(branch);
                                return acc;
                            }
                        }["BranchLocator.useEffect.fetchBranches.groupedData"], {});
                        setBranchData(groupedData);
                        // ✅ CASE 1: URL params exist → respect them
                        if (urlState && groupedData[urlState]) {
                            setSelectedState(urlState);
                            // Find branch by name OR id
                            const matchedBranch = groupedData[urlState].find({
                                "BranchLocator.useEffect.fetchBranches.matchedBranch": (b)=>b.name === urlBranchName || String(b.id) === String(urlBranchId)
                            }["BranchLocator.useEffect.fetchBranches.matchedBranch"]);
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
                    } finally{
                        setLoading(false);
                    }
                }
            }["BranchLocator.useEffect.fetchBranches"];
            fetchBranches();
        }
    }["BranchLocator.useEffect"], [
        urlState,
        urlBranchName,
        urlBranchId
    ]);
    const handleStateSelect = (state)=>{
        setSelectedState(state);
        if (branchData[state] && branchData[state].length > 0) {
            setSelectedBranch(branchData[state][0]);
        }
    };
    const handleBranchSelect = (branch)=>{
        setSelectedBranch(branch);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full mx-auto p-8 text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-lg",
                children: "Loading branches..."
            }, void 0, false, {
                fileName: "[project]/components/contactus/BranchLocator.jsx",
                lineNumber: 390,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/contactus/BranchLocator.jsx",
            lineNumber: 389,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (Object.keys(branchData).length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full mx-auto p-8 text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-lg text-gray-500",
                children: "No branches found"
            }, void 0, false, {
                fileName: "[project]/components/contactus/BranchLocator.jsx",
                lineNumber: 398,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/components/contactus/BranchLocator.jsx",
            lineNumber: 397,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full mx-auto p-4 md:p-6 lg:p-8 font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-lg md:text-xl font-bold text-primary mb-8",
                children: "Branches"
            }, void 0, false, {
                fileName: "[project]/components/contactus/BranchLocator.jsx",
                lineNumber: 405,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col lg:flex-row gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:w-1/4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-md md:text-lg font-semibold text-gray-700 mb-4",
                                children: "Select State"
                            }, void 0, false, {
                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                lineNumber: 409,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap lg:flex-col text-sm gap-2",
                                children: Object.keys(branchData).map((state)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleStateSelect(state),
                                        className: `px-4 py-3 rounded-lg text-left transition-colors ${selectedState === state ? 'bg-primary text-white font-semibold' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`,
                                        children: state
                                    }, state, false, {
                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                        lineNumber: 412,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                lineNumber: 410,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                        lineNumber: 408,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:w-1/3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-md md:text-lg font-semibold text-gray-700 mb-4",
                                children: [
                                    "Branches in ",
                                    selectedState
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                lineNumber: 428,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 text-sm",
                                children: branchData[selectedState]?.map((branch)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleBranchSelect(branch),
                                        className: `w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedBranch?.id === branch.id ? 'bg-primary/20 border-l-4 border-primary' : 'bg-gray-50 hover:bg-gray-100'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-800",
                                            children: branch.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/contactus/BranchLocator.jsx",
                                            lineNumber: 442,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, branch.id, false, {
                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                        lineNumber: 433,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                lineNumber: 431,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                        lineNumber: 427,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:w-2/4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-md md:text-lg font-semibold text-gray-700 mb-4",
                                children: "Branch Details"
                            }, void 0, false, {
                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                lineNumber: 449,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            selectedBranch ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-6 rounded-xl border border-gray-300 shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg md:text-xl font-bold text-primary mb-4",
                                        children: selectedBranch.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                        lineNumber: 452,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-semibold text-gray-700 mb-2",
                                                        children: "Address"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                        lineNumber: 458,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-600 text-sm",
                                                        children: [
                                                            selectedBranch.address,
                                                            ",",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                lineNumber: 460,
                                                                columnNumber: 46
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            selectedBranch.city,
                                                            ", ",
                                                            selectedBranch.state
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                        lineNumber: 459,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-600 mt-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium text-sm",
                                                                children: "Pin:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                lineNumber: 464,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            " ",
                                                            selectedBranch.pincode
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                        lineNumber: 463,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                lineNumber: 457,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-semibold text-gray-700 text-sm mb-2",
                                                        children: "Contact Information"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                        lineNumber: 469,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2 text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-600",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: "Email:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                        lineNumber: 472,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    ' ',
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                        href: `mailto:${selectedBranch.email}`,
                                                                        className: "text-primary/50 hover:text-primary hover:underline transition-colors",
                                                                        children: selectedBranch.email
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                        lineNumber: 473,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                lineNumber: 471,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-600",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: "Phone 1:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                        lineNumber: 481,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    ' ',
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                        href: `tel:${selectedBranch.phone1}`,
                                                                        className: "text-primary/50 hover:text-primary hover:underline transition-colors",
                                                                        children: selectedBranch.phone1
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                        lineNumber: 482,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                lineNumber: 480,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            selectedBranch.phone2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-600",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-medium",
                                                                        children: "Phone 2:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                        lineNumber: 491,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    ' ',
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                        href: `tel:${selectedBranch.phone2}`,
                                                                        className: "text-primary/60 hover:text-primary hover:underline transition-colors",
                                                                        children: selectedBranch.phone2
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                        lineNumber: 492,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                lineNumber: 490,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                        lineNumber: 470,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                lineNumber: 468,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-6 pt-6 border-t border-gray-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center mb-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-semibold text-gray-700",
                                                                children: "Location"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                lineNumber: 506,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            selectedBranch.latitude && selectedBranch.longitude && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setUseInteractiveMap(!useInteractiveMap),
                                                                className: "text-xs text-primary hover:text-primary-dark",
                                                                children: useInteractiveMap ? 'Switch to Static Map' : 'Switch to Interactive Map'
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                lineNumber: 508,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                        lineNumber: 505,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    selectedBranch.latitude && selectedBranch.longitude ? useInteractiveMap ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BranchMap, {
                                                        latitude: selectedBranch.latitude,
                                                        longitude: selectedBranch.longitude,
                                                        branchName: selectedBranch.name,
                                                        address: `${selectedBranch.address}, ${selectedBranch.city}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                        lineNumber: 519,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SimpleStaticMap, {
                                                        latitude: selectedBranch.latitude,
                                                        longitude: selectedBranch.longitude,
                                                        branchName: selectedBranch.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                        lineNumber: 526,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-gray-100 h-48 rounded-lg flex flex-col items-center justify-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-gray-400 mb-2",
                                                                children: "📍"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                lineNumber: 534,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-gray-500 text-sm",
                                                                children: "No location coordinates available"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                lineNumber: 535,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-400 mt-1",
                                                                children: "Latitude/Longitude not provided for this branch"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                lineNumber: 536,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                        lineNumber: 533,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    selectedBranch.latitude && selectedBranch.longitude && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 text-xs text-gray-500 flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Coordinates: ",
                                                                    selectedBranch.latitude,
                                                                    ", ",
                                                                    selectedBranch.longitude
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                lineNumber: 544,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: `https://www.google.com/maps?q=${selectedBranch.latitude},${selectedBranch.longitude}`,
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                className: "text-primary hover:underline",
                                                                children: "Open in new tab →"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                                lineNumber: 545,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                        lineNumber: 543,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                                lineNumber: 504,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                                        lineNumber: 456,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                lineNumber: 451,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gray-50 p-8 rounded-xl border border-gray-300 text-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500",
                                    children: "Select a branch to view details"
                                }, void 0, false, {
                                    fileName: "[project]/components/contactus/BranchLocator.jsx",
                                    lineNumber: 560,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/contactus/BranchLocator.jsx",
                                lineNumber: 559,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/contactus/BranchLocator.jsx",
                        lineNumber: 448,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/contactus/BranchLocator.jsx",
                lineNumber: 407,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/contactus/BranchLocator.jsx",
        lineNumber: 404,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(BranchLocator, "X4JK/nMzJraajsdWYHFLCrnkfSU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c2 = BranchLocator;
const __TURBOPACK__default__export__ = BranchLocator;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "BranchMap");
__turbopack_context__.k.register(_c1, "SimpleStaticMap");
__turbopack_context__.k.register(_c2, "BranchLocator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_contactus_BranchLocator_jsx_1dd30df6._.js.map