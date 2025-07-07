import Packages from "@/components/dashboard-pages/employers-dashboard/packages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Packages || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const PackageEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Packages />
    </>
  );
};

export default PackageEmploeeDBPage;
