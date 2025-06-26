import Messages from "@/components/dashboard-pages/employers-dashboard/messages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Messages || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const MessageEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Messages />
    </>
  );
};

export default MessageEmploeeDBPage;
