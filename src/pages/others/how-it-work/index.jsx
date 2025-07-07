import HowItWork from "@/components/pages-menu/how-it-work";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "About || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
