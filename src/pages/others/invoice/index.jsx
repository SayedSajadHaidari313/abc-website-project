import Invoice from "@/components/pages-menu/invoice";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Invoice || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const InvoicePage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <Invoice />
    </>
  );
};

export default InvoicePage;
