import { useState, useEffect } from "react";
import { useAuthStore } from "../auth/auth.store";
import googleAuthService from "../services/googleAuthService";

export const useGoogleAuth = () => {
  const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser, setToken, setIsLoggedIn } = useAuthStore();

  useEffect(() => {
    // Check if user is already authenticated with Google
    const checkGoogleAuth = () => {
      const accessToken = localStorage.getItem("google_access_token");
      const userInfo = localStorage.getItem("google_user_info");

      if (accessToken && userInfo) {
        setIsGoogleAuthenticated(true);
        setGoogleUser(JSON.parse(userInfo));
      }
    };

    checkGoogleAuth();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      await googleAuthService.initiateGoogleLogin();
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutFromGoogle = () => {
    googleAuthService.logout();
    setIsGoogleAuthenticated(false);
    setGoogleUser(null);
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
  };

  const handleGoogleCallback = async (userInfo, accessToken) => {
    try {
      setLoading(true);

      // Store Google auth data
      localStorage.setItem("google_access_token", accessToken);
      localStorage.setItem("google_user_info", JSON.stringify(userInfo));

      setIsGoogleAuthenticated(true);
      setGoogleUser(userInfo);

      // Here you would typically send the user info to your backend
      // and get your app's JWT token
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:8000/api";
      const response = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          googleUserInfo: userInfo,
          googleAccessToken: accessToken,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Set your app's authentication state
        setToken(data.token);
        setUser(data.user);
        setIsLoggedIn(true);

        return data;
      } else {
        throw new Error("Backend authentication failed");
      }
    } catch (error) {
      console.error("Google callback error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    isGoogleAuthenticated,
    googleUser,
    loading,
    loginWithGoogle,
    logoutFromGoogle,
    handleGoogleCallback,
  };
};
