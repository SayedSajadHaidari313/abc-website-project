import ForEmoloyer from "@/components/pages-menu/for-employers";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "ForEmployer || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const ForEmployer = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <ForEmoloyer />
    </>
  );
};

export default ForEmployer;
