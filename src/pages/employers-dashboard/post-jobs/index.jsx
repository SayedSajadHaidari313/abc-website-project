import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Post Jobs || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const PostJobsEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PostJob />
    </>
  );
};

export default PostJobsEmploeeDBPage;
