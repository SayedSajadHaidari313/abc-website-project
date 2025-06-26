import AllApplicants from "@/components/dashboard-pages/employers-dashboard/all-applicants";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "All Applicants || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
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
