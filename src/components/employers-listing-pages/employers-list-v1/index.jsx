import FooterDefault from "../../../components/footer/common-footer";
import Breadcrumb from "../../common/Breadcrumb";
import LoginPopup from "../../common/form/login/LoginPopup";
import MobileMenu from "../../header/MobileMenu";

import FilterSidebar from "./FilterSidebar";
import DefaulHeader from "@/components/header/DefaulHeader";

import RfpFeatured7 from "@/components/job-featured/RfpFeatured7";
import { useDispatch } from "react-redux";
import { addKeyword } from "@/features/filter/employerFilterSlice";
import { useSelector } from "react-redux";
import Footer from "@/components/home-4/Footer";

const Index = () => {
  // Get keyword from Redux and dispatch for updating
  const keyword = useSelector((state) => state.employerFilter.keyword);
  const dispatch = useDispatch();

  // Handler to update search keyword from sidebar
  const handleSearch = (value) => {
    dispatch(addKeyword(value));
  };

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

      <Breadcrumb title="Rfps/Rfqs" meta="rfps" />
      {/* <!--End Breadcrumb Start--> */}

      <section className="ls-section">
        <div className="auto-container">
          <div className="row">
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="filter-sidebar"
              aria-labelledby="offcanvasLabel"
            >
              <div className="filters-column hide-left">
                <FilterSidebar onSearch={handleSearch} searchValue={keyword} />
              </div>
            </div>
            {/* End filter column for tablet and mobile devices */}

            <div className="filters-column hidden-1023 col-lg-4 col-md-12 col-sm-12">
              <FilterSidebar onSearch={handleSearch} searchValue={keyword} />
            </div>
            {/* <!-- End Filters Column for destop and laptop --> */}
            <div className="featured-column col-xl-8 col-lg-12 col-md-12 col-sm-12">
              <div className="outer-box">
                <RfpFeatured7 />
              </div>
              {/* En outer box */}
            </div>
            {/* <!-- End Content Column --> */}
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </section>

      {/* <!--End Listing Page Section --> */}

<Footer/>
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default Index;
