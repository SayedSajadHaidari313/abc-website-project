import { notification, message } from "antd";
import { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";

import { useGetAuthUserData } from "@/queries/user.query";
import { useUpdateUser } from "@/queries/website.query/user.query";

const FormInfoBox = () => {
  const { data: userData } = useGetAuthUserData();
  const { mutate } = useUpdateUser();

  // Support both array and object user data
  const userObj =
    userData?.user ||
    userData?.items?.[0] || // If items is an array, take the first user
    {};

  const [formValues, setFormValues] = useState({
    id: userObj.id,
    name: "",
    email: "",
    user_about: "",
    user_image: null,
    role_id: 2,
    user_prefer_country_id: 1,
  });

  useEffect(() => {
    if (userObj && userObj.id) {
      setFormValues({
        id: userObj.id,
        name: userObj.name || "",
        email: userObj.email || "",
        user_about: userObj.user_about || "",
        user_image: null,
        role_id: userObj.role_id || 2,
        user_prefer_country_id: userObj.user_prefer_country_id || 1,
      });
    }
  }, [userObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      // Check file size limit: 2MB = 2 * 1024 * 1024 bytes
      const maxSize = 2 * 1024 * 1024;
      if (name === "user_image" && file.size > maxSize) {
        message.error("Profile photo must be less than 2MB");
        return; // Don't update state
      }
      setFormValues((prev) => ({ ...prev, [name]: file }));
    }
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", formValues.id);
      formData.append("name", formValues.name);
      formData.append("email", formValues.email);
      formData.append("user_about", formValues.user_about);
      formData.append("role_id", formValues.role_id);
      formData.append(
        "user_prefer_country_id",
        formValues.user_prefer_country_id
      );
      if (formValues.user_image)
        formData.append("user_image", formValues.user_image);
      formData.append("_method", "PUT");
      mutate(formData, {
        onSuccess: () => {
          notification.success({
            message: "Success!",
            description: "Profile Updated successfully!",
          });
        },
        onError: (error) => {
          if (error.response && error.response.data) {
            notification.error({ message: "Update Failed!" });
            console.error(error);
          }
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    } catch (error) {
      message.error("Please fill all inputs");
    }
  };

  const RequiredLabel = ({ text }) => (
    <label>
      {text} <span className="text-danger">*</span>
    </label>
  );

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Name */}
        <div className="form-group col-lg-12">
          <RequiredLabel text="Name" />
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* About */}
        <div className="form-group col-lg-12">
          <label>About</label>
          <textarea
            name="user_about"
            value={formValues.user_about}
            onChange={handleChange}
          ></textarea>
        </div>
        {/* Photo Upload */}
        <div className="form-group col-lg-12 mb-4">
          <label className="form-label fw-bold">Profile Photo</label>
          <div className="border rounded p-3 text-center bg-light">
            <input
              type="file"
              name="user_image"
              id="photoUpload"
              onChange={handleFileChange}
              className="form-control file-input-cursor"
            />
            <div className="mt-2 alert alert-info py-2 px-3 small mb-0">
              📷 Upload a clear profile photo (JPG, PNG). <br />
              ⚠️ Max file size: <strong>2MB</strong>
            </div>
          </div>
        </div>
        {/* Submit */}
        <div className="form-group col-lg-12">
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
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
