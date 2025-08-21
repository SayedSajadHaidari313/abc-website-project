// import { ENV_CONFIG } from "@/configs/EnvironmentConfig";
import { BASE_IMAGE_URL } from "./linkActiveChecker";

// Get the correct base URL for images (without /api suffix)
const getImageBaseUrl = () => {
  const apiUrl = BASE_IMAGE_URL;
  // Remove /api suffix if present to get the base server URL
  return apiUrl.replace(/\/api$/, "");
};

const getFileBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    // In development, use proxy
    return "";
  } else {
    // In production, use frontend domain (proxy handles backend forwarding)
    return "https://admin.abc.af";
  }
};

/**
 * Formats image URLs for different types of images
 * @param {string} path - The image path from the API
 * @param {string} type - The type of image ('item', 'user', 'company', 'logo', etc.)
 * @returns {string|null} - The formatted image URL or null if no path provided
 */
export const formatImageUrl = (path, type = "item") => {
  if (!path) return null;

  // Normalize the path by removing backslashes and leading/trailing slashes
  const normalizedPath = path.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");

  // Use the correct base URL
  const baseUrl = getImageBaseUrl();

  // Handle different image types with appropriate path prefixes
  switch (type) {
    case "user":
      // User images typically don't need extra path segments
      return `${baseUrl}/${normalizedPath}`;

    case "company":
      // Company images might be in a specific directory
      return `${baseUrl}/${normalizedPath}`;

    case "logo":
      // Logo images are typically in settings directory
      return `${baseUrl}/images/settings/${normalizedPath}`;

    case "item":
    default:
      // Item images use the path as is
      return `${baseUrl}/${normalizedPath}`;
  }
};

/**
 * Gets fallback images for different types
 * @param {string} type - The type of image
 * @returns {string} - The fallback image URL
 */
export const getFallbackImage = (type = "item") => {
  switch (type) {
    case "user":
      return "/images/icons/user.svg";
    case "company":
      return "/images/icons/placeholder.svg";
    case "logo":
      return "/images/icons/placeholder.svg";
    case "item":
    default:
      return "/images/icons/download.svg";
  }
};

/**
 * Handles image loading errors by setting a fallback image
 * @param {Event} e - The error event
 * @param {string} type - The type of image
 */
export const handleImageError = (e, type = "item") => {
  const target = e.target;

  // Prevent infinite loops by checking if we've already tried to set a fallback
  if (target.dataset.fallbackAttempted) {
    // If fallback also failed, hide the image or set a simple text
    target.style.display = "none";
    return;
  }

  // Mark that we've attempted to set a fallback
  target.dataset.fallbackAttempted = "true";

  // Set the fallback image
  const fallbackSrc = getFallbackImage(type);
  if (fallbackSrc) {
    target.src = fallbackSrc;

    // Add another error handler for the fallback image
    target.onerror = (fallbackError) => {
      fallbackError.target.style.display = "none";
    };
  } else {
    // If no fallback image available, hide the element
    target.style.display = "none";
  }
};

/**
 * Validates if an image URL is accessible
 * @param {string} url - The image URL to validate
 * @returns {Promise<boolean>} - True if image is accessible, false otherwise
 */
export const validateImageUrl = async (url) => {
  if (!url) return false;

  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    console.warn("Image validation failed:", error);
    return false;
  }
};

/**
 * Creates an optimized image URL with size parameters
 * @param {string} path - The image path
 * @param {string} type - The image type
 * @param {number} width - Desired width
 * @param {number} height - Desired height
 * @returns {string|null} - The optimized image URL
 */
export const getOptimizedImageUrl = (
  path,
  type = "item",
  width = null,
  height = null
) => {
  const baseUrl = formatImageUrl(path, type);
  if (!baseUrl) return null;

  // Add size parameters if provided (this depends on your backend implementation)
  if (width && height) {
    return `${baseUrl}?w=${width}&h=${height}`;
  }

  return baseUrl;
};

