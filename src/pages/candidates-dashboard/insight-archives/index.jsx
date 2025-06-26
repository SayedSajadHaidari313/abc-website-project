import MetaComponent from "@/components/common/MetaComponent";
import InsightArchivesList from "@/components/dashboard-pages/candidates-dashboard/insight-archives";

const metadata = {
  title: "Insight Rank Page || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const InsightArchivesPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <InsightArchivesList />
    </>
  );
};

export default InsightArchivesPage;
