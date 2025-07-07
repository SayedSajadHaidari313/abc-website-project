import About from "@/components/pages-menu/about";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "About || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const AboutPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <About />
    </>
  );
};

export default AboutPage;
