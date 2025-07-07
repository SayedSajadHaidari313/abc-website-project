import Terms from "@/components/pages-menu/terms";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Terms || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const TermsPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <Terms />
    </>
  );
};

export default TermsPage;
