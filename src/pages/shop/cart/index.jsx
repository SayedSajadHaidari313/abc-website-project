import Cart from "@/components/shop/cart";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Cart || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const CartPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Cart />
    </>
  );
};

export default CartPage;
