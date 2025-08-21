import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoginPopup from "../../common/form/login/LoginPopup";
import MobileMenu from "../../header/MobileMenu";
import FilterSidebar from "./FilterSidebar";
import DefaulHeader from "@/components/header/DefaulHeader";
import CompanyHero from "@/components/company-listing/CompanyHero";
import Footer from "@/components/home-4/Footer";
import Breadcrumb from "@/components/common/Breadcrumb";
import AdBlockDisplay from "@/components/common/AdBlockDisplay";
import Advertisement from "@/components/advertisement/Advertisement";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  // Initialize state from URL parametersw
  useEffect(() => {
    const searchParam = searchParams.get("search") || "";
    const locationParam = searchParams.get("location") || "";
    const categoryParam = searchParams.get("category") || "";

    setSearchQuery(searchParam);
    setLocation(locationParam);
    setCategory(categoryParam);
  }, [searchParams]);

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
        <div className="auto-container">
          <div className="row">
            {/* Mobile filter toggle moved into CompanyHero for top placement */}
            <div
              className="offcanvas offcanvas-start "
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
                {<Advertisement location="all-pages" status="enabled" />}
              </div>
            </div>
            {/* End filter column for tablet and mobile devices */}

            <div
              className="filters-column hidden-1023 col-xl-3 col-lg-4 col-md-12 col-sm-12"
              style={{ marginTop: "30px" }}
            >
              <FilterSidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                location={location}
                setLocation={setLocation}
                category={category}
                setCategory={setCategory}
              />
              {<Advertisement location="all-pages" status="enabled" />}
            </div>

            {/* <!-- End Filters Column --> */}

            <div className="content-column col-lg-9 col-md-12 col-sm-12">
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
          </div>
        </div>
      </section>
      {/* <!--End Listing Page Section --> */}

      <Footer />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default Index;
