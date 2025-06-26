import OrderCompleted from "@/components/shop/order-completed";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Order Completed || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
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
