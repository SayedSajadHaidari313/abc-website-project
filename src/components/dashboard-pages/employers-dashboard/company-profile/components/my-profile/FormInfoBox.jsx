import { notification, message } from "antd";
import { useGetJobCategoryData } from "@/queries/job.category.query";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useUpdateEmployer } from "@/queries/get.employer.company.data";
import { useGetAuthEmployerData } from "@/queries/get.auth.employer.data.query";
import PhoneInput from "react-phone-input-2";

const FormInfoBox = () => {
  const { data: employerData } = useGetAuthEmployerData();
  const { data } = useGetJobCategoryData();
  const JobCategory = data || [];

  const { mutate } = useUpdateEmployer();
  const [loading, setLoading] = useState(false);
  const EmployerFinalData = employerData?.data || null;
  console.log('data in company', EmployerFinalData);
  

  const [formValues, setFormValues] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    status: "",
    role: "",
    job_category_id: [],
    company_description: "",
    address: "",
    company_name: "",
    company_status: "ACTIVE",
    company_type: "",
    company_website: "",
    stablished_in: "",
    photo: null,
    company_photo: null,
  });

  useEffect(() => {
    if (EmployerFinalData) {
      setFormValues({
        id: EmployerFinalData?.id || "",
        first_name: EmployerFinalData?.first_name || "",
        last_name: EmployerFinalData?.last_name || "",
        email: EmployerFinalData?.email || "",
        phone: EmployerFinalData?.phone || "",
        status: EmployerFinalData?.status || "",
        role: EmployerFinalData?.role || "",
        company_description:
          EmployerFinalData?.company?.company_description || "",
        job_category_id: EmployerFinalData?.company?.job_category_id || [],
        address: EmployerFinalData?.company?.address || "",
        company_name: EmployerFinalData?.company?.company_name || "",
        company_status: EmployerFinalData?.company?.company_status || "",
        company_type: EmployerFinalData?.company?.company_type || "",
        company_website: EmployerFinalData?.company?.company_website || "",
        stablished_in: EmployerFinalData?.company?.stablished_in || "",
        company_photo: null,
        photo: null,
      });
    }
  }, [EmployerFinalData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
  
    if (name === "company_photo" && file) {
      const validTypes = ["image/jpeg", "image/png"];
      const maxSize = 2 * 1024 * 1024; // 2MB
  
      if (!validTypes.includes(file.type)) {
        message.error("Only JPG and PNG images are allowed for company logo.");
        return;
      }
  
      if (file.size > maxSize) {
        message.error("File size must be less than 2MB.");
        return;
      }
    }
  
    setFormValues((prev) => ({ ...prev, [name]: file }));
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
      if (formValues.photo) {
        formData.append("photo", formValues.photo);
      }

      formData.append("address", formValues.address);
      formData.append("company_description", formValues.company_description);
      formData.append("company_name", formValues.company_name);
      formData.append("company_status", formValues.company_status);
      formData.append("company_type", formValues.company_type);
      formData.append("company_website", formValues.company_website);
      formData.append("stablished_in", formValues.stablished_in);
      formData.append(
        "job_category_id",
        JSON.stringify(formValues.job_category_id)
      );

      if (formValues.company_photo) {
        const validTypes = ["image/jpeg", "image/png"];
        const maxSize = 2 * 1024 * 1024;
      
        if (!validTypes.includes(formValues.company_photo.type)) {
          message.error("Only JPG and PNG images are allowed for company logo.");
          setLoading(false);
          return;
        }
      
        if (formValues.company_photo.size > maxSize) {
          message.error("Company logo must be under 2MB.");
          setLoading(false);
          return;
        }
      
        formData.append("company_photo", formValues.company_photo);
      }

      formData.append("_method", "PUT");

      mutate(formData, {
        onSuccess: () => {
          notification.success({
            message: "Success!",
            description: "Profile updated successfully!",
          });
        },
        onError: (error) => {
          notification.error({ message: "Update failed!" });
          console.error(error);
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    } catch (error) {
      console.error("Validation Error:", error);
      message.error("Please fill all required fields.");
      setLoading(false);
    }
  };

  const options = JobCategory?.map((option) => ({
    value: option.id,
    label: option.name,
  }));

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
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Full Name */}
        <div className="form-group col-lg-6">
          <label>First Name</label>
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

        {/* company name */}
        <div className="form-group col-lg-6">
          <label>Company Name</label>
          <input
            type="text"
            name="company_name"
            value={formValues.company_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="form-group col-lg-6">
          <label>Company Type</label>
          <Select
            options={companyTypeOptions}
            value={companyTypeOptions.find(
              (opt) => opt.value === formValues.company_type
            )}
            onChange={(selectedOption) =>
              setFormValues((prev) => ({
                ...prev,
                company_type: selectedOption.value,
              }))
            }
          />
        </div>

        {/* Job Categories */}
        <div className="mb-3 form-group">
          <label htmlFor="category" className="form-label fw-bold">
            Category
          </label>
          <Select
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

        {/* company address */}
        <div className="form-group col-lg-6">
          <label>Company Address</label>
          <input
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group col-lg-6">
          <input
            type="text"
            name="company_status"
            value={formValues.company_status}
            onChange={handleChange}
            hidden
          />
        </div>

        {/* company website */}
        <div className="form-group col-lg-6">
          <label>Company Website</label>
          <input
            type="text"
            placeholder="https://example.com"
            name="company_website"
            value={formValues.company_website}
            onChange={handleChange}
            required
          />
        </div>

        {/* stablished_in */}
        <div className="form-group col-lg-6">
          <label>Company Stablished</label>
          <input
            type="text"
            name="stablished_in"
            value={formValues.stablished_in}
            onChange={handleChange}
            required
          />
        </div>

        {/* company_description */}
        <div className="form-group col-lg-12">
          <label>Company Description</label>
          <textarea
            name="company_description"
            value={formValues.company_description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Photo Upload */}
        <div className="row">

          <div className="col-lg-6 mb-4">
            <label className="form-label fw-bold">Company Logo</label>
            <div className="border rounded p-3 bg-light">
              <input
                type="file"
                name="company_photo"
                onChange={handleFileChange}
                className="form-control"
                style={{ cursor: "pointer" }}
              />
              <div className="mt-2 alert alert-info py-2 px-3 small mb-0">
                🏢 Upload a clear company logo (JPG, PNG). <br />
                ⚠️ Max file size: <strong>2MB</strong>
              </div>
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
