
import React, { useState } from "react";
import { notification } from "antd";
import { useAuthStore } from "@/auth/auth.store";
import { usePostForgotPasswordCreate } from "@/queries/forgot.password.query";
import { useNavigate } from "react-router-dom";

const FromContent3 = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const { login } = useAuthStore();
  const { mutate, isLoading } = usePostForgotPasswordCreate();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // 🛑 اینجا استفاده کن


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    mutate(formData, {

      onSuccess: () => {
        notification.success({ message: 'Check your email please!' });
        navigate("/reset-password", { state: { email: formData.email } });
        if (formRef.current) {
          formRef.current.resetFields();
        }
      },
      onError: (error) => {
        if (error.response && error.response.data) {
          const { errors } = error.response.data;
          console.log(errors);
          if (errors && errors.email) {
            formRef.current.setFields([
              {
                name: 'email',
                errors: errors.email,
              },
            ]);
          }
        }
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };


  return (
    <div className="form-inner">

      <form method="post" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="remember-me" id="remember" />
              <label htmlFor="remember" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div>
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
              {loading ? "ُSubmit..." : "ُSubmit"}
            </button>
        </div>
      </form>

      <div className="bottom-box">

      </div>
    </div>
  );
};

export default FromContent3;
