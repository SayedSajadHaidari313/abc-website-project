import React, { useEffect, useRef, useState } from "react";
import { useGetAdBlockData } from "@/queries/website.query/ad.block.query";
import {
  loadGoogleAdsScript,
  initializeAdsInContainer,
  validateAdCode,
  debugGoogleAds,
} from "@/utils/googleAdsUtils";

const AdBlockDisplay = ({ position = "after_sponsored_company" }) => {
  const adContainerRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [adError, setAdError] = useState(null);

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
        rootMargin: "50px 0px",
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
      const loadAd = async () => {
        try {
          setAdError(null);

          // Validate ad code first
          const validation = validateAdCode(ad.ad_code);
          if (!validation.isValid) {
            throw new Error(validation.error);
          }

          // Clear previous content
          adContainerRef.current.innerHTML = "";

          // Load Google Ads script
          await loadGoogleAdsScript();

          // Create wrapper div
          const wrapper = document.createElement("div");
          wrapper.style.minHeight = "100px";
          wrapper.style.display = "flex";
          wrapper.style.justifyContent = "center";
          wrapper.style.alignItems = "center";
          wrapper.className = "ad-block-wrapper";

          // Set the ad HTML content
          wrapper.innerHTML = ad.ad_code;

          // Handle script tags properly
          const scripts = wrapper.getElementsByTagName("script");
          Array.from(scripts).forEach((oldScript) => {
            const newScript = document.createElement("script");

            // Copy all attributes
            Array.from(oldScript.attributes).forEach((attr) => {
              newScript.setAttribute(attr.name, attr.value);
            });

            // Copy inner HTML
            newScript.innerHTML = oldScript.innerHTML;

            // Replace the old script
            oldScript.parentNode.replaceChild(newScript, oldScript);
          });

          // Add the wrapper to the container
          adContainerRef.current.appendChild(wrapper);

          // Wait a bit for DOM to be ready, then initialize ads
          setTimeout(async () => {
            await initializeAdsInContainer(wrapper);
            setIsAdLoaded(true);

            // Debug info
            if (process.env.NODE_ENV === "development") {
              debugGoogleAds();
            }
          }, 200);
        } catch (error) {
          console.error("Error loading ad:", error);
          setAdError(error.message);
        }
      };

      loadAd();
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
    console.error("Ad loading error:", error);
    return null;
  }

  if (!ad) {
    return null;
  }

  if (adError) {
    console.error("Ad error:", adError);
    return (
      <div
        style={{
          minHeight: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5",
          color: "#666",
          fontSize: "14px",
        }}
      >
        Ad loading failed: {adError}
      </div>
    );
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
