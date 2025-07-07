import CompanyList from "@/components/job-listing-pages/job-list-v3";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
