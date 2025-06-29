import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { message } from "antd";

const LoginWithSocial = () => {
  const { loginWithGoogle, loading } = useGoogleAuth();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Google login error:", error);
      message.error("Failed to initiate Google login. Please try again.");
    }
  };

  const handleFacebookLogin = () => {
    message.info("Facebook login functionality will be implemented soon!");
  };

  return (
    <div className="btn-box row">
      <div className="col-lg-6 col-md-12">
        <button
          onClick={handleFacebookLogin}
          className="theme-btn social-btn-two facebook-btn"
          disabled={loading}
        >
          <i className="fab fa-facebook-f"></i>
          {loading ? "Loading..." : "Log In via Facebook"}
        </button>
      </div>
      <div className="col-lg-6 col-md-12">
        <button
          onClick={handleGoogleLogin}
          className="theme-btn social-btn-two google-btn"
          disabled={loading}
        >
          <i className="fab fa-google"></i>
          {loading ? "Loading..." : "Log In via Gmail"}
        </button>
      </div>
    </div>
  );
};

export default LoginWithSocial;
