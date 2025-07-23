import React, { useState, useEffect } from "react";

const LazyImage = ({ src, alt, className = "", onLoad, onError, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);

  useEffect(() => {
    // Reset state when src changes
    setIsLoaded(false);
    setCurrentSrc(null);

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoaded(true);
      setCurrentSrc(src);
      if (onLoad) onLoad();
    };

    img.onerror = () => {
      if (onError) onError();
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad, onError]);

  return (
    <img
      src={currentSrc || src}
      alt={alt}
      className={`lazy-image ${isLoaded ? "loaded" : ""} ${className}`}
      loading="lazy"
      {...props}
    />
  );
};

export default LazyImage;
