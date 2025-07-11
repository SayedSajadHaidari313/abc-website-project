import LoginPopup from "../../common/form/login/LoginPopup";
import DefaulHeader from "../../header/DefaulHeader";
import MobileMenu from "../../header/MobileMenu";
import IntroDescriptions from "./IntroDescriptions";
import Breadcrumb from "../../common/Breadcrumb";
import Footer from "@/components/home-4/Footer";

const index = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Breadcrumb title="About Us" meta="About Us" />
      {/* <!--End Page Title--> */}

      <section className="about-section-three">
        <div className="auto-container">
          <IntroDescriptions />
        </div>
      </section>
      {/* <!-- End About Section Three --> */}

      <Footer />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
