const MapBox = ({ lat, lng, zoom = 15, address }) => {
  const envLat = import.meta?.env?.VITE_COMPANY_LAT;
  const envLng = import.meta?.env?.VITE_COMPANY_LNG;
  const envAddress = import.meta?.env?.VITE_COMPANY_ADDRESS;

  const finalLat = lat ?? (envLat ? parseFloat(envLat) : undefined);
  const finalLng = lng ?? (envLng ? parseFloat(envLng) : undefined);
  const finalAddress = address ?? envAddress;

  let src;
  if (
    finalLat != null &&
    finalLng != null &&
    !Number.isNaN(finalLat) &&
    !Number.isNaN(finalLng)
  ) {
    src = `https://www.google.com/maps?q=${finalLat},${finalLng}&z=${zoom}&output=embed`;
  } else if (finalAddress) {
    src = `https://www.google.com/maps?q=${encodeURIComponent(
      finalAddress
    )}&z=${zoom}&output=embed`;
  } else {
    // Fallback: Naikbeen Control Panel company coordinates
    src = `https://www.google.com/maps?q=34.509805706407334,69.2254999279976&z=${zoom}&output=embed`;
  }

  return (
    <div className="map-canvas">
      <iframe
        src={src}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapBox;
