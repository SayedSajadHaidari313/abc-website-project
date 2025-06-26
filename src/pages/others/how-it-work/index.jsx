import HowItWork from "@/components/pages-menu/how-it-work";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "About || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const HowItWorkPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <HowItWork />
    </>
  );
};

export default HowItWorkPage;
