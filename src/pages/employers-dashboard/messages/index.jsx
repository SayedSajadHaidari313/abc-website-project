import Messages from "@/components/dashboard-pages/employers-dashboard/messages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Messages || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
