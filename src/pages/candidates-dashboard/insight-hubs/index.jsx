import MetaComponent from "@/components/common/MetaComponent";
import InsightHubList from "@/components/dashboard-pages/candidates-dashboard/insight-hubs";

const metadata = {
  title: "Insight Rank Page || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
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
