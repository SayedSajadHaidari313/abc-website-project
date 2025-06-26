import { useGetPostJobsData } from "@/queries/post.jobs.query";
import { Alert, Skeleton } from "antd";
import PropTypes from "prop-types";

const JobDetailsDescriptions = ({ currentJobId }) => {
  const { data, isLoading, isError } = useGetPostJobsData();

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

  const job = data?.data?.filter((job) => job?.id === currentJobId);

  return (
    <div className="job-detail">
      <h4>About {job[0]?.company?.company_name}</h4>
      <p>{job[0]?.company?.company_description}</p>

      <h4>Job Description</h4>
      <p>
        <div
          dangerouslySetInnerHTML={{
            __html: job[0]?.job_description || "---",
          }}
        />
      </p>

      <h4>Job Requirements</h4>
      <p>
        <div
          dangerouslySetInnerHTML={{
            __html: job[0]?.job_requirement || "---",
          }}
        />
      </p>
      <h4>Experience</h4>
      <ul className="list-style-three">
        <li>
          <p>{job[0]?.experiance}</p>
        </li>
      </ul>
      <h4>Submission Guideline</h4>
      <p>
        <div
          dangerouslySetInnerHTML={{
            __html: job[0]?.submission_guideline || "---",
          }}
        />
      </p>
      <h4>Functional Area</h4>
      <p>{job[0]?.job_category?.name}</p>
      <h4>Countries</h4>
      <p>{job[0]?.countries}</p>
      <h4>Provinces</h4>
      <p>{job[0]?.provinces}</p>
      <h4>Submission Email</h4>
      <a className="link">{job[0]?.submission_email}</a>
    </div>
  );
};

JobDetailsDescriptions.propTypes = {
  currentJobId: PropTypes.number.isRequired,
};

export default JobDetailsDescriptions;
