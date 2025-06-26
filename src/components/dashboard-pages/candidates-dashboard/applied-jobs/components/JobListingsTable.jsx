import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useGetAuthUserData } from "@/queries/user.query.js";
import { useSingleDelete } from "@/queries/apply.job.query.js";
import { Modal } from "antd";
import { useCallback, useState } from "react";
const JobListingsTable = () => {
  const { data, isLoading } = useGetAuthUserData();
  const { mutate: singleDelete } = useSingleDelete();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ApplyJobToDelete, setApplyJobToDelete] = useState(null);
  const appliedJobs = Array.isArray(data?.user?.apply_job)
    ? data.user.apply_job
    : data?.user?.apply_job
    ? [data.user.apply_job] 
    : [];

  const singleApplyJobDelete = useCallback(
    (id) => {
      singleDelete(
        { id },
        {
          onSuccess: () => {
            notification.success({
              message: "The Apply Job Record has Deleted successfully.",
            });
            setPagination((prev) => ({ ...prev, current: 10 }));
          },
          onError: (error) => {
            notification.error({
              message: "Error in deleting the Apply job.",
              description: error.message,
            });
          },
        }
      );
    },
    [singleDelete]
  );
  const showDeleteConfirm = (id) => {
    setIsModalVisible(true);
    setApplyJobToDelete(id);
  };
  const handleOk = () => {
    singleApplyJobDelete(ApplyJobToDelete);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Applied Jobs</h4>
        <div className="chosen-outer">
          <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 Years</option>
          </select>
        </div>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Date Applied</th>
                {/* <th>Status</th> */}
                {/* <th>Action</th> */}
              </tr>
            </thead>

            <tbody>
              {appliedJobs?.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            <img
                              src={`${
                                import.meta.env.VITE_API_BASE_URL
                              }/storage/${
                                item.post_job?.company?.company_photo
                              }`}
                              alt="Company Logo"
                              style={{
                                width: 50,
                                height: 50,
                                objectFit: "cover",
                              }}
                            />
                          </span>
                          <h4>
                            <Link to={`/job-details/${item.post_job?.id}`}>
                              {item.post_job?.job_title}
                            </Link>
                          </h4>
                          <ul className="job-info">
                            <li>
                              <span className="icon flaticon-briefcase"></span>
                              {item.post_job?.job_type}
                            </li>
                            <li>
                              <span className="icon flaticon-map-locator"></span>
                              {item.post_job?.provinces},{" "}
                              {item.post_job?.countries}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{dayjs(item?.created_at).format("MMM D, YYYY")}</td>
                  {/* <td className="status">{item?.status}</td> */}
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        {/* <li>
                          <a
                            href={`${
                              import.meta.env.VITE_API_BASE_URL
                            }/storage${item.cv}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-text="View CV"
                          >
                            <span className="la la-eye"></span>
                          </a>
                        </li> */}
                        {/* <li>
                          <Button
                            onClick={() => showDeleteConfirm(item.id)}
                            type="primary"
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            style={{ marginLeft: "10px" }}
                          />
                        </li> */}
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}

              {data?.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    No applied jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Modal
            title="Delete Apply Job Record"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Okay"
            cancelText="Cancel"
          >
            <p>Are you sure to Delete applied job?</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default JobListingsTable;
