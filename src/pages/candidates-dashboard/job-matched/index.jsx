import MetaComponent from "@/components/common/MetaComponent";
import MatchedJobList from "@/components/dashboard-pages/candidates-dashboard/job-matched-list";

const metadata = {
  title: "Short ListedJobs || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const JobMatchedPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <MatchedJobList />
    </>
  );
};

export default JobMatchedPage;
