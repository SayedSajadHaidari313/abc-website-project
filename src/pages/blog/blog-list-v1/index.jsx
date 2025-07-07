import BlogList from "@/components/blog-meu-pages/blog-list-v1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Blog List V1 || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};
const BlogListpage1 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <BlogList />
    </>
  );
};

export default BlogListpage1;
