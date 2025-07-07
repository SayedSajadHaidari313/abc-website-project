import MetaComponent from "@/components/common/MetaComponent";
import InsightHubList from "@/components/dashboard-pages/candidates-dashboard/insight-hubs";

const metadata = {
  title: "Insight Rank Page || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const InsightHubsPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <InsightHubList />
    </>
  );
};

export default InsightHubsPage;
