import Invoice from "@/components/pages-menu/invoice";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Invoice || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
