import AppliedJobs from "@/components/dashboard-pages/candidates-dashboard/applied-jobs";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Applied Jobs || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
