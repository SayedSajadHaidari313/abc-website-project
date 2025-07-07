import BlogList from "@/components/blog-meu-pages/blog-list-v2";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Blog List V2 || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const BlogListpage2 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <BlogList />
    </>
  );
};

export default BlogListpage2;
