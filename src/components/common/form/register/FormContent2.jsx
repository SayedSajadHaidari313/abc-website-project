import { useState } from "react";
import { message, notification } from "antd";
import Select from "react-select";

import { usePostCompanyCreate } from "@/queries/company.query";
import { useGetJobCategoryData } from "@/queries/job.category.query";

const EmployerRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    company_name: "",
    company_type: "",
    job_category_id: "",
    stablished_in: "",
    company_website: "https://",
    company_description: "",
    address: "",
    company_status: "",
    company_photo: null,
  });
  const [errors, setErrors] = useState({});
  const { mutate } = usePostCompanyCreate();
  const { data } = useGetJobCategoryData();
  const JobCategory = data || [];

  const options = JobCategory?.map((option) => ({
    value: option.id,
    label: option.name,
  }));

  const validatePassword = (password) => {
    setPasswordTouched(true);
    setPasswordValidation({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newValue = value;

    if (name === "password") {
      validatePassword(value);
    }

    if (name === "company_website") {
      if (!newValue.startsWith("https://")) {
        newValue = "https://" + newValue.replace(/^https?:\/\//, "");
      }
    }

    if (files) {
      const file = files[0];

      if (name === "company_photo") {
        const maxSizeMB = 2;
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        if (file.size > maxSizeBytes) {
          setErrors((prev) => ({
            ...prev,
            company_photo: `File is too large. Maximum allowed size is ${maxSizeMB}MB.`,
          }));

          // Clear invalid file from form state
          setFormData((prev) => ({
            ...prev,
            company_photo: null,
          }));

          return;
        } else {
          // Clear file size error if valid
          setErrors((prev) => ({
            ...prev,
            company_photo: undefined,
          }));
        }
      }

      setFormData((prev) => ({
        ...prev,
        [name]: files,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const data = new FormData();
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phone", formData.phone);
    data.append("status", "ACTIVE");
    data.append("role", "EMPLOYER");

    data.append("company_name", formData.company_name);
    data.append("company_type", formData.company_type);
    data.append("job_category_id", formData.job_category_id);
    data.append("stablished_in", formData.stablished_in);
    data.append("company_website", formData.company_website);
    data.append("company_description", formData.company_description);
    data.append("address", formData.address);
    // data.append("company_status", formData.company_status);

    if (formData.company_photo && formData.company_photo.length > 0) {
      data.append("company_photo", formData.company_photo[0]);
    }

    mutate(data, {
      onSuccess: () => {
        notification.success({
          message: "Registration successful",
          description: "Please check your email For Verification!",
        });
        setFormData({});
        setStep(1);
      },
      onError: (errorMsg) => {
        if (
          errorMsg.data &&
          errorMsg.data.email &&
          errorMsg.data.email[0] === "The email has already been taken."
        ) {
          message.error(
            "This email is already taken. Please use another email."
          );
        }
      },

      onSettled: () => {
        setLoading(false);
      },
    });
  };

  const companyTypeOptions = [
    { label: "Company/Corporation", value: "CORPORATION" },
    { label: "Fully Government", value: "FULLY_GOVERNMENT" },
    { label: "NGO", value: "NGO" },
    { label: "NPO", value: "NPO" },
    { label: "UN", value: "UN" },
    { label: "International NGO", value: "INTERNATIONAL_NGO" },
    { label: "Semi Government", value: "SEMI_GOVERNMENT" },
    { label: "Government Post Paid", value: "GOVERNMENT_POST_PAID" },
    {
      label: "International Package Post Paid",
      value: "INTERNATIONAL_PACKAGE_POST_PAID",
    },
    {
      label: "Pay Agent Modality NTA Base",
      value: "PAY_AGENT_MODALITY_NTA_BASE",
    },
    { label: "DAI Post Paid", value: "DAI_POST_PAID" },
    {
      label: "Privacy Poster Organization",
      value: "PRIVACY_POSTER_ORGANIZATION",
    },
  ];

  return (
    <form onSubmit={step === 1 ? handleNext : handleSubmit}>
      {step === 1 && (
        <>
          <h3>Step 1: Personal Information</h3>

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="John Doe"
              minLength={2}
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Doe"
              value={formData.last_name}
              onChange={handleChange}
              className="form-control"
              required
              minLength={2}
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="jDl8g@example.com"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            />
            {errors.email && (
              <div className="text-danger" style={{ marginTop: "5px" }}>
                {errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="+8801234567890"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              required
              pattern="^\+?[0-9]{7,15}$"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
            {passwordTouched && (
              <div className="password-validation mt-2">
                <div className={`small ${passwordValidation.hasMinLength ? 'text-success' : 'text-warning'}`}>
                  {passwordValidation.hasMinLength ? '✓' : '⚠'} At least 8 characters
                </div>
                <div className={`small ${passwordValidation.hasUpperCase ? 'text-success' : 'text-warning'}`}>
                  {passwordValidation.hasUpperCase ? '✓' : '⚠'} At least one uppercase letter
                </div>
                <div className={`small ${passwordValidation.hasLowerCase ? 'text-success' : 'text-warning'}`}>
                  {passwordValidation.hasLowerCase ? '✓' : '⚠'} At least one lowercase letter
                </div>
                <div className={`small ${passwordValidation.hasNumber ? 'text-success' : 'text-warning'}`}>
                  {passwordValidation.hasNumber ? '✓' : '⚠'} At least one number
                </div>
                <div className={`small ${passwordValidation.hasSpecialChar ? 'text-success' : 'text-warning'}`}>
                  {passwordValidation.hasSpecialChar ? '✓' : '⚠'} At least one special character
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <button className="theme-btn btn-style-one" type="submit">
              Next
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Step 2: Company Information</h3>

          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="company_name"
              placeholder="Naikbeen Control Panel Company"
              value={formData.company_name}
              onChange={handleChange}
              className="form-control"
              required
              minLength={2}
              maxLength={100}
            />
          </div>

          <div className="mb-3 form-group">
            <label htmlFor="companyType" className="form-label fw-bold">
              Company Type
            </label>
            <select
              name="company_type"
              id="companyType"
              placeholder="Select Company Type"
              className="form-select form-select-lg"
              value={formData.company_type}
              onChange={handleChange}
              required
            >
              <option value="">Select Company Type</option>
              {companyTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 form-group">
            <label htmlFor="category" className="form-label fw-bold">
              Category
            </label>
            <Select
              required
              options={options}
              value={options?.find(
                (opt) => opt?.value === formData?.job_category_id
              )}
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  job_category_id: selectedOption?.value,
                })
              }
              placeholder="Select Category"
              isClearable
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: "6px",
                  color: "#696969",
                  backgroundColor: "#f0f5f7",
                  fontSize: "16px",
                  minHeight: "38px",
                  boxShadow: "none",
                  border: "none",
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: "6px",
                }),
              }}
            />
          </div>

          <div className="form-group">
            <label>Established In</label>
            <input
              type="text"
              name="stablished_in"
              value={formData.stablished_in}
              onChange={handleChange}
              className="form-control"
              pattern="^(19|20)\d{2}$"
              placeholder="e.g. 2010"
            />
          </div>

          <div className="form-group">
            <label>Company Website</label>
            <input
              type="text"
              name="company_website"
              value={formData.company_website}
              onChange={handleChange}
              className="form-control"
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label>Company Description</label>
            <textarea
              name="company_description"
              placeholder="Brief description of your company"
              value={formData.company_description}
              onChange={handleChange}
              className="form-control"
              maxLength={1000}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              placeholder="Company address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              maxLength={255}
            />
          </div>

          {/* <div className="form-group">
            <label>Company Status</label>
            <input
              type="text"
              name="company_status"
              value={formData.company_status}
              onChange={handleChange}
              className="form-control"
            />
          </div> */}

         <div className="form-group ">
  <label>Company Logo</label>
  <input
    type="file"
    name="company_photo"
    accept="image/*"
    onChange={handleChange}
    className="form-control"
    required
  />
  <div className="mt-2 alert alert-info py-2 px-3 small mb-0">
    📷 Upload a clear Logo Company (JPG, PNG). <br />
    ⚠️ Max file size: <strong>2MB</strong>
  </div>
  {errors.company_photo && (
    <div className="text-danger mt-2">{errors.company_photo}</div>
  )}
</div>

<div className="form-group d-flex align-items-center" style={{ gap: "5px" }}>
  <button
    className="theme-btn btn-style-one"
    type="button"
    onClick={handleBack}
  >
    Back
  </button>

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
    {loading ? "Registering..." : "Register"}
  </button>
</div>

        </>
      )}
    </form>
  );
};

export default EmployerRegistrationForm;
