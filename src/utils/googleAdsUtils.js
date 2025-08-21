// Google Ads Utility Functions

/**
 * Check if Google Ads script is loaded
 */
export const isGoogleAdsScriptLoaded = () => {
  return !!(
    window.adsbygoogle && typeof window.adsbygoogle.push === "function"
  );
};

/**
 * Load Google Ads script if not already loaded
 */
export const loadGoogleAdsScript = () => {
  return new Promise((resolve) => {
    if (isGoogleAdsScriptLoaded()) {
      console.log("Google Ads script already loaded");
      resolve();
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector(
      'script[src*="adsbygoogle.js"]'
    );
    if (existingScript) {
      console.log("Google Ads script tag already exists, waiting for load...");
      existingScript.onload = () => resolve();
      existingScript.onerror = () => resolve();
      return;
    }

    // Create and load script
    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5571339167747166";
    script.async = true;
    script.crossOrigin = "anonymous";

    script.onload = () => {
      console.log("Google Ads script loaded successfully");
      resolve();
    };

    script.onerror = () => {
      console.error("Failed to load Google Ads script");
      resolve();
    };

    document.head.appendChild(script);
  });
};

/**
 * Initialize ads in a container
 */
export const initializeAdsInContainer = (container) => {
  return new Promise((resolve) => {
    if (!isGoogleAdsScriptLoaded()) {
      console.error("Google Ads script not available");
      resolve();
      return;
    }

    try {
      // Find all ins elements with adsbygoogle class
      const adElements = container.querySelectorAll("ins.adsbygoogle");

      if (adElements.length === 0) {
        console.warn("No adsbygoogle elements found in container");
        resolve();
        return;
      }

      // Initialize each ad
      adElements.forEach((adElement, index) => {
        console.log(`Initializing ad ${index + 1}`);

        // Ensure adsbygoogle array exists
        window.adsbygoogle = window.adsbygoogle || [];

        // Push the ad configuration
        window.adsbygoogle.push({});
      });

      console.log("All ads initialized successfully");
      resolve();
    } catch (error) {
      console.error("Error initializing ads:", error);
      resolve();
    }
  });
};

/**
 * Debug Google Ads status
 */
export const debugGoogleAds = () => {
  console.log("=== Google Ads Debug Info ===");
  console.log("Window adsbygoogle:", window.adsbygoogle);
  console.log("Script loaded:", isGoogleAdsScriptLoaded());
  console.log(
    "Script tag exists:",
    !!document.querySelector('script[src*="adsbygoogle.js"]')
  );
  console.log(
    "Ad elements on page:",
    document.querySelectorAll("ins.adsbygoogle").length
  );
  console.log("=============================");
};

/**
 * Clean up ad elements
 */
export const cleanupAdElements = (container) => {
  if (container) {
    const adElements = container.querySelectorAll("ins.adsbygoogle");
    adElements.forEach((element) => {
      element.remove();
    });
  }
};

/**
 * Validate ad code format
 */
export const validateAdCode = (adCode) => {
  if (!adCode || typeof adCode !== "string") {
    return { isValid: false, error: "Ad code must be a non-empty string" };
  }

  // Check for required elements
  const hasInsElement = adCode.includes('<ins class="adsbygoogle"');
  const hasScriptElement = adCode.includes(
    "(adsbygoogle = window.adsbygoogle || []).push({})"
  );
  const hasDataAdClient = adCode.includes(
    'data-ad-client="ca-pub-5571339167747166"'
  );

  if (!hasInsElement) {
    return {
      isValid: false,
      error: "Missing <ins> element with adsbygoogle class",
    };
  }

  if (!hasScriptElement) {
    return { isValid: false, error: "Missing adsbygoogle.push() script" };
  }

  if (!hasDataAdClient) {
    return {
      isValid: false,
      error: "Missing or incorrect data-ad-client attribute",
    };
  }

  return { isValid: true };
};
