import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import DetailsContent from "@/components/blog-meu-pages/blog-details/details-content";
import blogs from "@/data/blogs";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Blog Details Dyanmic V1 || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const BlogDetailsDynamic = () => {
  let params = useParams();
  const id = params.id;

  const blog = blogs.find((item) => item.id == id) || blogs[0];

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Blog Single --> */}
      <section className="blog-single">
        <div className="auto-container">
          <div className="upper-box">
            <h3>{blog?.blogSingleTitle}</h3>

            <ul className="post-info">
              <li>
                <span className="thumb">
                  <img src={"/images/resource/thumb-1.png"} alt="resource" />
                </span>
                Alison Dawn
              </li>
              <li>August 31, 2021</li>
              <li>12 Comment</li>
            </ul>
            {/* End post info */}
          </div>
        </div>
        {/* End auto-container */}

        <figure className="main-image">
          <img src={blog?.img} alt="resource" />
        </figure>

        <DetailsContent />
      </section>
      {/* <!-- End Blog Single --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default BlogDetailsDynamic;
