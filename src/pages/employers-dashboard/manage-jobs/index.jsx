import ManageJobs from "@/components/dashboard-pages/employers-dashboard/manage-jobs";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Manage Jobs || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const ManageJobsEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ManageJobs />
    </>
  );
};

export default ManageJobsEmploeeDBPage;
