import Checkout from "@/components/shop/checkout";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Checkout || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const CheckoutPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Checkout />
    </>
  );
};

export default CheckoutPage;
