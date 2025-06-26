import Contact from "@/components/pages-menu/contact";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Contact || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const ContactPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <Contact />
    </>
  );
};

export default ContactPage;
