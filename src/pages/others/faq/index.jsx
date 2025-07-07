import Faq from "@/components/pages-menu/faq";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Faq || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const FaqPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <Faq />
    </>
  );
};

export default FaqPage;
