import MetaComponent from "@/components/common/MetaComponent";
import ShortListedJob from "@/components/dashboard-pages/candidates-dashboard/short-listed-jobs";

const metadata = {
  title: "Short ListedJobs || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
