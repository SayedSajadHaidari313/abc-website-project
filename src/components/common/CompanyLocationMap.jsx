import React, { useEffect, useRef } from "react";

const CompanyLocationMap = ({ latitude, longitude, companyName, address }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Check if Google Maps is loaded
    if (!window.google || !window.google.maps) {
      // Load Google Maps script if not already loaded
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        // process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
        "YOUR_API_KEY"
      }
      &libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      // Cleanup
      if (mapInstanceRef.current) {
        // Google Maps doesn't need explicit cleanup
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude]);

  const initializeMap = () => {
    if (!latitude || !longitude || !mapRef.current) return;

    const position = {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    };

    // Create map instance
    const map = new window.google.maps.Map(mapRef.current, {
      center: position,
      zoom: 15,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#c9c9c9" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9e9e9e" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#757575" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#e5e5e5" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9e9e9e" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#757575" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#dadada" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#616161" }],
        },
        {
          featureType: "road.local",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9e9e9e" }],
        },
        {
          featureType: "transit.line",
          elementType: "geometry",
          stylers: [{ color: "#e5e5e5" }],
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [{ color: "#eeeeee" }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }],
        },
        {
          featureType: "landscape",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9e9e9e" }],
        },
      ],
    });

    // Create marker
    const marker = new window.google.maps.Marker({
      position: position,
      map: map,
      title: companyName || "Company Location",
      icon: {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="#1967D2"/>
            <circle cx="20" cy="20" r="8" fill="white"/>
            <circle cx="20" cy="20" r="4" fill="#1967D2"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 20),
      },
    });

    // Create info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 10px; max-width: 200px;">
          <h4 style="margin: 0 0 5px 0; color: #1967D2; font-size: 14px;">${
            companyName || "Company Location"
          }</h4>
          <p style="margin: 0; color: #666; font-size: 12px;">${
            address || "Location"
          }</p>
        </div>
      `,
    });

    // Add click listener to marker
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });

    // Store references
    mapInstanceRef.current = map;
    markerRef.current = marker;
  };

  if (!latitude || !longitude) {
    return (
      <div
        className="map-container"
        style={{
          height: "300px",
          backgroundColor: "#f8f9fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          border: "1px solid #e9ecef",
        }}
      >
        <div style={{ textAlign: "center", color: "#6c757d" }}>
          <i
            className="flaticon-map-locator"
            style={{ fontSize: "48px", marginBottom: "10px", display: "block" }}
          ></i>
          <p style={{ margin: 0 }}>Location coordinates not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="company-location-map">
      <div
        className="map-header"
        style={{
          marginBottom: "15px",
          padding: "15px 20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px 8px 0 0",
          border: "1px solid #e9ecef",
          borderBottom: "none",
        }}
      >
        <h5
          style={{
            margin: 0,
            color: "#1967D2",
            fontSize: "16px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="flaticon-map-locator" style={{ fontSize: "18px" }}></i>
          Company Location
        </h5>
        {address && (
          <p
            style={{
              margin: "5px 0 0 0",
              color: "#6c757d",
              fontSize: "14px",
              fontStyle: "italic",
            }}
          >
            {address}
          </p>
        )}
      </div>

      <div
        ref={mapRef}
        style={{
          height: "300px",
          width: "100%",
          borderRadius: "0 0 8px 8px",
          border: "1px solid #e9ecef",
          borderTop: "none",
          overflow: "hidden",
        }}
      />

      {/* Directions Button */}
      {latitude && longitude && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "8px 16px",
              backgroundColor: "#1967D2",
              color: "#fff",
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: "bold",
              marginTop: "8px",
            }}
          >
            Get Directions
          </a>
        </div>
      )}

      <div
        className="map-footer"
        style={{
          marginTop: "10px",
          padding: "10px 15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "6px",
          fontSize: "12px",
          color: "#6c757d",
          textAlign: "center",
          border: "1px solid #e9ecef",
        }}
      >
        <i className="flaticon-info" style={{ marginRight: "5px" }}></i>
        Click on the marker to view company details
      </div>
    </div>
  );
};

export default CompanyLocationMap;
