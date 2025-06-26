import { useGetAuthEmployerData } from "@/queries/get.auth.employer.data.query";
import { useGetPostJobsData } from "@/queries/post.jobs.query";
import { Alert, Avatar, Modal, notification, Skeleton } from "antd";
import { Link } from "react-router-dom";
import ApplyJobCount from "./ApplyJobCount";
import { useState } from "react";
import JobViewModal from "./JobViewModal";
import { useSingleDelete } from "@/queries/employer.post.job";
import JobEditModal from "./JobEditModal";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const JobListingsTable = () => {
  const { mutate: deleteJob } = useSingleDelete();
  const [viewJob, setViewJob] = useState(null);
  const [editJob, setEditJob] = useState(null);

  const { data, isLoading, isError } = useGetPostJobsData();
  const { data: employerData } = useGetAuthEmployerData();

  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />;

  if (isError)
    return (
      <Alert
        message="Error fetching data"
        description="Please try again later."
        type="error"
        showIcon
      />
    );

  const jobs = data?.data?.filter(
    (job) =>
      job?.company?.company_name === employerData?.data?.company?.company_name
  );

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/${path.replace(/\\/g, "/")}`;
  };

  const handleDelete = (jobId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this job?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      cancelText: "Cancel",
      okType: "danger",
      onOk: () => {
        deleteJob(
          { id: jobId },
          {
            onSuccess: (res) => {
              notification.success({
                message: "Success",
                description: res?.status || "Job deleted successfully.",
              });
            },
            onError: () => {
              notification.error({
                message: "Error",
                description: "Failed to delete the job. Please try again.",
              });
            },
          }
        );
      },
    });
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Job Listings</h4>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Applications</th>
                <th>Created & Expired</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs?.slice(0, 4).map((item) => (
                <tr key={item.id}>
                  <td>
                    {/* <!-- Job Block --> */}
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            <Avatar
                              size={64}
                              src={
                                item?.company?.company_photo
                                  ? formatImageUrl(item.company?.company_photo)
                                  : null
                              }
                              atl={item?.company?.name}
                            >
                              {!item?.company?.company_photo &&
                              item?.company?.name
                                ? item?.company?.name.charAt(0).toUpperCase()
                                : ""}
                            </Avatar>
                          </span>
                          <h4>
                            <Link to={`/job-details/${item.id}`}>
                              {item.job_title}
                            </Link>
                          </h4>
                          <ul className="job-info">
                            <li>
                              <span className="icon flaticon-briefcase"></span>
                              {item?.company?.company_name}
                            </li>
                            <li>
                              <span className="icon flaticon-map-locator"></span>
                              {item?.provinces},{item?.countries}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="applied">
                    <ApplyJobCount postJobId={item?.id} />
                  </td>
                  <td>
                    {item?.post_date} <br />
                    {item?.closing_date}
                  </td>
                  <td className="status">{item?.job_status}</td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <button
                            data-text="View Application"
                            onClick={() => setViewJob(item)}
                          >
                            <span className="la la-eye"></span>
                          </button>
                        </li>
                        <li>
                          <button data-text="Edit Application">
                            <span
                              className="la la-pencil"
                              onClick={() => setEditJob(item)}
                            ></span>
                          </button>
                        </li>

                        <li>
                          <button
                            type="button"
                            data-text="Delete Application"
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-800 transition-colors duration-200"
                          >
                            <span
                              className="la la-trash"
                              aria-hidden="true"
                            ></span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
              {viewJob && (
                <JobViewModal
                  visible={!!viewJob}
                  job={viewJob}
                  onClose={() => setViewJob(null)}
                />
              )}

              {editJob && (
                <JobEditModal
                  visible={!!editJob}
                  job={editJob}
                  onClose={() => setEditJob(null)}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;
