import Header from "./Header";
import Footer from "./Footer";
import Hero4 from "../hero/hero-4";
import Partner from "../common/partner/Partner";
import LoginPopup from "../common/form/login/LoginPopup";
import MobileMenu from "../header/MobileMenu";
import CompanyCategorie2 from "../job-categories/CompanyCategorie2";
import FaqChild from "../pages-menu/faq/FaqChild";
import CompanySponsored from "../CompanySponsored";
import CompanyHero from "../company-listing/CompanyHero";
import CompanyPage1 from "../company/CompanyPage1";

const index = () => {
  return (
    <>
      <LoginPopup />
      {/* End Login Popup Modal */}

      <Header />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Hero4 />

      {/* <!-- End Banner Section--> */}

      {/* <section className="top-companies style-two">
        <CompanyPage1 />
      </section> */}

      <section className="top-companies style-two">
        <CompanySponsored />
      </section>

      <section className="job-categories">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Popular Categories</h2>
            <div className="text">2020 company live - 293 added today.</div>
          </div>

          <div className="row" data-aos="fade-up">
            <CompanyCategorie2 />
          </div>
        </div>
      </section>

      {/* <!-- End Job Section --> */}

      <section className="clients-section alternate">
        <div className="sponsors-outer" data-aos="fade">
          {/* <!--Sponsors Carousel--> */}
          <ul className="sponsors-carousel">
            <Partner />
          </ul>
        </div>
      </section>
      {/* <!-- End Clients Section--> */}

      {/* <section className="faqs-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Frequently Asked Questions</h2>
            <div className="text">Home / Faq</div>
          </div>

          <h3>Payments</h3>
          <ul className="accordion-box">
            <FaqChild />
          </ul>

          <h3>Suggestions</h3>
          <ul className="accordion-box mb-0">
            <FaqChild />
          </ul>
        </div>
      </section> */}
      <Footer />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
