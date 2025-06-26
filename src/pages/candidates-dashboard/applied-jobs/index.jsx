import AppliedJobs from "@/components/dashboard-pages/candidates-dashboard/applied-jobs";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Applied Jobs || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const AppliedJobsPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <AppliedJobs />
    </>
  );
};

export default AppliedJobsPage;
