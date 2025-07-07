import { useGetPostJobsData } from "@/queries/post.jobs.query";
import { Alert, Skeleton } from "antd";
import PropTypes from "prop-types";
import { useGetRfpById } from "@/queries/website.query/rfps.query";

const JobDetailsDescriptions = ({ rfpId }) => {
  const { data, isLoading, isError } = useGetRfpById(rfpId);

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

  const rfp = data?.data;

  if (!rfp) return null;

  return (
    <div className="job-detail">
      <h4>{rfp.title}</h4>

      <h4>RFP Description</h4>
      <div
        dangerouslySetInnerHTML={{
          __html: rfp.description || "---",
        }}
      />
      {/* {rfp.user.email && (
        <>
          <h4>Submission Email</h4>
          <a className="link" href={`mailto:${rfp.user.email}`}>
            {rfp.user.email}
          </a>
        </>
      )} */}
    </div>
  );
};

JobDetailsDescriptions.propTypes = {
  rfpId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default JobDetailsDescriptions;
