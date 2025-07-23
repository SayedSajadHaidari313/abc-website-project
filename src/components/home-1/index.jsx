
import AppSection from "../app-section/AppSection";
import LoginPopup from "../common/form/login/LoginPopup";
import FooterDefault from "../footer/common-footer";
import MobileMenu from "../header/MobileMenu";
import Hero1 from "../hero/hero-1";
import CallToAction2 from "../call-to-action/CallToAction2";
import DefaulHeader from "../header/DefaulHeader";
import JobFeatured2 from "../job-featured/JobFeatured2";
// import TopCompany from "../top-company/TopCompany";
import JobFeatured12 from "../job-featured/JobFeatured12";
import { useGetPostJobsData } from "@/queries/post.jobs.query";
import Block9 from "../block/Block9";

const index = () => {
  const { data } = useGetPostJobsData();
  return (
    <>
      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Hero1 />
      {/* End Hero Section */}

      <section className="job-section">
        <div className="auto-container">
          <div className="job-carousel gap-x25">
            <div className="sec-title text-center">
              <h3>
                Available Jobs{" "}
                <span style={{ fontSize: "0.8em", color: "GrayText" }}>
                  ({data?.total_jobs})
                </span>
              </h3>
            </div>
            <JobFeatured12 />
          </div>

          <div className="row " data-aos="fade-up">
            <JobFeatured2 />
          </div>
        </div>
      </section>
      <section className="top-companies">
        <div className="auto-container">
          <div className="sec-title">
            <h2>Top Company Registered</h2>
            <div className="text">
              Some of the companies we have helped recruit excellent applicants
              over the years.
            </div>
          </div>

          <div className="carousel-outer" data-aos="fade-up">
            <div className="companies-carousel">
              {/* <TopCompany /> */}
            </div>
          </div>
        </div>
      </section>
      <section className="layout-pt-120 layout-pb-60 testimonial-section style-two">
        <div className="auto-container">
          {/* <!-- Sec Title --> */}
          <div className="sec-title text-center">
            <h2 className="fw-700">
              It’s Easy to Start Sharing Ideas and Discovering Insights
            </h2>
            <div className="text">
              From exploring what others share to posting your own experiences –
              it all starts here. Vote, bookmark, and join the conversation!
            </div>
          </div>

          <div className="row grid-base">
            <Block9 />
          </div>
        </div>
      </section>
     
      <section className="app-section">
        <div className="auto-container">
          <AppSection />
        </div>
      </section>
      <hr />
      {/* <!-- End App Section --> */}

      <CallToAction2 />
      {/* <!-- End Call To Action --> */}

      <FooterDefault />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
