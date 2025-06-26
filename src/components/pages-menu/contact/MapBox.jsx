const MapBox = () => {
  return (
    <div className="map-canvas">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25910.13423554086!2d69.13220305000001!3d34.5553495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16eb7eaa04be1%3A0xf3b27dc764f5db4e!2sKabul%2C%20Afghanistan!5e0!3m2!1sen!2saf!4v1715609352005!5m2!1sen!2saf"
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
