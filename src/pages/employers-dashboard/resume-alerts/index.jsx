import ResumeAlerts from "@/components/dashboard-pages/employers-dashboard/resume-alerts";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Resume Alerts || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const ResumeAlertsEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ResumeAlerts />
    </>
  );
};

export default ResumeAlertsEmploeeDBPage;
