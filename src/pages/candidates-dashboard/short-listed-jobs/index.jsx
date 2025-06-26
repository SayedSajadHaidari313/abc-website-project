import MetaComponent from "@/components/common/MetaComponent";
import ShortListedJob from "@/components/dashboard-pages/candidates-dashboard/short-listed-jobs";

const metadata = {
  title: "Short ListedJobs || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const ShortListedJobsPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ShortListedJob />
    </>
  );
};

export default ShortListedJobsPage;
