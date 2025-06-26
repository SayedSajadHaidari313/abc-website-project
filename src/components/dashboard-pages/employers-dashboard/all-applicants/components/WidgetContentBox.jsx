import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  useGetEmployerApplyJobData,
  useSingleDelete,
  useUpdateApplyJob,
} from "@/queries/apply.job.query";
import { Skeleton, Alert, notification, message, Form, Pagination } from "antd";
import ViewApplicationModal from "./ViewApplicationModal";
import { Link } from "react-router-dom";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const WidgetContentBox = () => {
  const { mutate: updateStatus } = useUpdateApplyJob();
  const { mutate: deleteApplication } = useSingleDelete();
  const [form] = Form.useForm();
  const [selectedApplyJobId, setSelectedApplyJobId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const handleStatusUpdate = (id, status) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", status);
    formData.append("_method", "PUT");

    updateStatus(formData, {
      onSuccess: () => {
        notification.success({ message: "Apply job updated successfully!" });
        form.resetFields();
      },
      onError: () => {
        message.error("Something went wrong. Please try again.");
      },
    });
  };

  const handleDelete = (id) => {
    deleteApplication({ id });
  };

  const { data, isLoading, isError } = useGetEmployerApplyJobData();
  if (isLoading) return <Skeleton />;
  if (isError)
    return (
      <Alert
        message="data fetching error"
        description="please try again."
        type="error"
        showIcon
      />
    );

  const candidates = data || [];

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/${path.replace(/\\/g, "/")}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "#ff9800";
      case "ACCEPTED":
        return "#4caf50";
      case "SHORTLISTED":
        return "#2196f3";
      case "REJECTED":
        return "#f44336";
      default:
        return "#9e9e9e";
    }
  };

  const renderCandidateCard = (candidate) => (
    <div
      className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
      key={candidate.id}
    >
      <div className="inner-box">
        <div className="content">
          <figure
            className="image"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            {candidate?.user?.photo ? (
              <img
                src={formatImageUrl(candidate.user.photo)}
                alt="user"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                
              />
            ) : (
              candidate?.user?.first_name?.charAt(0).toUpperCase()
            )}
          </figure>

          <h4 className="name">
            {candidate?.user?.first_name} {candidate?.user?.last_name}
          </h4>

          <ul className="candidate-info">
            <Link to={`/job-details/${candidate.id}`}>
              <li className="designation">{candidate?.post_job?.job_title}</li>
            </Link>
            <li>
              <span className="icon flaticon-map-locator"></span>{" "}
              {candidate?.post_job?.provinces}, {candidate?.post_job?.countries}
            </li>
            <li>
              <span className="icon flaticon-money"></span> $
              {candidate?.post_job?.salary_range}
            </li>
          </ul>

          <ul className="post-tags">
            <li>
              <span
                style={{
                  fontWeight: "bold",
                  color: getStatusColor(candidate.status),
                }}
              >
                {candidate.status.charAt(0).toUpperCase() +
                  candidate.status.slice(1).toLowerCase()}
              </span>
            </li>
          </ul>
        </div>

        <div className="option-box">
          <ul className="option-list">
            <li>
              <button
                onClick={() => setSelectedApplyJobId(candidate.id)}
                data-text="View Application"
              >
                <span className="la la-eye"></span>
              </button>
            </li>

            {[
              {
                key: "ACCEPTED",
                iconClass: "la la-check",
                label: "Accept",
                onClick: () => handleStatusUpdate(candidate.id, "ACCEPTED"),
              },
              {
                key: "SHORTLISTED",
                iconClass: "la la-user-check",
                label: "Shortlist",
                onClick: () => handleStatusUpdate(candidate.id, "SHORTLISTED"),
              },
              {
                key: "REJECTED",
                iconClass: "la la-times-circle",
                label: "Reject",
                onClick: () => handleStatusUpdate(candidate.id, "REJECTED"),
              },
              {
                key: "delete",
                iconClass: "la la-trash",
                label: "Delete",
                onClick: () => handleDelete(candidate.id),
              },
            ].map((btn) => (
              <li key={btn.key}>
                <button data-text={btn.label} onClick={btn.onClick}>
                  <span className={btn.iconClass}></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderPaginatedList = (list) => {
    const startIndex = (currentPage - 1) * pageSize;
    const paginated = list.slice(startIndex, startIndex + pageSize);
    return (
      <>
        <div className="row">{paginated.map(renderCandidateCard)}</div>
        {list.length > pageSize && (
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={list.length}
            onChange={(page) => setCurrentPage(page)}
            className="mt-4 text-center"
          />
        )}
      </>
    );
  };

  const filterByStatus = (status) =>
    status ? candidates.filter((c) => c.status === status) : candidates;

  const totalCount = candidates.length;
  const approvedCount = filterByStatus("ACCEPTED").length;
  const rejectedCount = filterByStatus("REJECTED").length;
  const shortlistedCount = filterByStatus("SHORTLISTED").length;
  const pendingCount = filterByStatus("PENDING").length;

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs onSelect={() => setCurrentPage(1)}>
          <div className="aplicants-upper-bar">
            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab className="tab-btn totals">Total(s): {totalCount}</Tab>
              <Tab className="tab-btn pending">Pending {pendingCount}</Tab>
              <Tab className="tab-btn approved">Accepted {approvedCount}</Tab>
              <Tab className="tab-btn shortlisted">
                Shortlisted {shortlistedCount}
              </Tab>
              <Tab className="tab-btn rejected">
                Rejected(s): {rejectedCount}
              </Tab>
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>{renderPaginatedList(filterByStatus())}</TabPanel>
            <TabPanel>
              {renderPaginatedList(filterByStatus("PENDING"))}
            </TabPanel>
            <TabPanel>
              {renderPaginatedList(filterByStatus("ACCEPTED"))}
            </TabPanel>
            <TabPanel>
              {renderPaginatedList(filterByStatus("SHORTLISTED"))}
            </TabPanel>
            <TabPanel>
              {renderPaginatedList(filterByStatus("REJECTED"))}
            </TabPanel>
          </div>
        </Tabs>
      </div>

      {selectedApplyJobId && (
        <ViewApplicationModal
          applyJobId={selectedApplyJobId}
          onClose={() => setSelectedApplyJobId(null)}
        />
      )}
    </div>
  );
};

export default WidgetContentBox;
