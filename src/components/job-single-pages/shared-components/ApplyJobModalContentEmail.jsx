import PropTypes from "prop-types";
import { CopyOutlined } from "@ant-design/icons";
import { message } from "antd";

const ApplyJobModalContentEmail = ({ submissionEmail, submissionGuideline, onClose }) => {
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(submissionEmail);
      message.success("Email copied to clipboard!");
    } catch (err) {
      message.error("Failed to copy email.");
    }
  };

  return (
    <div className="p-3">
      {submissionGuideline && (
        <div className="mb-4">
          <h6 className="fw-bold mb-2">Submission Guideline</h6>
          <div
            className="border rounded p-3"
            style={{ backgroundColor: "#f8f9fa", fontSize: "14px" }}
            dangerouslySetInnerHTML={{ __html: submissionGuideline }}
          />
        </div>
      )}

      <div className="mb-3">
        <h6 className="fw-bold mb-2">Submission Email</h6>
        <div
          className="d-flex align-items-center justify-content-between p-2 rounded"
          style={{ backgroundColor: "#f0f2f5", border: "1px solid #d9d9d9" }}
        >
          <span style={{ fontSize: "14px", wordBreak: "break-all" }}>{submissionEmail}</span>
          <button
            onClick={handleCopyEmail}
            className="btn btn-sm btn-link text-decoration-none"
            title="Copy email"
          >
            <CopyOutlined />
          </button>
        </div>
      </div>

      <button className="btn btn-primary w-100 mt-3" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

ApplyJobModalContentEmail.propTypes = {
  submissionEmail: PropTypes.string.isRequired,
  submissionGuideline: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ApplyJobModalContentEmail;
