import MetaComponent from "@/components/common/MetaComponent";
import InsightArchivesList from "@/components/dashboard-pages/candidates-dashboard/insight-archives";

const metadata = {
  title: "Insight Rank Page || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
