import MetaComponent from "@/components/common/MetaComponent";
import InsightPost from "@/components/dashboard-pages/candidates-dashboard/insight-posts";

const metadata = {
  title: "Insight Post Page || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const InsightPostPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <InsightPost />
    </>
  );
};

export default InsightPostPage;
