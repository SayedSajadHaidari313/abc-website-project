import { useState } from "react";
import { message, notification } from "antd";
import Select from "react-select";
import { useGetAllCategoryData } from "@/queries/website.query/category.query";
import { usePostUserCreate } from "@/queries/website.query/register.user.query";
import { useGetAllCitiesData } from "@/queries/website.query/cities.query";
import { useGetAllCountryData } from "@/queries/website.query/country.query";

const BusinessRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    user_image: null,
    item_title: "",
    category_id: "",
    country_id: "",
    city_id: "",
    item_description: "",
    item_phone: "",
  });
  const [errors, setErrors] = useState({});
  const { mutate } = usePostUserCreate();
  const { data: categoryData } = useGetAllCategoryData();
  const category = categoryData?.data || [];
  const parentCategories = category?.filter(
    (item) => item.category_parent_id === null
  );
  const options = parentCategories?.map((option) => ({
    value: option.id,
    label: option.category_name,
  }));
  const { data: cityData } = useGetAllCitiesData();
  const city = cityData?.data || [];

  const cityOptions = city?.map((option) => ({
    value: option.id,
    label: option.city_name,
  }));
  const { data: countryData } = useGetAllCountryData();
  const country = countryData?.data || [];

  const countryOptions = country?.map((option) => ({
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
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newValue = value;

    if (name === "password") {
      validatePassword(value);
    }

    if (name === "confirm_password" && errors.confirm_password) {
      setErrors((prev) => ({ ...prev, confirm_password: "" }));
    }

    if (files) {
      const file = files[0];
      const maxSizeMB = 2;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;

      if (file.size > maxSizeBytes) {
        setErrors((prev) => ({
          ...prev,
          [name]: `File is too large. Maximum allowed size is ${maxSizeMB}MB.`,
        }));
        setFormData((prev) => ({
          ...prev,
          [name]: null,
        }));
        return;
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
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
    if (formData.password !== formData.confirm_password) {
      setErrors({
        ...errors,
        confirm_password: "Passwords do not match.",
      });
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setErrors({
        ...errors,
        confirm_password: "Passwords do not match.",
      });
      setLoading(false);
      setStep(1);
      message.error("Passwords do not match. Please correct and try again.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role_id", 3);
    data.append("status", "ACTIVE");
    data.append("item_title", formData.item_title);
    data.append("category_id", formData.category_id);
    data.append("city_id", formData.city_id);
    data.append("country_id", formData.country_id);
    data.append("item_description", formData.item_description);
    data.append("item_phone", formData.item_phone);
    // data.append("item_social_facebook", formData.item_social_facebook);
    // data.append("item_website", formData.item_website);

    if (formData.user_image && formData.user_image.length > 0) {
      data.append("user_image", formData.user_image[0]);
    }

    mutate(data, {
      onSuccess: () => {
        notification.success({
          message: "Registration successful",
          item_description: "Please check your email for verification!",
        });
        setFormData({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
          user_image: null,
          item_title: "",
          category_id: "",
          country_id: "",
          city_id: "",
          item_description: "",
          item_phone: "",
          // item_website: "https://",
          // item_social_facebook: "https://",
        });
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
        } else {
          // message.error("An unexpected error occurred. Please try again.");
        }
      },
      onSettled: () => {
        setLoading(false);
      },
    });
  };

  return (
    <form onSubmit={step === 1 ? handleNext : handleSubmit}>
      {step === 1 && (
        <>
          <h4 className="form-heading">Step 1: Personal Information</h4>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="John Doe"
              minLength={2}
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="johndoe@example.com"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
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
                <div
                  className={`small ${
                    passwordValidation.hasMinLength
                      ? "text-success"
                      : "text-warning"
                  }`}
                >
                  {passwordValidation.hasMinLength ? "✓" : "⚠"} At least 8
                  characters
                </div>
                <div
                  className={`small ${
                    passwordValidation.hasUpperCase
                      ? "text-success"
                      : "text-warning"
                  }`}
                >
                  {passwordValidation.hasUpperCase ? "✓" : "⚠"} At least one
                  uppercase letter
                </div>
                <div
                  className={`small ${
                    passwordValidation.hasLowerCase
                      ? "text-success"
                      : "text-warning"
                  }`}
                >
                  {passwordValidation.hasLowerCase ? "✓" : "⚠"} At least one
                  lowercase letter
                </div>
                <div
                  className={`small ${
                    passwordValidation.hasNumber
                      ? "text-success"
                      : "text-warning"
                  }`}
                >
                  {passwordValidation.hasNumber ? "✓" : "⚠"} At least one number
                </div>
                <div
                  className={`small ${
                    passwordValidation.hasSpecialChar
                      ? "text-success"
                      : "text-warning"
                  }`}
                >
                  {passwordValidation.hasSpecialChar ? "✓" : "⚠"} At least one
                  special character
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              placeholder="********"
              value={formData.confirm_password}
              onChange={handleChange}
              className="form-control"
              required
            />
            {errors.confirm_password && (
              <div className="text-danger" style={{ marginTop: "5px" }}>
                {errors.confirm_password}
              </div>
            )}
          </div>

          <div className="form-group ">
            <label>User Image</label>
            <input
              type="file"
              name="user_image"
              accept="image/*"
              onChange={handleChange}
              className="form-control"
              required
            />
            <div className="mt-2 alert alert-info py-2 px-3 small mb-0">
              📷 Upload a clear profile picture (JPG, PNG). <br />
              ⚠️ Max file size: <strong>2MB</strong>
            </div>
            {errors.user_image && (
              <div className="text-danger mt-2">{errors.user_image}</div>
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
          <h4 style={{ fontSize: "20px", marginBottom: "10px", color: "blue" }}>
            Step 2: Business Information
          </h4>

          <div className="form-group">
            <label>Business Name</label>
            <input
              type="text"
              name="item_title"
              placeholder="e.g. Naikbeen Control Panel"
              value={formData.item_title}
              onChange={handleChange}
              className="form-control"
              required
              minLength={2}
              maxLength={100}
            />
          </div>

          <div className="mb-3 form-group">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <Select
              required
              options={options}
              value={options?.find(
                (opt) => opt?.value === formData?.category_id
              )}
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  category_id: selectedOption?.value || "",
                })
              }
              placeholder="Select Category"
              isClearable
              isMulti={false}
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: "6px",
                  color: "#696969",
                  backgroundColor: "#fff",
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

          <div className="mb-3 form-group">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <Select
              required
              options={countryOptions}
              value={countryOptions?.find(
                (opt) => opt?.value === formData?.country_id
              )}
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  country_id: selectedOption?.value || "",
                })
              }
              placeholder="Select Country"
              isClearable
              isMulti={false}
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: "6px",
                  color: "#696969",
                  backgroundColor: "#fff",
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

          <div className="mb-3 form-group">
            <label htmlFor="city" className="">
              City
            </label>
            <Select
              required
              options={cityOptions}
              value={cityOptions?.find(
                (opt) => opt?.value === formData?.city_id
              )}
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  city_id: selectedOption?.value || "",
                })
              }
              placeholder="Select City"
              isClearable
              isMulti={false}
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: "6px",
                  color: "#696969",
                  backgroundColor: "#fff",
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
            <label>Short item description</label>
            <textarea
              name="item_description"
              placeholder="Brief item_description of your business"
              value={formData.item_description}
              onChange={handleChange}
              // className="form-control"
              maxLength={1000}
              style={{ backgroundColor: "#fff" }}
              required
            />
          </div>

          <div className="form-group">
            <label>Company phone Number (optional)</label>
            <input
              type="text"
              name="item_phone"
              placeholder="+1234567890"
              value={formData.item_phone}
              onChange={handleChange}
              className="form-control"
              pattern="^\+?[0-9]{7,15}$"
            />
          </div>
          {/* 
          <div className="form-group">
            <label>Business / Company Website</label>
            <input
              type="text"
              name="item_website"
              value={formData.item_website}
              onChange={handleChange}
              className="form-control"
              placeholder="https://example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Facebook Link</label>
            <input
              type="text"
              name="item_social_facebook"
              value={formData.item_social_facebook}
              onChange={handleChange}
              className="form-control"
              placeholder="https://example.com"
              required
            />
          </div> */}

          <div
            className="form-group d-flex align-items-center"
            style={{ gap: "5px" }}
          >
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

export default BusinessRegistrationForm;
