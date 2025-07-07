import MetaComponent from "@/components/common/MetaComponent";
import InsightRanks from "@/components/dashboard-pages/candidates-dashboard/insight-ranks";

const metadata = {
  title: "Insight Rank Page || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const InsightRanksPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <InsightRanks />
    </>
  );
};

export default InsightRanksPage;
