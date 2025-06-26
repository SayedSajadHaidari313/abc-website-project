import CvBank from "@/components/dashboard-pages/employers-dashboard/cv-banks";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "CV Bank || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
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
