import { useGetEmployerApplyJobData } from "@/queries/employer.apply.job";
import PropTypes from "prop-types";

const ApplyJobCount = ({ postJobId }) => {
  const { data, isLoading } = useGetEmployerApplyJobData(postJobId);

  if (isLoading) return <span>Loading...</span>;

  return <div>{data?.count ?? 0}</div>;
};

ApplyJobCount.propTypes = {
  postJobId: PropTypes.string.isRequired,
}

export default ApplyJobCount;
