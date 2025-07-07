import { ENV_CONFIG } from "@/configs/EnvironmentConfig";

// Get the correct base URL for images (without /api suffix)
const getImageBaseUrl = () => {
  const apiUrl = ENV_CONFIG.API_BASE_URL;
  // Remove /api suffix if present to get the base server URL
  return apiUrl.replace(/\/api$/, "");
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
  target.src = getFallbackImage(type);

  // Add another error handler for the fallback image
  target.onerror = (fallbackError) => {
    fallbackError.target.style.display = "none";
  };
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
