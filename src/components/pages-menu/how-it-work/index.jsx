import FirstApproach from "@/components/block/FirstApproach";
import LoginPopup from "../../common/form/login/LoginPopup";
import FooterDefault from "../../footer/common-footer";
import DefaulHeader from "../../header/DefaulHeader";
import MobileMenu from "../../header/MobileMenu";
import HowItWorks from "@/components/block/HowItWorks";
import KeyPlatformFeatures from "@/components/block/KeyPlatformFeatures";
import GetStarted from "@/components/block/GetStarted";

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

      {/* <Breadcrumb title="About Us" meta="About Us" /> */}
      {/* <!--End Page Title--> */}

      <section className="work-section style-two">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>How InsightDeed Works?</h2>
            <div className="text" style={{ fontSize: 20 }}>
              A knowledge-first approach to professional networking and job
              matching
            </div>
          </div>
          {/* End sec-title */}

          <div className="row" data-aos="fade-up">
            <HowItWorks />
          </div>
        </div>
      </section>

      {/* <!-- End How it Work --> */}

      <FirstApproach />
      {/* <!-- End FirstApproach --> */}
      <section className="work-section style-two">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>How InsightDeed Works?</h2>
            <div className="text" style={{ fontSize: 20 }}>
              A knowledge-first approach to professional networking and job
              matching
            </div>
          </div>
          {/* End sec-title */}

          <div className="row" data-aos="fade-up">
            <KeyPlatformFeatures />
          </div>
        </div>
      </section>

      <GetStarted />
      {/* <!-- End Get Started--> */}

      <FooterDefault />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
