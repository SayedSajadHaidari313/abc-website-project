import ForEmoloyer from "@/components/pages-menu/for-employers";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "ForEmployer || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
