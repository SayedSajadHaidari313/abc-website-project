import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Post Jobs || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
