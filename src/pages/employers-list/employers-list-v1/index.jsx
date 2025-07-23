import RfpList from "@/components/employers-listing-pages/rfps-list-v1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "RFPs & RFQs List - Business Opportunities | ABC.AF Directory Platform",
  description:
    "Browse the latest Requests for Proposals (RFPs) and Requests for Quotations (RFQs) on ABC.AF. Connect with new business opportunities and partners across Afghanistan on our trusted directory platform.",
};

const RfpListPage1 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <RfpList />
    </>
  );
};

export default RfpListPage1;
