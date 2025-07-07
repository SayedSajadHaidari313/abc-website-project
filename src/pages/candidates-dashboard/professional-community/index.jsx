import MetaComponent from "@/components/common/MetaComponent";
import ProfessionalComList from "@/components/dashboard-pages/candidates-dashboard/professional-community";

const metadata = {
  title: "Insight Rank Page || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
