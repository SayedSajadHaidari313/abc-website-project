import React, { useState } from "react";
import LoginPopup from "../../common/form/login/LoginPopup";
import MobileMenu from "../../header/MobileMenu";
import FilterSidebar from "./FilterSidebar";
import DefaulHeader from "@/components/header/DefaulHeader";
import CompanyHero from "@/components/company-listing/CompanyHero";
import Footer from "@/components/home-4/Footer";
import Breadcrumb from "@/components/common/Breadcrumb";
import AdBlockDisplay from "@/components/common/AdBlockDisplay";
const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}
      <Breadcrumb title="Company Listing" meta="company listing" />

      <section className="ls-section style-two">
        <div className="row no-gutters">
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="filter-sidebar"
            aria-labelledby="offcanvasLabel"
          >
            <div className="filters-column hide-left ">
              <FilterSidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                location={location}
                setLocation={setLocation}
                category={category}
                setCategory={setCategory}
              />
            </div>
          </div>
          {/* End filter column for tablet and mobile devices */}

          <div className="filters-column hidden-1023 col-xl-3 col-lg-4 col-md-12 col-sm-12 mt-10">
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              location={location}
              setLocation={setLocation}
              category={category}
              setCategory={setCategory}
            />
          </div>

          {/* <!-- End Filters Column --> */}

          <div className="content-column col-lg-8 col-md-12 col-sm-12">
            <div className="ls-outer">
              <CompanyHero
                searchQuery={searchQuery}
                location={location}
                category={category}
              />
              {/* <!-- ls Switcher --> */}
            </div>
          </div>

          {/* <!-- End Content Column --> */}
        </div>
        <div
          style={{
            margin: "32px 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AdBlockDisplay position="after_company_list" />
        </div>
        {/* End row */}
      </section>
      {/* <!--End Listing Page Section --> */}

      <Footer />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default Index;
