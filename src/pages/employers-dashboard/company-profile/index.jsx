import CompanyProfile from "@/components/dashboard-pages/employers-dashboard/company-profile";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Company Profile || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const CompanyProfileEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <CompanyProfile />
    </>
  );
};

export default CompanyProfileEmploeeDBPage;
