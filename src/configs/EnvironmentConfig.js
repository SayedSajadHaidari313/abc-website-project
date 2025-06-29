// Environment Configuration
export const ENV_CONFIG = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",

  // Google OAuth Configuration
  GOOGLE_CLIENT_ID:
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    "98700658564-l2inage38nj93ob01sutr567kptllgo4.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET:
    import.meta.env.VITE_GOOGLE_CLIENT_SECRET ||
    "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",

  // App Configuration
  APP_NAME: "Abc Project",
  APP_VERSION: "1.0.0",

  // Development Configuration
  IS_DEVELOPMENT: import.meta.env.MODE === "development",
  IS_PRODUCTION: import.meta.env.MODE === "production",
};

// Google OAuth Configuration
export const GOOGLE_OAUTH_CONFIG = {
  clientId: ENV_CONFIG.GOOGLE_CLIENT_ID,
  clientSecret: ENV_CONFIG.GOOGLE_CLIENT_SECRET,
  scope: "email profile",
  redirectUri: "http://localhost:5173/auth/google/callback",
};

// Google OAuth endpoints
export const GOOGLE_OAUTH_URLS = {
  auth: "https://accounts.google.com/o/oauth2/v2/auth",
  token: "https://oauth2.googleapis.com/token",
  userInfo: "https://www.googleapis.com/oauth2/v2/userinfo",
};

const dev = {
  API_ENDPOINT_URL: "/api",
};

const prod = {
  API_ENDPOINT_URL: "/api",
};

const test = {
  API_ENDPOINT_URL: "/api",
};

const getEnv = () => {
  switch (import.meta.env.MODE) {
    case "development":
      return dev;
    case "production":
      return prod;
    case "test":
      return test;
    default:
      return prod; // fallback
  }
};

export const env = getEnv();
