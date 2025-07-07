import ResumeAlerts from "@/components/dashboard-pages/employers-dashboard/resume-alerts";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Resume Alerts || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
