// import React, { useState } from "react";
// import { notification } from "antd";
// import { useAuthStore } from "@/auth/auth.store";
// import { usePostResetPasswordCreate } from "@/queries/reset.password.query";
// import { useLocation, useNavigate } from "react-router-dom";

// const FromContent4 = () => {
//   const location = useLocation();
//   const [formData, setFormData] = useState({
//     email: location.state?.email || "",
//     otp: "",
//     password: "",
//   });
//   const navigate = useNavigate(); // 🛑 اینجا استفاده کن

//   const { login } = useAuthStore();
//   const { mutate, isLoading } = usePostResetPasswordCreate();
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     mutate(formData, {
//       onSuccess: () => {
//         notification.success({ message: "Password reset successful!" });
//         navigate("/login"); 
//         if (formRef.current) {
//           formRef.current.resetFields();
//         }
//       },
//       onError: (error) => {
//         if (error.response && error.response.data) {
//           const { errors } = error.response.data;
//           console.log(errors);
//           if (errors && errors.email) {
//             formRef.current.setFields([
//               {
//                 name: "email",
//                 errors: errors.email,
//               },
//             ]);
//           }
//         }
//       },
//       onSettled: () => {
//         setLoading(false);
//       },
//     });
//   };

//   return (
//     <div className="form-inner">
//       <form method="post" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="text"
//             name="email"
//             placeholder="Email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="form-group">
//           <label>otp</label>
//           <input
//             type="text"
//             name="otp"
//             value={formData.otp}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <div className="field-outer">
//             <div className="input-group checkboxes square">
//               <input type="checkbox" name="remember-me" id="remember" />
//               <label htmlFor="remember" className="remember">
//                 <span className="custom-checkbox"></span> Remember me
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="form-group">
//           <button
//             className="theme-btn btn-style-one d-flex align-items-center justify-content-center gap-2"
//             type="submit"
//             disabled={loading}
//           >
//             {loading && (
//               <span
//                 className="spinner-border spinner-border-sm"
//                 role="status"
//                 aria-hidden="true"
//               ></span>
//             )}
//             {loading ? "ُSubmit..." : "ُSubmit"}
//           </button>
//         </div>
//       </form>

//       <div className="bottom-box"></div>
//     </div>
//   );
// };

// export default FromContent4;

import React, { useEffect, useRef, useState } from "react";
import { notification } from "antd";
import { useAuthStore } from "@/auth/auth.store";
import { usePostResetPasswordCreate } from "@/queries/reset.password.query";
import { usePostForgotPasswordCreate } from "@/queries/forgot.password.query";
import { useLocation, useNavigate } from "react-router-dom";

const FromContent4 = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    otp: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { mutate, isLoading } = usePostResetPasswordCreate();
  const { mutate: resendOtp, isLoading: isResending } = usePostForgotPasswordCreate();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const formRef = useRef();

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
        notification.success({ message: "Password reset successful!" });
        navigate("/login");
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
                name: "email",
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

  const handleResendCode = () => {
    if (!formData.email) {
      notification.error({ message: "Email not found!" });
      return;
    }
    resendOtp({ email: formData.email }, {
      onSuccess: () => {
        notification.success({ message: "A new code has been sent to your email." });
        setTimer(60); // ریست تایمر بعد از ارسال دوباره
      },
      onError: (error) => {
        notification.error({ message: "Failed to resend code." });
        console.error(error);
      },
    });
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

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
          <label>OTP</label>
          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
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
            {loading ? "Submit..." : "Submit"}
          </button>
        </div>

        {/* 🔥 دکمه Resend Code */}
        <div className="form-group">
          <button
            type="button"
            onClick={handleResendCode}
            className={`theme-btn btn-style-two d-flex align-items-center justify-content-center gap-2 ${timer > 0 ? "disabled" : ""}`}
            disabled={timer > 0 || isResending}
          >
            {isResending ? "Sending..." : timer > 0 ? `Resend Code (${timer}s)` : "Resend Code"}
          </button>
        </div>

      </form>

      <div className="bottom-box"></div>
    </div>
  );
};

export default FromContent4;
