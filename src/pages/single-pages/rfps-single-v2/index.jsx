import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import Contact from "@/components/job-single-pages/shared-components/Contact";
import { useParams } from "react-router-dom";
import { useGetRfpById } from "@/queries/website.query/rfps.query";
import { formatImageUrl } from "@/utils/imageUtils";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { Spin, Alert } from "antd";
import { MdDownloadForOffline } from "react-icons/md";

import MetaComponent from "@/components/common/MetaComponent";
import Advertisement from "@/components/advertisement/Advertisement";
import { useAuthStore } from "@/auth/auth.store";
import AdBlockDisplay from "@/components/common/AdBlockDisplay";
// import GoogleAd from "@/components/common/GoogleAd";

const metadata = {
  title: "RFP Details - View Request for Proposals | ABC.AF Directory Platform",
  description:
    "Explore detailed information about this Request for Proposal (RFP) on ABC.AF, Afghanistan’s trusted directory platform for business opportunities and professional connections.",
};

const getRequestTypeDisplay = (type) => {
  const types = {
    RFP: "Request for Proposal",
    RFQ: "Request for Quote",
    ITB: "Invitation to Bidding",
  };
  const name = types[type] || type;
  return `${name} (${type})`;
};

const RfpSingleDynamicV2 = () => {
  let params = useParams();
  const id = params.id;
  const { data, isLoading, isError } = useGetRfpById(id);
  const rfp = data?.data;
  const { isLoggedIn } = useAuthStore();

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !rfp) {
    return <Alert message="Error fetching RFP details" type="error" showIcon />;
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

      {/* <!-- Job Detail Section --> */}
      <section className="job-detail-section">
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-block-outer">
                  <div className="job-block-seven">
                    <div className="inner-box">
                      <div className="content">
                        <span className="company-logo">
                          {rfp.user?.user_image ? (
                            <img
                              style={{ borderRadius: "10px" }}
                              src={formatImageUrl(rfp.user.user_image, "user")}
                              alt="company logo"
                            />
                          ) : (
                            <HiBuildingOffice2
                              style={{
                                fontSize: "82px",
                                color: "#696969",
                                padding: "7px",
                                margin: "7px",
                              }}
                            />
                          )}
                        </span>
                        <h4>{getRequestTypeDisplay(rfp.request_type)}</h4>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#696969",
                            marginBottom: "5px",
                          }}
                        >
                          {rfp.title}
                        </p>
                        <ul className="job-info">
                          <li>
                            Opening Date:{" "}
                            {new Date(rfp.created_at).toLocaleDateString()}
                          </li>
                          <li>
                            Closing Date:{" "}
                            {new Date(rfp.close_date).toLocaleDateString()}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Job Block --> */}
                </div>
                {/* End job-block-outer */}
                <JobDetailsDescriptions rfpId={id} />
                {/* Download section after description */}
                {rfp.file &&
                  (isLoggedIn ? (
                    <a
                      href={formatImageUrl(rfp.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme-btn btn-style-three"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        marginTop: 16,
                      }}
                    >
                      <MdDownloadForOffline
                        style={{ fontSize: "20px", marginRight: 8 }}
                      />
                      Download File
                    </a>
                  ) : (
                    <h4 style={{ color: "#d9534f", marginTop: 16 }}>
                      Please log in to download this file.
                    </h4>
                  ))}
                {/* End jobdetails content */}
                <div className="other-options">
                  <div className="social-share">
                    <h5>Share this RFP</h5>
                    <SocialTwo />
                  </div>
                </div>
                {/* <!-- Other Options --> */}
                {/* <!-- Related Jobs --> */}
                <div
                  style={{
                    margin: "32px 0",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <AdBlockDisplay position="after_company_listing" />
                </div>
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  {/* End apply for job btn */}
                  <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact />
                      </div>
                      {/* End .default-form */}
                    </div>
                  </div>
                  {/* <div className="sidebar-widget"></div> */}
                  {/* End .sidebar-widget */}

                  <div className="">
                    <Advertisement />
                  </div>
                  {/* End .company-widget */}

                  {/* Google AdSense ad in sidebar */}
                  <div
                    style={{
                      margin: "24px 0",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <AdBlockDisplay position="left_side" />
                  </div>

                  {/* End contact-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default RfpSingleDynamicV2;
