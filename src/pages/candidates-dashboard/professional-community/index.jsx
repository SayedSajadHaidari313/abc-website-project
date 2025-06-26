import MetaComponent from "@/components/common/MetaComponent";
import ProfessionalComList from "@/components/dashboard-pages/candidates-dashboard/professional-community";

const metadata = {
  title: "Insight Rank Page || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const ProfessionalCommunityPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ProfessionalComList />
    </>
  );
};

export default ProfessionalCommunityPage;
