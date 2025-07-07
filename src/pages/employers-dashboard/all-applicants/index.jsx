import AllApplicants from "@/components/dashboard-pages/employers-dashboard/all-applicants";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "All Applicants || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const AllApplicantsEmploeesPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <AllApplicants />
    </>
  );
};

export default AllApplicantsEmploeesPage;
