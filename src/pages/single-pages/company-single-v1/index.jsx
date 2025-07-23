import LoginPopup from "@/components/common/form/login/LoginPopup";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import { useParams } from "react-router-dom";
import { formatImageUrl, getFallbackImage } from "@/utils/imageUtils";
import AdBlockDisplay from "@/components/common/AdBlockDisplay";
import MetaComponent from "@/components/common/MetaComponent";
import CompanyInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import CompanyLocationMap from "@/components/common/CompanyLocationMap";
import Footer from "@/components/home-4/Footer";
import { Skeleton } from "antd";
import { useGetCompanyBySlug } from "@/queries/website.query/company.query";
import SmartText from "@/components/common/SmartText";
import Advertisement from "@/components/advertisement/Advertisement";
// import GoogleAd from "@/components/common/GoogleAd";

const metadata = {
  title: "Company Details",
  description: "View detailed information about this company",
};

const CompanySingleDynamicV1 = () => {
  let params = useParams();
  const slug = params.slug;

  // Use the dedicated hook to fetch company by slug
  const { data, isLoading, isError } = useGetCompanyBySlug(slug);
  const company = data?.data;

  // Show loading state
  if (isLoading) {
    return (
      <div className="auto-container">
        <div className="text-center">
          <h2>
            <Skeleton />
          </h2>
        </div>
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="auto-container">
        <div className="text-center">
          <h2>Error loading company data</h2>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!company) {
    return (
      <div className="auto-container">
        <div className="text-center">
          <h2>Company not found</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Company Detail Section --> */}
      <section className="job-detail-section">
        <div
          className="upper-box"
          style={{
            position: "relative",
            backgroundImage: `url(${formatImageUrl(
              company?.user?.user_image
            )})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 1,
            },
          }}
        >
          {/* Background overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 1,
            }}
          ></div>

          <div
            className="auto-container"
            style={{ position: "relative", zIndex: 2 }}
          >
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <img
                      src={
                        company?.user?.user_image
                          ? formatImageUrl(company?.user?.user_image)
                          : getFallbackImage("item")
                      }
                      alt="logo"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getFallbackImage("item");
                      }}
                    />
                  </span>
                  <h4 style={{ color: "#ffffff" }}>{company?.item_title}</h4>

                  <ul className="job-info">
                    {/* company info */}
                    <li style={{ color: "#ffffff" }}>
                      <span className="icon flaticon-map-locator"></span>
                      {`${company?.city?.city_name || ""} ${
                        company?.country?.name || ""
                      }`.trim() || company?.location}
                    </li>
                    {/* location info */}
                    <li style={{ color: "#ffffff" }}>
                      <span className="icon flaticon-clock-3"></span>{" "}
                      {company?.created_at
                        ? new Date(company.created_at).toLocaleDateString()
                        : company?.time}
                    </li>
                  </ul>
                  {/* End .job-info */}

                  <ul className="job-other-info">
                    {company?.category && (
                      <li
                        className="time"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          color: "#ffffff",
                        }}
                      >
                        {company.category.category_name}
                      </li>
                    )}
                    {company?.item_status === 1 && (
                      <li
                        className="privacy"
                        style={{
                          backgroundColor: "rgba(25, 103, 210, 0.8)",
                          color: "#ffffff",
                        }}
                      >
                        Active
                      </li>
                    )}
                  </ul>
                  {/* End .job-other-info */}
                </div>
                {/* End .content */}
              </div>
            </div>
            {/* <!-- Company Block --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-detail">
                  <h4>About {company?.item_title}</h4>
                  <p>
                    <SmartText
                      text={
                        company?.item_description || "No description available."
                      }
                      // maxLength={150}
                    />
                  </p>

                  <h4>Company Information</h4>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {company?.item_phone || "Not provided"}
                    <br />
                    <strong>Location:</strong>{" "}
                    {`${company?.city?.city_name || ""} ${
                      company?.country?.name || ""
                    }`.trim() || "Not specified"}
                    <br />
                  </p>
                </div>
                {/* End company details content */}

                {/* Company Location Map */}
                <div
                  className="company-location-section"
                  style={{ marginTop: "30px" }}
                >
                  <CompanyLocationMap
                    latitude={company?.item_lat}
                    longitude={company?.item_lng}
                    companyName={company?.item_title}
                    address={
                      `${company?.city?.city_name || ""} ${
                        company?.country?.name || ""
                      }`.trim() || "Location"
                    }
                  />
                </div>
                {/* End Company Location Map */}

                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this company</h5>
                    <SocialTwo />
                  </div>
                </div>
                <div
                  style={{
                    margin: "32px 0",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <AdBlockDisplay position="left_side_of_company_listing" />
                </div>
                {/* <!-- Other Options --> */}
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <div className="company-title">
                        <div className="company-logo">
                          <img
                            className="item brand"
                            src={
                              company?.user?.user_image
                                ? formatImageUrl(
                                    company?.user?.user_image,
                                    "user"
                                  )
                                : getFallbackImage("item")
                            }
                            alt="resource"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = getFallbackImage("item");
                            }}
                          />
                        </div>
                        <h5 className="company-name">{company?.user?.name}</h5>
                        <a href="#" className="profile-link">
                          View User profile
                        </a>
                      </div>
                      <CompanyInfo currentCompanyId={company?.id} />
                      {/* End company title */}
                      <div className="btn-box">
                        <a
                          href={
                            company?.item_phone
                              ? `tel:${company.item_phone}`
                              : "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-btn btn-style-three"
                        >
                          {company?.item_phone || "Contact"}
                        </a>
                      </div>
                      {/* End btn-box */}
                    </div>
                  </div>

                  <div className="sidebar-widget">
                    {/* <!-- Map Widget --> */}
                    <h4 className="widget-title">Advertisement</h4>
                    <div className="widget-content">
                      <div className="map-outer">
                        <Advertisement />
                      </div>
                    </div>
                    {/* <!--  Map Widget --> */}
                  </div>
                  <div
                    style={{
                      margin: "32px 0",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <AdBlockDisplay position="left_side" />
                  </div>
                  {/* End .sidebar-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Company Detail Section --> */}

      <Footer />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default CompanySingleDynamicV1;
