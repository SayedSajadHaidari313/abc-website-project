import Cart from "@/components/shop/cart";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Cart || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
