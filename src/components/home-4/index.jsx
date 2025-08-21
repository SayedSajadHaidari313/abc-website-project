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
import SpecialCompanyCategories from "../company-categories/SpecialCompanyCategories";
import Advertisement from "../advertisement/Advertisement";

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
        {/* Only show Advertisement if location is 'home-page' and status is 'enabled' */}
      </section>
      <div className="auto-container" style={{ marginTop: "32px" }}>
        {<Advertisement location="banner-home-page" status="enabled" />}
      </div>

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
            <h2>Recent Company Register</h2>
            <div className="text">
              Explore Newly Added Afghan Businesses - Fresh Listings Updated
              Daily
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

      {/* <section className="clients-section alternate">
        <div className="sponsors-outer" data-aos="fade">
          <ul className="sponsors-carousel">
            <Partner />
          </ul>
        </div>
      </section> */}
      <section className="job-categories">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Addresses Government & Embassies</h2>
            <div className="text">
              Discover Top Companies Across Afghanistan
            </div>
          </div>

          <div className="row" data-aos="fade-up">
            <SpecialCompanyCategories />
          </div>
        </div>
      </section>
      <div className="auto-container" style={{ marginTop: "32px" }}>
        {<Advertisement location="banner-home-bottom" status="enabled" />}
      </div>
      {/* <!-- End Clients Section--> */}

      <Footer />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
