import MetaComponent from "@/components/common/MetaComponent";
import InsightRanks from "@/components/dashboard-pages/candidates-dashboard/insight-ranks";

const metadata = {
  title: "Insight Rank Page || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
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
