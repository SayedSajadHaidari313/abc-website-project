import JobAlerts from "@/components/dashboard-pages/candidates-dashboard/job-alerts";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Job Alerts || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const JobAlertPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <JobAlerts />
    </>
  );
};

export default JobAlertPage;
