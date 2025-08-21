import { Link } from "react-router-dom";
import { notification } from "antd";
import { useLoginUsers } from "@/queries/auth.query";
import { useAuthStore } from "@/auth/auth.store";
import { useState } from "react";

const FormContent2 = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const { mutate, isLoading } = useLoginUsers();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    mutate(formData, {
      onSuccess: (data) => {
        const { token, user } = data;
        login({ isLoggedIn: true, token, user });
        notification.success({
          message: "Success",
          description: "You have successfully logged in!",
        });
      },
      onError: () => {
        notification.error({
          message: "Login Failed",
          description: "Please check your credentials and try again.",
        });
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  return (
    <div className="form-inner">
      <h3>Login to Your Account</h3>

      <form method="post" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              style={{ paddingRight: "2.75rem" }}
            />
            <button
              type="button"
              title={showPassword ? "Hide password" : "Show password"}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                width: "32px",
                height: "32px",
                color: "#6c757d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i
                className={showPassword ? "la la-eye-slash" : "la la-eye"}
                style={{ fontSize: 18 }}
              />
            </button>
          </div>
        </div>

        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="remember-me" id="remember" />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="pwd">
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="form-group">
          <button
            className="theme-btn btn-style-one d-flex align-items-center justify-content-center gap-2"
            type="submit"
            disabled={loading}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {loading ? "Logining..." : "login"}
          </button>
        </div>
      </form>

      <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account? <Link to="/register">Signup</Link>
        </div>

        {/* <div className="divider">
          <span>or</span>
        </div> */}

        {/* <LoginWithSocial /> */}
      </div>
    </div>
  );
};

export default FormContent2;
