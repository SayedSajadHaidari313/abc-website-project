import EmployersList from "@/components/employers-listing-pages/employers-list-v4";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Employers List V4 || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const EmployerListPage4 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <EmployersList />
    </>
  );
};

export default EmployerListPage4;
