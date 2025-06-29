import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { message } from "antd";
import googleAuthService from "../../services/googleAuthService";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { handleGoogleCallback } = useGoogleAuth();

  useEffect(() => {
    const processGoogleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");

        if (error) {
          message.error("Google authentication failed: " + error);
          navigate("/login");
          return;
        }

        if (!code || !state) {
          message.error("Invalid callback parameters");
          navigate("/login");
          return;
        }

        // Handle the OAuth callback
        const result = await googleAuthService.handleCallback(code, state);

        // Use the custom hook to handle the callback
        await handleGoogleCallback(result.userInfo, result.accessToken);

        message.success("Successfully logged in with Google!");
        navigate(("/candidate/dashboard")); // or wherever you want to redirect after login
      } catch (error) {
        console.error("Google callback error:", error);
        message.error("Authentication failed. Please try again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    processGoogleCallback();
  }, [searchParams, navigate, handleGoogleCallback]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Processing Google authentication...</p>
      </div>
    );
  }

  return null;
};

export default GoogleCallback;
