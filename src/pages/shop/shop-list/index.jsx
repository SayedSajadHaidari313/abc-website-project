import ShopList from "@/components/shop/shop-list";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Shop List || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const ShopListPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ShopList />
    </>
  );
};

export default ShopListPage;
