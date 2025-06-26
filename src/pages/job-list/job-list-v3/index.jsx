import JobList from "@/components/job-listing-pages/job-list-v3";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Job List || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const JobListPage3 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <JobList />
    </>
  );
};

export default JobListPage3;
