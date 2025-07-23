import CompanyList from "@/components/job-listing-pages/company-list-v3";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Company Directory - Find Businesses & Organizations | ABC.AF Directory Platform",
  description:
    "Browse and discover top companies, businesses, and organizations in Afghanistan with ABC.AF's comprehensive directory platform. Connect with trusted service providers and industry leaders today!",
};

const CompanyListPage3 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <CompanyList />
    </>
  );
};

export default CompanyListPage3;
