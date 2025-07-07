import { Divider } from "antd";
import LoginPopup from "../../common/form/login/LoginPopup";
import FooterDefault from "../../footer/common-footer";
import DefaulHeader from "../../header/DefaulHeader";
import MobileMenu from "../../header/MobileMenu";
import Address from "./Address";
import ContactForm from "./ContactForm";
import MapBox from "./MapBox";
import Breadcrumb from "@/components/common/Breadcrumb";
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
      <Breadcrumb title="Contact" meta="Contact" />

      <section className="contact-section">
        <div className="auto-container">
          {/* End upperbox */}

          {/* <!-- Contact Form --> */}
          <div className="contact-form default-form">
            <h3 className="mb-20 text-left">Leave A Message</h3>
            <ContactForm />

            {/* <!--Contact Form--> */}
            <div style={{ marginTop: "30px" }} className="row ">
              <Divider />
              <Address />
              <Divider />
            </div>
          </div>
          {/* <!--End Contact Form --> */}
          <div className="">{/* End .row */}</div>
        </div>
      </section>
      {/* <!-- Contact Section --> */}

<Footer/>
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
