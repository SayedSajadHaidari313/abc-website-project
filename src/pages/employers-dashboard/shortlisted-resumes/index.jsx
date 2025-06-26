import ShortlistedResumes from "@/components/dashboard-pages/employers-dashboard/shortlisted-resumes";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Shortlisted Resumes || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const ShortListedResumeEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ShortlistedResumes />
    </>
  );
};

export default ShortListedResumeEmploeeDBPage;
