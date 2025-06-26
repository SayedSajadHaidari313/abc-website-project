import { useGetShowJobSeekerApplyJobData } from "@/queries/employer.apply.job";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
import { Modal, Descriptions, Spin, Alert, Avatar, Divider } from "antd";
import PropTypes from "prop-types";

const ViewApplicationModal = ({ applyJobId, onClose }) => {
  const { data, isLoading, isError } =
    useGetShowJobSeekerApplyJobData(applyJobId);

  if (!applyJobId) return null;

  const BASE_URL = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

  const formatFileUrl = (path) => {
    if (!path) return null;
    return `${BASE_URL}${path.replace(/\\/g, "/")}`;
  };

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/${path.replace(/\\/g, "/")}`;
  };

  return (
    <Modal
      open={!!applyJobId}
      onCancel={onClose}
      footer={null}
      width={850}
      title={
        <div style={{ textAlign: "center", width: "100%" }}>
          <strong>Application Details</strong>
        </div>
      }
    >
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <Spin size="large" />
        </div>
      ) : isError ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <Alert
            message="Failed to fetch application details!"
            type="error"
            showIcon
          />
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                size={64}
                src={
                  data?.user?.photo
                    ? formatImageUrl(data?.user?.first_name)
                    : null
                }
                style={{ marginRight: 16 }}
                alt={
                  data?.user?.first_name
                    ? `${data?.user?.first_name} ${data?.user?.last_name}`
                    : "User Avatar"
                }
              />
              <div>
                <h3 style={{ margin: 0 }}>
                  {data?.user?.first_name} {data?.user?.last_name}
                </h3>
                <p style={{ margin: 0, color: "#888" }}>{data?.user?.email}</p>
                <p style={{ margin: 0, color: "#888" }}>{data?.user?.phone}</p>
              </div>
            </div>
          </div>

          <Descriptions
            bordered
            column={1}
            size="middle"
            labelStyle={{ fontWeight: "bold", width: 200 }}
          >
            <Descriptions.Item label="Application Status">
              {data?.status}
            </Descriptions.Item>

            <Descriptions.Item label="Applied On">
              {new Date(data?.post_job?.post_date).toLocaleDateString()}
            </Descriptions.Item>

            <Descriptions.Item label="Job Title">
              {data?.post_job?.job_title} —{" "}
              {data?.post_job?.company?.company_name}
            </Descriptions.Item>

            <Descriptions.Item label="Location">
              {data?.post_job?.countries} / {data?.post_job?.provinces}
            </Descriptions.Item>

            <Descriptions.Item label="Salary Range">
              {data?.post_job?.salary_range}
            </Descriptions.Item>

            <Descriptions.Item label="Experience (Job Seeker)">
              {data?.user?.jobseekerprofiles?.experience || "Not specified"}
            </Descriptions.Item>

            <Descriptions.Item label="About Job Seeker">
              {data?.user?.jobseekerprofiles?.about ||
                "No description provided."}
            </Descriptions.Item>

            <Descriptions.Item label="CV">
              <a
                href={data.cv ? formatFileUrl(data.cv) : null}
                target="_blank"
                rel="noreferrer"
              >
                Download CV
              </a>
            </Descriptions.Item>

            <Descriptions.Item label="Cover Letter">
              <a
                href={
                  data.cover_letter ? formatFileUrl(data.cover_letter) : null
                }
                target="_blank"
                rel="noreferrer"
              >
                Download Cover Letter
              </a>
            </Descriptions.Item>
          </Descriptions>

          <Divider style={{ margin: "24px 0" }} />

          <Descriptions
            title={
              <div style={{ textAlign: "center", width: "100%" }}>
                <strong>Job Posting Details</strong>
              </div>
            }
            bordered
            column={1}
            size="middle"
            labelStyle={{ fontWeight: "bold", width: 200 }}
          >
            <Descriptions.Item label="Job Description">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    data?.post_job?.job_description ||
                    "<i>No description provided.</i>",
                }}
              />
            </Descriptions.Item>

            <Descriptions.Item label="Job Requirements">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    data?.post_job?.job_requirement ||
                    "<i>No requirements provided.</i>",
                }}
              />
            </Descriptions.Item>

            <Descriptions.Item label="Closing Date">
              {new Date(data?.post_job?.closing_date).toLocaleDateString()}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Modal>
  );
};

ViewApplicationModal.propTypes = {
  applyJobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose: PropTypes.func.isRequired,
};

export default ViewApplicationModal;
