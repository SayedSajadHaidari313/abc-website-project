import {
  GOOGLE_OAUTH_CONFIG,
  GOOGLE_OAUTH_URLS,
} from "../configs/EnvironmentConfig";

class GoogleAuthService {
  constructor() {
    this.clientId = GOOGLE_OAUTH_CONFIG.clientId;
    this.redirectUri = GOOGLE_OAUTH_CONFIG.redirectUri;
    this.scope = GOOGLE_OAUTH_CONFIG.scope;
  }

  // Generate random state for security
  generateState() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // Initiate Google OAuth flow
  initiateGoogleLogin() {
    const state = this.generateState();

    // Store state in localStorage for verification
    localStorage.setItem("google_oauth_state", state);

    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: "code",
      scope: this.scope,
      state: state,
      access_type: "offline",
      prompt: "consent",
    });

    const authUrl = `${GOOGLE_OAUTH_URLS.auth}?${params.toString()}`;
    window.location.href = authUrl;
  }

  // Handle OAuth callback
  async handleCallback(code, state) {
    try {
      // Verify state parameter
      const storedState = localStorage.getItem("google_oauth_state");
      if (state !== storedState) {
        throw new Error("Invalid state parameter");
      }

      // Exchange code for access token
      const tokenResponse = await this.exchangeCodeForToken(code);

      // Get user info
      const userInfo = await this.getUserInfo(tokenResponse.access_token);

      // Clean up
      localStorage.removeItem("google_oauth_state");

      return {
        accessToken: tokenResponse.access_token,
        userInfo: userInfo,
      };
    } catch (error) {
      console.error("Google OAuth callback error:", error);
      throw error;
    }
  }

  // Exchange authorization code for access token
  async exchangeCodeForToken(code) {
    const response = await fetch(GOOGLE_OAUTH_URLS.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: "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", // This should be handled server-side
        code: code,
        grant_type: "authorization_code",
        redirect_uri: this.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to exchange code for token");
    }

    return await response.json();
  }

  // Get user information from Google
  async getUserInfo(accessToken) {
    const response = await fetch(GOOGLE_OAUTH_URLS.userInfo, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user info");
    }

    return await response.json();
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("google_access_token");
  }

  // Logout
  logout() {
    localStorage.removeItem("google_access_token");
    localStorage.removeItem("google_user_info");
    localStorage.removeItem("google_oauth_state");
  }
}

export default new GoogleAuthService();
