import Contact from "@/components/pages-menu/contact";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Contact || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
