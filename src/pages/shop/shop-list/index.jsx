import ShopList from "@/components/shop/shop-list";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Shop List || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
