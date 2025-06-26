import { Modal, Descriptions, Tooltip } from "antd";
import PropTypes from "prop-types";

// پاک کردن تگ‌های HTML
const stripHtmlTags = (html) => {
  if (!html) return "-";
  return html.replace(/<[^>]*>/g, '').trim();
};

const truncate = (text, length = 50) => {
  if (!text) return "-";
  return text.length > length ? text.slice(0, length) + "..." : text;
};

const renderWithTooltip = (text, length = 50) => {
  const cleanText = stripHtmlTags(text);
  return (
    <Tooltip title={cleanText || "-"}>
      <span>{truncate(cleanText, length)}</span>
    </Tooltip>
  );
};

const JobViewModal = ({ visible, job, onClose }) => {
  return (
    <Modal
      title={
        <div style={{ textAlign: "center", width: "100%" }}>
          <strong>Job Posting Details</strong>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Descriptions
        bordered
        column={2}
        labelStyle={{ fontWeight: "bold", width: "30%" }}
      >
        <Descriptions.Item label="Job Title" span={2}>{renderWithTooltip(job.job_title)}</Descriptions.Item>
        <Descriptions.Item label="Company Name" span={2}>{renderWithTooltip(job.company?.company_name)}</Descriptions.Item>

        <Descriptions.Item label="Email" span={2}>{renderWithTooltip(job.email)}</Descriptions.Item>
        <Descriptions.Item label="Location" span={2}>{renderWithTooltip(`${job.provinces}, ${job.countries}`)}</Descriptions.Item>

        <Descriptions.Item label="Number of Vacancies" span={2}>{job.number_Of_vacancy}</Descriptions.Item>
        <Descriptions.Item label="Reference" span={2}>{renderWithTooltip(job.reference)}</Descriptions.Item>

        <Descriptions.Item label="Salary Range" span={2}>{renderWithTooltip(job.salary_range)}</Descriptions.Item>
        <Descriptions.Item label="Experience" span={2}>{renderWithTooltip(job.experiance)}</Descriptions.Item>

        <Descriptions.Item label="Probation Period" span={2}>{renderWithTooltip(job.probation_period)}</Descriptions.Item>
        <Descriptions.Item label="Contract Type" span={2}>{renderWithTooltip(job.contract_type?.name)}</Descriptions.Item>

        <Descriptions.Item label="Contract Duration" span={2}>{renderWithTooltip(job.contract_duration)}</Descriptions.Item>
        <Descriptions.Item label="Extensible Contract" span={2}>{job.contract_extensible === "yes" ? "Yes" : "No"}</Descriptions.Item>

        <Descriptions.Item label="Education Level" span={2}>{renderWithTooltip(job.education_level?.education_level)}</Descriptions.Item>
        <Descriptions.Item label="Job Category" span={2}>{renderWithTooltip(job.job_category?.name)}</Descriptions.Item>

        <Descriptions.Item label="Apply Online Link" span={2}>{renderWithTooltip(job.apply_online_link)}</Descriptions.Item>
        <Descriptions.Item label="Submission Email" span={2}>{renderWithTooltip(job.submission_email)}</Descriptions.Item>

        <Descriptions.Item label="Gender" span={2}>{renderWithTooltip(job.gender)}</Descriptions.Item>
        <Descriptions.Item label="Job Type" span={2}>{renderWithTooltip(job.job_type)}</Descriptions.Item>

        <Descriptions.Item label="Job Status" span={2}>{renderWithTooltip(job.job_status)}</Descriptions.Item>
        <Descriptions.Item label="Post Date" span={2}>{job.post_date}</Descriptions.Item>

        <Descriptions.Item label="Closing Date" span={2}>{job.closing_date}</Descriptions.Item>

        <Descriptions.Item label="Job Requirement" span={2}>
          {renderWithTooltip(job.job_requirement, 100)}
        </Descriptions.Item>
        <Descriptions.Item label="Submission Guideline" span={2}>
          {renderWithTooltip(job.submission_guideline, 100)}
        </Descriptions.Item>
        <Descriptions.Item label="Job Description" span={2}>
          {renderWithTooltip(job.job_description, 100)}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

JobViewModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  job: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default JobViewModal;
