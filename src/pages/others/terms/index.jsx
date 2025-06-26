import Terms from "@/components/pages-menu/terms";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Terms || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
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
