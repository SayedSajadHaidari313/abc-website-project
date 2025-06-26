import About from "@/components/pages-menu/about";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "About || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
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
