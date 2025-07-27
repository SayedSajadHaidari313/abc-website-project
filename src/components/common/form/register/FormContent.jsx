// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { notification } from "antd";
// import { usePostJobSeekerCreate } from "@/queries/jobseeker.query";
// import { useGetUsersTagData } from "@/queries/jobseekerTags.query";
// import Select from "react-select";

// const validationSchema = Yup.object({
//   first_name: Yup.string()
//     .min(2, "First name must be at least 2 characters")
//     .max(32, "First name must be at most 32 characters")
//     .required("First name is required"),
//   last_name: Yup.string()
//     .min(2, "Last name must be at least 2 characters")
//     .max(32, "Last name must be at most 32 characters")
//     .required("Last name is required"),
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   password: Yup.string()
//     .required("Password is required"),
//   tags: Yup.array()
//     .of(Yup.number().typeError("Invalid tag format"))
//     .min(1, "Please select at least one tag")
//     .required("Tags are required"),
// });

// const passwordWarnings = (password) => {
//   const warnings = [];
//   if (password.length < 8) warnings.push("Password should be at least 8 characters");
//   if (!/[A-Z]/.test(password)) warnings.push("Should contain at least one uppercase letter");
//   if (!/[0-9]/.test(password)) warnings.push("Should contain at least one number");
//   if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) warnings.push("Should contain at least one special character");
//   return warnings;
// };

// const FormContent = () => {
//   const { data } = useGetUsersTagData();
//   const tagsData = data || [];
//   const { mutate } = usePostJobSeekerCreate();
//   const [passwordWarningMessages, setPasswordWarningMessages] = React.useState([]);
//   const tagOptions = tagsData?.map((tag) => ({
//     label: tag.name,
//     value: tag.id,
//   }));
//   const formik = useFormik({
//     initialValues: {
//       first_name: "",
//       last_name: "",
//       email: "",
//       password: "",
//       tags: [],
//     },
//     validationSchema,
//     onSubmit: (values, { setSubmitting, setErrors, resetForm }) => {
//       const data = new FormData();
//       data.append("first_name", values.first_name);
//       data.append("last_name", values.last_name);
//       data.append("email", values.email);
//       data.append("password", values.password);
//       data.append("role", "JOB_SEEKER");
//       data.append("status", "ACTIVE");
//       values.tags.forEach((tag) => {
//         data.append("tags[]", tag);
//       });

//       mutate(data, {
//         onSuccess: () => {
//           notification.success({
//             message: "Registration successful",
//             description: "Please check your email For Verification!",
//           });
//           resetForm();
//         },
//         onError: (error) => {
//           if (error.response?.data?.errors) {
//             const errors = error.response.data.errors;
//             const formattedErrors = {};

//             if (errors.email) {
//               formattedErrors.email = errors.email[0];
//             }
//             if (errors.password) {
//               formattedErrors.password = errors.password[0];
//             }
//             if (errors.first_name || errors.name) {
//               formattedErrors.first_name =
//                 errors.first_name?.[0] || errors.name?.[0];
//             }

//             setErrors(formattedErrors);
//           } else {
//             // notification.error({
//             //   message: "Registration failed",
//             //   description: "An unexpected error occurred",
//             // });
//           }
//         },
//         onSettled: () => {
//           setSubmitting(false);
//         },
//       });
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <div className="form-group">
//         <label>First Name</label>
//         <input
//           type="text"
//           name="first_name"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.first_name}
//           placeholder="First Name"
//           className={
//             formik.touched.first_name && formik.errors.first_name
//               ? "is-invalid"
//               : ""
//           }
//         />
//         {formik.touched.first_name && formik.errors.first_name && (
//           <div className="invalid-feedback">{formik.errors.first_name}</div>
//         )}
//       </div>

//       <div className="form-group">
//         <label>Last Name</label>
//         <input
//           type="text"
//           name="last_name"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.last_name}
//           placeholder="Last Name"
//           className={
//             formik.touched.last_name && formik.errors.last_name
//               ? "is-invalid"
//               : ""
//           }
//         />
//         {formik.touched.last_name && formik.errors.last_name && (
//           <div className="invalid-feedback">{formik.errors.last_name}</div>
//         )}
//       </div>

//       <div className="form-group">
//         <label>Email Address</label>
//         <input
//           type="email"
//           name="email"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.email}
//           placeholder="Email"
//           className={
//             formik.touched.email && formik.errors.email ? "is-invalid" : ""
//           }
//         />
//         {formik.touched.email && formik.errors.email && (
//           <div className="invalid-feedback">{formik.errors.email}</div>
//         )}
//       </div>

//       <div className="form-group">
//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           onChange={(e) => {
//             formik.handleChange(e);
//             setPasswordWarningMessages(passwordWarnings(e.target.value));
//           }}
//           onBlur={formik.handleBlur}
//           value={formik.values.password}
//           placeholder="Password"
//           className={
//             formik.touched.password && formik.errors.password
//               ? "is-invalid"
//               : ""
//           }
//         />
//         {formik.touched.password && formik.errors.password && (
//           <div className="invalid-feedback">{formik.errors.password}</div>
//         )}
//         {passwordWarningMessages.map((warning, index) => (
//           <div key={index} className="text-warning" style={{ fontSize: '0.875em' }}>
//             {warning}
//           </div>
//         ))}
//       </div>

//       <div className="form-group">
//         <label>Tags</label>
//         <Select
//           isMulti
//           name="tags"
//           options={tagOptions}
//           classNamePrefix="select"
//           value={tagOptions.filter((option) =>
//             formik.values.tags.includes(option.value)
//           )}
//           onChange={(selectedOptions) => {
//             if (selectedOptions.length <= 5) {
//               formik.setFieldValue(
//                 "tags",
//                 selectedOptions.map((opt) => opt.value)
//               );
//             } else {
//               // فقط در صورتی که می‌خوای پیام خطا نشون بدی:
//               formik.setFieldTouched("tags", true);
//               formik.setFieldError("tags", "You can select up to 5 tags only.");
//             }
//           }}
//           onBlur={() => formik.setFieldTouched("tags", true)}
//           isOptionDisabled={() => formik.values.tags.length >= 5}
//         />

//         {formik.touched.tags && formik.errors.tags && (
//           <div className="invalid-feedback">{formik.errors.tags}</div>
//         )}
//       </div>

//       <div className="form-group">
//         <button
//           className="theme-btn btn-style-one d-flex align-items-center justify-content-center gap-2"
//           type="submit"
//           disabled={formik.isSubmitting}
//         >
//           {formik.isSubmitting && (
//             <span
//               className="spinner-border spinner-border-sm"
//               role="status"
//               aria-hidden="true"
//             ></span>
//           )}
//           {formik.isSubmitting ? "Registering..." : "Register"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default FormContent;
