import Checkout from "@/components/shop/checkout";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Checkout || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
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
