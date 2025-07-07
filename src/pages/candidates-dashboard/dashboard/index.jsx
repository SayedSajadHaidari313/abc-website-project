import DashboadHome from "@/components/dashboard-pages/candidates-dashboard/dashboard";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Candidates Dashboard || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const DashboardPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboadHome />
    </>
  );
};

export default DashboardPage;
