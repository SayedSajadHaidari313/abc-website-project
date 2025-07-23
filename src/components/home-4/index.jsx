import Header from "./Header";
import Footer from "./Footer";
import Hero4 from "../hero/hero-4";
import Partner from "../common/partner/Partner";
import LoginPopup from "../common/form/login/LoginPopup";
import MobileMenu from "../header/MobileMenu";
import CompanyCategorie2 from "../company-categories/CompanyCategorie2";
import CompanySponsored from "../CompanySponsored";
import AdBlockDisplay from "../common/AdBlockDisplay";
import CompanyListHp from "../company-listing/CompanyListHp";

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

      <section className="top-companies style-two">
        <CompanySponsored />
      </section>

      {/* Google AdSense ad after sponsored companies */}
      <div
        style={{ margin: "32px 0", display: "flex", justifyContent: "center" }}
      >
        <AdBlockDisplay position="after_sponsored_company" />
      </div>

      <section className="job-categories">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Popular Business Categories</h2>
            <div className="text">
              Discover Top Companies Across Afghanistan
            </div>
          </div>

          <div className="row" data-aos="fade-up">
            <CompanyCategorie2 />
          </div>
        </div>
      </section>
      <section className="job-categories">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>All Companies</h2>
            <div className="text">
              Discover 2,020 Verified Afghan Businesses - 293 New Listings This
              Week
            </div>
          </div>

          <div className="row" data-aos="fade-up">
            <CompanyListHp />
          </div>
        </div>
      </section>

      {/* Google AdSense ad after categories */}
      <div
        style={{ margin: "32px 0", display: "flex", justifyContent: "center" }}
      >
        <AdBlockDisplay position="after_category" className="home-page-ad" />
      </div>

      <section className="clients-section alternate">
        <div className="sponsors-outer" data-aos="fade">
          {/* <!--Sponsors Carousel--> */}
          <ul className="sponsors-carousel">
            <Partner />
          </ul>
        </div>
      </section>
      {/* <!-- End Clients Section--> */}

      <Footer />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
