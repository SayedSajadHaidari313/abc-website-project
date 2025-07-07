import Pricing from "@/components/pages-menu/pricing";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Pricing || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const PricingPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <Pricing />
    </>
  );
};

export default PricingPage;
