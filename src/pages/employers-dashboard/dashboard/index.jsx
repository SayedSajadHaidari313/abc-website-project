import DashboadHome from "@/components/dashboard-pages/employers-dashboard/dashboard";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Employeers Dashboard || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const DashboardEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboadHome />
    </>
  );
};

export default DashboardEmploeeDBPage;
