import VisitCardPage from "@/components/dashboard-pages/candidates-dashboard/visit-card";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Your Visit Card || ABC.AF - Directory Platform",
  description:
    "Create and customize your professional company visit card - ABC.AF Directory Platform",
};

const VisitCardPageWrapper = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <VisitCardPage />
    </>
  );
};

export default VisitCardPageWrapper;
