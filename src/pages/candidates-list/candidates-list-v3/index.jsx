import CandidatesList from "@/components/candidates-listing-pages/candidates-list-v3";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Candidates List V3 || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const CandidateListPage3 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <CandidatesList />
    </>
  );
};

export default CandidateListPage3;
