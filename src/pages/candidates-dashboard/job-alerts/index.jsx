import JobAlerts from "@/components/dashboard-pages/candidates-dashboard/job-alerts";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Job Alerts || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
