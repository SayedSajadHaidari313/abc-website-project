const CompanyLocationMap = ({
  latitude,
  longitude,
  companyName,
  address,
  zoom = 15,
  height = "300px",
}) => {
  const lat = latitude != null ? parseFloat(latitude) : undefined;
  const lng = longitude != null ? parseFloat(longitude) : undefined;
  const hasCoords =
    typeof lat === "number" &&
    !Number.isNaN(lat) &&
    typeof lng === "number" &&
    !Number.isNaN(lng);

  if (!hasCoords) {
    return (
      <div
        className="map-container"
        style={{
          height: height,
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
        style={{
          height: height,
          width: "100%",
          borderRadius: "0 0 8px 8px",
          border: "1px solid #e9ecef",
          borderTop: "none",
          overflow: "hidden",
        }}
      >
        <iframe
          title={companyName || "Company Location"}
          src={`https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Directions Button */}
      {hasCoords && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
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
