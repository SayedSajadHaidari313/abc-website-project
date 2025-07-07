import MetaComponent from "@/components/common/MetaComponent";
import RfpPost from "@/components/dashboard-pages/candidates-dashboard/insight-posts";

const metadata = {
  title: "Insight Post Page || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const RfpPostPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <RfpPost />
    </>
  );
};

export default RfpPostPage;
