import { notification, message } from "antd";
import { useAuthStore } from "@/auth/auth.store";
import {
  useGetJobCategoryData,
} from "@/queries/job.category.query";
import { useUpdateJobSeeker } from "@/queries/jobseeker.query";
import { useGetAuthUserData } from "@/queries/user.query";
import { useState, useEffect } from "react";
import Select from "react-select";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
const FormInfoBox = () => {
  const { data: userData } = useGetAuthUserData();
  const { data } = useGetJobCategoryData();
  const JobCategory = data || [];
  const { mutate } = useUpdateJobSeeker();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const UserFinalData = userData?.user || null;

  const [formValues, setFormValues] = useState({
    id: UserFinalData?.id,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    status: "",
    role: "",
    about: "",
    job_category_id: [],
    experience: "",
    gender: "",
    cv: null,
    photo: null,
  });

  useEffect(() => {
    if (UserFinalData) {
      setFormValues({
        id: UserFinalData?.id,
        first_name: UserFinalData?.first_name || "",
        last_name: UserFinalData?.last_name || "",
        email: UserFinalData?.email || "",
        phone: UserFinalData?.phone || "",
        status: UserFinalData?.status || "",
        role: UserFinalData?.role || "",
        about: UserFinalData?.jobseekerprofiles?.about || "",
        job_category_id:
          UserFinalData?.jobseekerprofiles?.job_category_id || [],
        password: "",
        confirmPassword: "",
        experience: UserFinalData?.jobseekerprofiles?.experience || "",
        gender: UserFinalData?.jobseekerprofiles?.gender || "",
        cv: null,
        photo: null,
      });
    }
  }, [UserFinalData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormValues((prev) => ({
      ...prev,
      job_category_id: selectedOption?.value || null,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
  
    if (file) {
      // Check file size limit: 2MB = 2 * 1024 * 1024 bytes
      const maxSize = 2 * 1024 * 1024;
  
      if (name === "photo" && file.size > maxSize) {
        message.error("Profile photo must be less than 2MB");
        return; // Don't update state
      }
  
      if (name === "cv" && file.size > maxSize) {
        message.error("Resume file must be less than 2MB");
        return; // Don't update state
      }
  
      setFormValues((prev) => ({ ...prev, [name]: file }));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", formValues.id);
      formData.append("first_name", formValues.first_name);
      formData.append("last_name", formValues.last_name);
      formData.append("email", formValues.email);
      formData.append("phone", formValues.phone);
      formData.append("status", formValues.status);
      formData.append("role", formValues.role);
      if (formValues.photo) formData.append("photo", formValues.photo);
      formData.append("about", formValues.about);
      formData.append("job_category_id", formValues.job_category_id);
      formData.append("experience", formValues.experience);
      formData.append("gender", formValues.gender);
      if (formValues.password && formValues.password.trim() !== "") {
        if (formValues.password !== formValues.confirmPassword) {
          message.error("Password and Confirm Password do not match!");
          setLoading(false);
          return;
        }
        formData.append("password", formValues.password);
      }
      if (formValues.cv) formData.append("cv", formValues.cv);
      formData.append("_method", "PUT");

      mutate(formData, {
        onSuccess: () => {
          notification.success({
            message: "Success!",
            description: "Profile Updated successfully!",
          });
          formRef.current.resetFields();
          handleModalCancel();
        },
        onError: (error) => {
          if (error.response && error.response.data) {
            notification.error({ message: "Insturction Failed!" });
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


  const options = JobCategory?.map((option) => ({
    value: option.id,
    label: option.name,
  }));
  const RequiredLabel = ({ text }) => (
    <label>
      {text} <span className="text-danger">*</span>
    </label>
  );

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Full Name */}
        <div className="form-group col-lg-6">
          <RequiredLabel text="First Name" />
          <input
            type="text"
            name="first_name"
            value={formValues.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group col-lg-6">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formValues.last_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group col-lg-6">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
            disabled
          />
        </div>

        {/* Phone */}
        <div className="form-group col-lg-6">
          <label>Phone</label>
          <PhoneInput
            country={"af"}
            value={formValues.phone}
            onChange={(phone) =>
              setFormValues((prev) => ({
                ...prev,
                phone: phone,
              }))
            }
            inputProps={{
              name: "phone",
              required: true,
              style: {
                width: "100%",
                height: "57px",
                background: " #f0f5f7",
                fontSize: "15px",
                border: "1px solid #f0f5f7",
                borderRadius: "6px",
              },
            }}
            // containerClass="w-100"

            // inputClass="form-control"
            // buttonClass="btn btn-light"
          />
        </div>

        {/* Experience */}
        <div className="form-group col-lg-6">
          <label>Experience</label>
          <input
            type="text"
            name="experience"
            value={formValues.experience}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="form-group col-lg-6">
          <label>Gender</label>
          <select
            name="gender"
            value={formValues.gender}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="ANY">Any</option>
          </select>
        </div>

        {/* About */}
        <div className="form-group col-lg-12">
          <label>About</label>
          <textarea
            name="about"
            value={formValues.about}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Job Categories */}
        <div className="mb-3 form-group">
          <label htmlFor="category" className="form-label fw-bold">
            Category
          </label>
          <Select
            required
            options={options}
            value={options?.find(
              (opt) => opt?.value === formValues?.job_category_id
            )}
            onChange={(selectedOption) =>
              setFormValues({
                ...formValues,
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
        {/* Change Password Section */}
        <div className="form-group col-lg-12 mt-4">
          <h5 className="fw-bold mb-3">Change Password (Optional)</h5>
        </div>

        <div className="form-group col-lg-6">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-lg-6">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {/* Photo Upload */}
        <div className="row">
          {/* Photo Upload */}
          <div className="col-lg-6 mb-4">
            <label className=" form-label fw-bold">Profile Photo</label>
            <div className="  border rounded p-3 text-center bg-light">
              <input
                type="file"
                name="photo"
                id="photoUpload"
                onChange={handleFileChange}
                className="form-control"
                style={{ cursor: "pointer" }}
              />
              <div className="mt-2 alert alert-info py-2 px-3 small mb-0">
                📷 Upload a clear profile photo (JPG, PNG). <br />
                ⚠️ Max file size: <strong>2MB</strong>
              </div>
            </div>
          </div>

          {/* CV Upload */}
          <div className="col-lg-6 mb-4">
            <label className="form-label fw-bold">Upload Resume!</label>
            <div className="border rounded p-3 text-center bg-light">
              <input
                type="file"
                name="cv"
                id="cvUpload"
                onChange={handleFileChange}
                className="form-control"
                style={{ cursor: "pointer" }}
              />
              <div className="mt-2 alert alert-info py-2 px-3 small mb-0">
                Upload your latest Resume (PDF, DOCX) <br />
                ⚠️ Max file size: <strong>2MB</strong>
              </div>
              <small className="text-muted d-block mt-2"></small>
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