/**
 * Creates a safe image error handler that prevents infinite loops
 * @param {string} fallbackSrc - The fallback image source
 * @param {string} type - The type of image for fallback
 * @param {Function} onFallbackError - Optional callback when fallback also fails
 * @returns {Function} - The error handler function
 */
export const createSafeImageErrorHandler = (
  fallbackSrc = null,
  type = "item",
  onFallbackError = null
) => {
  return (e) => {
    const target = e.target;

    // Prevent infinite loops by checking if we've already attempted fallback
    if (target.dataset.fallbackAttempted) {
      target.style.display = "none";
      if (onFallbackError) onFallbackError(e);
      return;
    }

    // Mark that we've attempted fallback
    target.dataset.fallbackAttempted = "true";

    // Use provided fallback or get default fallback
    const finalFallbackSrc = fallbackSrc || getFallbackImage(type);

    if (finalFallbackSrc) {
      target.src = finalFallbackSrc;

      // Add another error handler for the fallback image
      target.onerror = (fallbackError) => {
        fallbackError.target.style.display = "none";
        if (onFallbackError) onFallbackError(fallbackError);
      };
    } else {
      // If no fallback image available, hide the element
      target.style.display = "none";
      if (onFallbackError) onFallbackError(e);
    }
  };
};

/**
 * Utility function to handle file downloads consistently across environments
 * @param {string} file - The file path or URL
 * @param {string} folder - The folder name (e.g., 'cases', 'tasks')
 * @param {string} filename - Optional custom filename
 */
export const downloadFile = async (file, folder, filename = null) => {
  if (!file) {
    console.error("No file provided for download");
    return;
  }

  const extractedFilename = filename || file.split("/").pop();

  // استفاده از route لاراول
  const fileUrl = `${BASE_IMAGE_URL}/download/${extractedFilename}`;

  try {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", extractedFilename);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Download failed:", error);
    window.open(fileUrl, "_blank");
  }
};

/**
 * Fetches a file from backend download endpoints and returns a Blob object URL.
 * Tries /download-user first, then falls back to /download.
 * The returned URL should be revoked by calling revokeObjectUrl when no longer needed.
 * @param {string} file - Full path or filename
 * @returns {Promise<string|null>} - Object URL or null
 */
export const getDownloadObjectUrl = async (file) => {
  if (!file) return null;

  // Normalize to just the filename
  const fileName = (() => {
    try {
      const raw = (file || "").toString();
      const base = raw.split("/").pop() || raw;
      return base.split("?")[0].split("#")[0];
    } catch (e) {
      return null;
    }
  })();

  if (!fileName) return null;

  // In dev, prefer relative paths so Vite proxy handles CORS
  const inDev =
    typeof process !== "undefined" &&
    process.env &&
    process.env.NODE_ENV === "development";
  const candidateUrls = inDev
    ? [`/download-user/${fileName}`, `/download/${fileName}`]
    : [
        `${BASE_IMAGE_URL}/download-user/${fileName}`,
        `${BASE_IMAGE_URL}/download/${fileName}`,
      ];

  for (const url of candidateUrls) {
    try {
      const res = await fetch(url, { mode: "cors", credentials: "include" });
      if (!res.ok) continue;
      const blob = await res.blob();
      return URL.createObjectURL(blob);
    } catch (e) {
      // try next
    }
  }

  return null;
};

/**
 * Safely revokes an object URL.
 * @param {string} url
 */
export const revokeObjectUrl = (url) => {
  if (!url) return;
  try {
    URL.revokeObjectURL(url);
  } catch (e) {}
};

/**
 * Triggers a download for a given data URL (e.g., from canvas.toDataURL()).
 * @param {string} filename
 * @param {string} dataUrl
 */
export const downloadDataUrl = (filename, dataUrl) => {
  if (!dataUrl) return;
  try {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.setAttribute("download", filename || "download.png");
    link.rel = "noopener";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    try {
      window.open(dataUrl, "_blank");
    } catch (_) {}
  }
};
