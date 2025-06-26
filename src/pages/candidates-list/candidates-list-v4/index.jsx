import CandidatesList from "@/components/candidates-listing-pages/candidates-list-v4";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Candidates List V4 || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const CandidateListPage4 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <CandidatesList />
    </>
  );
};

export default CandidateListPage4;
