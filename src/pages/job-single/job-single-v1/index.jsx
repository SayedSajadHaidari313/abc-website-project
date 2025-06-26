import { useNavigate, useParams } from "react-router-dom";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import RelatedJobs from "@/components/job-single-pages/related-jobs/RelatedJobs";
import JobOverView from "@/components/job-single-pages/job-overview/JobOverView";
import CompnayInfo from "@/components/job-single-pages/shared-components/CompanyInfo";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import ApplyJobModalContent from "@/components/job-single-pages/shared-components/ApplyJobModalContent";
import MetaComponent from "@/components/common/MetaComponent";
import { useGetPostJobsData } from "@/queries/post.jobs.query";
import moment from "moment";
import { Alert, Avatar, Divider, Modal, Skeleton } from "antd";
import { useAuthStore } from "@/auth/auth.store";
import { useState } from "react";
import ApplyJobModalContentEmail from "@/components/job-single-pages/shared-components/ApplyJobModalContentEmail";
import ApplyJobRedirectExternal from "@/components/job-single-pages/shared-components/ApplyJobRedirectExternal";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const metadata = {
  title: "Job Single Dynamic V1 || InsightDeed - Job Board ReactJs Template",
  description: "InsightDeed - Job Board ReactJs Template",
};

const JobSingleDynamicV1 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token, user } = useAuthStore();
  const navigate = useNavigate();

  const { id } = useParams(); 
  const { data: jobs, isLoading, isError } = useGetPostJobsData(); 
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

  const company = jobs?.data?.find((item) => item?.id == id) || jobs?.data[0];
  
  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/${path.replace(/\\/g, "/")}`;
  };

  const getStyleClass = (jobType) => {
    switch (jobType) {
      case "full_time":
        return "full_time";
      case "part_time":
        return "part_time";
      case "freelance":
        return "freelance";
      case "internship":
        return "internship";
      case "remote":
        return "remote";
      default:
        return "other";
    }
  };

  const handleApplyClick = (e) => {
    e.preventDefault();

    if (company?.application_type === "online") {
      if (token && user?.role === "JOB_SEEKER") {
        setIsModalOpen(true);
      } else {
        navigate("/login");
      }
    } else if (
      company?.application_type === "submission_email" ||
      company?.application_type === "external_link"
    ) {
      setIsModalOpen(true);
    } else {
      console.warn("Unsupported application type.");
    }
  };

  const renderApplyJobModalContent = () => {
    switch (company?.application_type) {
      case "online":
        return (
          <ApplyJobModalContent
            postJobId={company?.id}
            onClose={() => setIsModalOpen(false)}
          />
        );
      case "submission_email":
        return (
          <ApplyJobModalContentEmail
            submissionEmail={company?.submission_email}
            submissionGuideline={company?.submission_guideline}
            onClose={() => setIsModalOpen(false)}
          />
        );
      case "external_link":
        return (
          <ApplyJobRedirectExternal
            applyOnlineLink={company?.apply_online_link}
          />
        );
      default:
        return <p>Unsupported application type.</p>;
    }
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <span className="header-span"></span>

      <LoginPopup />
      <DefaulHeader />
      <MobileMenu />

      <section className="job-detail-section">
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <Avatar
                      size={64}
                      src={
                        company?.company?.company_photo
                          ? formatImageUrl(company?.company?.company_photo)
                          : null
                      }
                      alt={company?.company?.company_name}
                    >
                      {!company?.company?.company_photo &&
                      company?.company?.company_name
                        ? company?.company?.company_name.charAt(0).toUpperCase()
                        : ""}
                    </Avatar>
                  </span>
                  <h4>{company?.job_title}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {company?.company?.company_name}
                    </li>
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {company?.provinces},{company?.countries}
                    </li>
                    <li>
                      <span className="icon flaticon-clock-3"></span>
                      {moment(company?.created_at).fromNow()}
                    </li>
                    <li>
                      <span className="icon flaticon-money"></span>{" "}
                      {company.salary_range}
                    </li>
                  </ul>

                  <ul className="job-other-info">
                    <li
                      className={`job-tag ${getStyleClass(company.job_type)}`}
                    >
                      {company.job_type
                        ?.replace("_", " ")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </li>
                  </ul>
                </div>

                <div className="btn-box">
                  <a
                    href="#"
                    className="theme-btn btn-style-one"
                    onClick={handleApplyClick}
                  >
                    Apply For Job
                  </a>
                </div>
                {/* 
                <Modal
                  title="Apply for Job"
                  open={isModalOpen}
                  onCancel={() => setIsModalOpen(false)}
                  footer={null}
                >
                  <ApplyJobModalContent
                    postJobId={company?.id}
                    onClose={() => setIsModalOpen(false)}
                  />
                </Modal> */}
                <Modal
                  title="Apply for Job"
                  open={isModalOpen}
                  onCancel={() => setIsModalOpen(false)}
                  footer={null}
                >
                  {renderApplyJobModalContent()}
                </Modal>

                {/* <div
                  className="modal fade"
                  id="applyJobModal"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="apply-modal-content modal-content">
                      <div className="text-center">
                        <h3 className="title">Apply for this job</h3>
                        <button
                          type="button"
                          className="closed-modal"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>

                      <ApplyJobModalContent />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <JobDetailsDescriptions currentJobId={company?.id} />
                <Divider />

                {/* <div className="other-options">
                  <div className="social-share">
                    <h5>Share this job</h5>
                    <SocialTwo />
                  </div>
                </div> */}

                <div className="related-jobs">
                  <div className="title-box">
                    <h3>Related Jobs</h3>
                  </div>

                  <RelatedJobs
                    currentJobId={company?.id}
                    currentCategoryId={company?.job_category_id}
                  />
                </div>
              </div>

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <h4 className="widget-title">Job Overview</h4>
                    <JobOverView currentJobId={company?.id} />

                    {/* <h4 className="widget-title mt-5">Job Location</h4>
                    <div className="widget-content">
                      <div className="map-outer">
                        <div style={{ height: "300px", width: "100%" }}>
                          <MapJobFinder />
                        </div>
                      </div>
                    </div>

                    <h4 className="widget-title">Job Skills</h4>
                    <div className="widget-content">
                      <JobSkills />
                    </div> */}
                  </div>

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
                              company?.company?.company_photo
                                ? formatImageUrl(
                                    company?.company?.company_photo
                                  )
                                : null
                            }
                          >
                            {!company?.company?.company_photo &&
                            company?.company?.name
                              ? company?.company?.name.charAt(0).toUpperCase()
                              : ""}
                          </Avatar>
                        </div>

                        <h5 className="company-name" style={{ marginTop: 10 }}>
                          {company?.company?.company_name}
                        </h5>
                      </div>

                      <CompnayInfo currentCompanyId={company?.company_id} />

                      <div className="btn-box"></div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterDefault footerStyle="alternate5" />
    </>
  );
};

export default JobSingleDynamicV1;
