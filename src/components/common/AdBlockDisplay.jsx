import React, { useEffect, useRef, useState } from "react";
import { useGetAdBlockData } from "@/queries/website.query/ad.block.query";

const AdBlockDisplay = ({ position = "after_sponsored_company" }) => {
  const adContainerRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  const { data, isLoading, error } = useGetAdBlockData();

  const ad = data?.data?.find(
    (item) => item.ad_status === "ad_enabled" && item.ad_position === position
  );

  useEffect(() => {
    // Create IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px 0px", // Load ads when they're 50px from viewport
        threshold: 0.1,
      }
    );

    if (adContainerRef.current) {
      observer.observe(adContainerRef.current);
    }

    return () => {
      if (adContainerRef.current) {
        observer.unobserve(adContainerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (
      isVisible &&
      ad &&
      ad.ad_code &&
      adContainerRef.current &&
      !isAdLoaded
    ) {
      // Clear previous content
      adContainerRef.current.innerHTML = "";

      // Create a wrapper div with a min-height to prevent CLS
      const wrapper = document.createElement("div");
      wrapper.style.minHeight = "100px"; // Adjust based on your ad size
      wrapper.style.display = "flex";
      wrapper.style.justifyContent = "center";
      wrapper.style.alignItems = "center";
      wrapper.innerHTML = ad.ad_code;

      // Replace scripts
      const scripts = wrapper.getElementsByTagName("script");
      Array.from(scripts).forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.innerHTML = oldScript.innerHTML;
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });

      // Add the wrapper to the container
      adContainerRef.current.appendChild(wrapper);
      setIsAdLoaded(true);
    }
  }, [isVisible, ad, isAdLoaded]);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5",
        }}
      >
        Loading ad...
      </div>
    );
  }

  if (error) {
    return null;
  }

  if (!ad) {
    return null;
  }

  return (
    <div
      ref={adContainerRef}
      style={{
        minHeight: "100px",
        transition: "opacity 0.3s ease-in-out",
        opacity: isAdLoaded ? 1 : 0,
      }}
    />
  );
};

export default React.memo(AdBlockDisplay);
