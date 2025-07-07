import CvBank from "@/components/dashboard-pages/employers-dashboard/cv-banks";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "CV Bank || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const CvBankPages = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <CvBank />
    </>
  );
};

export default CvBankPages;
