import Pricing from "@/components/pages-menu/pricing";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Pricing || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
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
