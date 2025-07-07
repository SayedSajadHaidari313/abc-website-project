import OrderCompleted from "@/components/shop/order-completed";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Order Completed || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const OrderCompletedPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <OrderCompleted />
    </>
  );
};

export default OrderCompletedPage;
