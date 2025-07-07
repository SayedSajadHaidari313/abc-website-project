import RfpList from "@/components/employers-listing-pages/employers-list-v1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Employers List V1 || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const RfpListPage1 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <RfpList />
    </>
  );
};

export default RfpListPage1;
