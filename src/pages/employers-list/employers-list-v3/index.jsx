import EmployersList from "@/components/employers-listing-pages/employers-list-v3";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Employers List V3 || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const EmployerListPage3 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <EmployersList />
    </>
  );
};

export default EmployerListPage3;
