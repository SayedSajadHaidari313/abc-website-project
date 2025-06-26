import { useState } from "react";
import PropTypes from "prop-types";
import { notification, Progress } from "antd";
import axios from "axios";
import { useAuthStore } from "@/auth/auth.store";

const ApplyJobModalContent = ({ postJobId, onClose }) => {
  const { token, user } = useAuthStore();
  const [cv, setCv] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || user?.role !== "JOB_SEEKER") {
      notification.error({
        message: "Unauthorized",
        description: "You must be logged in as a job seeker to apply.",
      });
      return;
    }

    if (!cv) {
      notification.error({ message: "CV is required!" });
      return;
    }

    const formData = new FormData();
    formData.append("cv", cv);
    if (coverLetter) formData.append("cover_letter", coverLetter);
    formData.append("user_id", user.id);
    formData.append("post_job_id", postJobId);
    formData.append("status", "PENDING");

    try {
      setIsUploading(true);
       await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/jobseeker/apply_jobs`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );
    
      notification.success({ message: "Successfully applied!" });
      setIsUploading(false);
    
      onClose(); // بستن مدال
    } catch (error) {
  setIsUploading(false);

  const description =
    error?.response?.data?.message || // General error (like duplicate apply)
    (error?.response?.data?.errors
      ? Object.values(error.response.data.errors).join(" ")
      : "Something went wrong.");

  notification.error({
    message: "Error submitting form",
    description,
  });
}

    
  };

  return (
    <form className="default-form job-apply-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <div className="uploading-outer apply-cv-outer">
            <div className="uploadButton">
              <input
                id="cv-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCv(e.target.files[0])}
                style={{ display: "none" }}
              />
              <label
                htmlFor="cv-upload"
                className="uploadButton-button ripple-effect"
              >
                Upload CV (doc, docx, pdf)
              {cv && <div style={{ marginTop: 8 }}>{cv.name}</div>}
              </label>
            </div>

            <br />

            <div className="uploadButton">
              <input
                id="cover-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCoverLetter(e.target.files[0])}
                style={{ display: "none" }}
              />
              <label
                htmlFor="cover-upload"
                className="uploadButton-button ripple-effect"
              >
                Upload Cover Letter (optional)
              {coverLetter && (
                <div style={{ marginTop: 8 }}>{coverLetter.name}</div>
              )}
              </label>
            </div>
          </div>
        </div>

        {isUploading && (
          <div className="col-12 mb-2">
            <Progress percent={uploadProgress} />
          </div>
        )}

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button
            className="theme-btn btn-style-one w-100"
            type="submit"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Apply Job"}
          </button>
        </div>
      </div>
    </form>
  );
};

ApplyJobModalContent.propTypes = {
  postJobId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ApplyJobModalContent;