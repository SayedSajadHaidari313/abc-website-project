import LoginPopup from "../../common/form/login/LoginPopup";
import FooterDefault from "../../footer/common-footer";
import DefaulHeader from "../../header/DefaulHeader";
import MobileMenu from "../../header/MobileMenu";
import ForEmployer from "@/components/block/ForEmployer";
import HowItWorksEmployer from "@/components/block/HowItWorksEmployer";
import EmployerPlans from "@/components/block/EmployerPlans";
import GetStartedEmployer from "@/components/block/GetStartedEmployer";

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

      <section className="work-section style-two">
        <div className="auto-container">
          <div className="row" data-aos="fade-up">
            <ForEmployer />
          </div>
        </div>
      </section>

      <section className="work-section style-two">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>How It Works for Employers?</h2>
            <div className="text" style={{ fontSize: 20 }}>
              A knowledge-first approach to professional networking and job
              matching
            </div>
          </div>
          {/* End sec-title */}

          <div className="row" data-aos="fade-up">
            <HowItWorksEmployer />
          </div>
        </div>
      </section>

      <EmployerPlans />
      {/* <!-- End Employer Plans--> */}

      <GetStartedEmployer />
      {/* <!-- End Employer Plans--> */}

      <FooterDefault />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
