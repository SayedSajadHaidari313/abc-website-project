import BlogList from "@/components/blog-meu-pages/blog-list-v3";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Blog List V3 || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const BlogListpage3 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <BlogList />
    </>
  );
};

export default BlogListpage3;
