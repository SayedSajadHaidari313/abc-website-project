import FooterDefault from "../../footer/common-footer";
import LoginPopup from "../../common/form/login/LoginPopup";
import MobileMenu from "../../header/MobileMenu";
import FilterJobsBox from "./FilterJobsBox";
import FilterSidebar from "./FilterSidebar";
import DefaulHeader from "@/components/header/DefaulHeader";

const index = () => {
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

            <section className="ls-section style-two">
                <div className="row no-gutters">
                    <div
                        className="offcanvas offcanvas-start"
                        tabIndex="-1"
                        id="filter-sidebar"
                        aria-labelledby="offcanvasLabel"
                    >
                        <div className="filters-column hide-left">
                            <FilterSidebar />
                        </div>
                    </div>
                    {/* End filter column for tablet and mobile devices */}

                    <div className="filters-column hidden-1023 col-xl-3 col-lg-4 col-md-12 col-sm-12">
                        <FilterSidebar />
                    </div>
                    {/* <!-- End Filters Column --> */}

                    <div className=" content-column col-xl-9 col-lg-8 col-md-12 col-sm-12">
                        <div className="ls-outer">
                            <FilterJobsBox />
                            {/* <!-- ls Switcher --> */}
                        </div>
                    </div>
                    {/* <!-- End Content Column --> */}
                </div>
                {/* End row */}
            </section>
            {/* <!--End Listing Page Section --> */}

            <FooterDefault footerStyle="alternate5" />
            {/* <!-- End Main Footer --> */}
        </>
    );
};

export default index;
