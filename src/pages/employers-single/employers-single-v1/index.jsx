import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import JobDetailsDescriptions from "@/components/employer-single-pages/shared-components/JobDetailsDescriptions";
import RelatedJobs from "@/components/employer-single-pages/related-jobs/RelatedJobs";
import PrivateMessageBox from "@/components/employer-single-pages/shared-components/PrivateMessageBox";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import { useGetCompaniesData } from "@/queries/get.companies.data.query";
import { Alert, Avatar, Skeleton } from "antd";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const metadata = {
  title: "Employers Single Dyanmic V1 || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const EmployersSingleV1 = () => {
  const { id } = useParams(); // گرفتن id از پارامترهای URL
  const { data: CompanyInfo, isLoading, isError } = useGetCompaniesData(); // استفاده از هوک برای گرفتن داده‌ها
  // در صورتی که داده‌ها هنوز بارگذاری نشده‌اند یا خطا وجود دارد
  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />;

  if (isError)
    return (
      <Alert
        message="Error fetching data"
        description="Please try again later."
        type="error"
        showIcon
      />
    );

  // پیدا کردن شغل با توجه به id موجود در URL
  const company =
    CompanyInfo?.data?.find((item) => item?.id == id) || CompanyInfo?.data[0];

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/${path.replace(/\\/g, "/")}`;
  };

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
        {/* <!-- Upper Box --> */}
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <Avatar
                      size={64}
                      src={
                        company?.company_photo
                          ? formatImageUrl(company.company_photo)
                          : null
                      }
                      alt="company"
                    >
                      {!company?.company_photo && company?.name
                        ? company.name.charAt(0).toUpperCase()
                        : ""}
                    </Avatar>
                  </span>
                  <h4>{company?.name}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {company?.location}
                    </li>
                    {/* compnay info */}
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {company?.category}
                    </li>
                    {/* location info */}
                    <li>
                      <span className="icon flaticon-telephone-1"></span>
                      {company?.phone}
                    </li>
                    {/* time info */}
                    <li>
                      <span className="icon flaticon-mail"></span>
                      {company?.email}
                    </li>
                    {/* salary info */}
                  </ul>
                  {/* End .job-info */}

                  <ul className="job-other-info">
                    <li className="time">Open Jobs – {company.jobNumber}</li>
                  </ul>
                  {/* End .job-other-info */}
                </div>
                {/* End .content */}

                {/* <div className="btn-box">
                  <button
                    className="theme-btn btn-style-one"
                    data-bs-toggle="modal"
                    data-bs-target="#privateMessage"
                  >
                    Private Message
                  </button>
                  <button className="bookmark-btn">
                    <i className="flaticon-bookmark"></i>
                  </button>
                </div> */}
                {/* End btn-box */}

                {/* <!-- Modal --> */}
                <div
                  className="modal fade"
                  id="privateMessage"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="apply-modal-content modal-content">
                      <div className="text-center">
                        <h3 className="title">
                          Send message to {company.name}
                        </h3>
                        <button
                          type="button"
                          className="closed-modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      {/* End modal-header */}

                      <PrivateMessageBox />
                      {/* End PrivateMessageBox */}
                    </div>
                    {/* End .send-private-message-wrapper */}
                  </div>
                </div>
                {/* End .modal */}
              </div>
            </div>
            {/* <!-- Job Block --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        {/* <!-- job-detail-outer--> */}
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                {/*  job-detail */}
                <JobDetailsDescriptions currentCompanyId={company?.id} />
                {/* End job-detail */}

                {/* <!-- Related Jobs --> */}
                <div className="related-jobs">
                  <div className="title-box">
                    <h3>{company.jobNumber} jobs available</h3>
                  </div>
                  {/* End .title-box */}

                  <RelatedJobs currentCompanyId={company?.id} />
                  {/* End RelatedJobs */}
                </div>
                {/* <!-- Related Jobs --> */}
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      {/*  compnay-info */}
                      <div className="sidebar-widget company-widget">
                        <div className="widget-content">
                          <div
                            className="company-title"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div className="company-logo">
                              <Avatar
                                size={64}
                                src={
                                  company?.company_photo
                                    ? formatImageUrl(company?.company_photo)
                                    : null
                                }
                              >
                                {!company?.company_photo && company?.name
                                  ? company?.name.charAt(0).toUpperCase()
                                  : ""}
                              </Avatar>
                            </div>
                            <h5
                              className="company-name"
                              style={{ marginTop: 10 }}
                            >
                              {company?.name}
                            </h5>
                          </div>

                          <div className="btn-box"></div>
                        </div>
                      </div>

                      <ul className="company-info mt-0">
                        <li>
                          Primary industry:{" "}
                          <span>
                            {company?.company_type
                              ?.toLowerCase()
                              .replace(/_/g, " ")
                              .split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </span>
                        </li>
                        <li>
                          Founded in: <span>{company?.stablished_in}</span>
                        </li>
                        <li>
                          Phone: <span>{company?.phone}</span>
                        </li>
                        <li>
                          Email: <span>{company?.email}</span>
                        </li>
                        <li>
                          Location: <span>{company?.location}</span>
                        </li>
                      </ul>
                      {/* End compnay-info */}

                      <div className="btn-box"></div>
                      {/* btn-box */}
                    </div>
                  </div>
                  {/* End company-widget */}

                  {/* End sidebar-widget */}
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

export default EmployersSingleV1;
