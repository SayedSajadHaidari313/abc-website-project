import { Link } from "react-router-dom";

const About2 = () => {
  return (
    <>
      {/* <!-- Content Column --> */}
      <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
        <div className="inner-column" data-aos="fade-left">
          <div className="sec-title">
            <h2>
              Get applications from the <br />
              world best talents.
            </h2>
            <div className="text">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 600,000
              companies worldwide.
            </div>
          </div>
          <ul className="list-style-one">
            <li>Bring to the table win-win survival</li>
            <li>Capitalize on low hanging fruit to identify</li>
            <li>But I must explain to you how all this</li>
          </ul>
          <Link
            to="/employers-dashboard/post-jobs"
            className="theme-btn btn-style-one"
          >
            Post a Job
          </Link>
        </div>
      </div>
      {/* End .content-column */}

      {/* <!-- Image Column --> */}
      <div className="image-column col-lg-6 col-md-12 col-sm-12">
        <figure className="image-box" data-aos="fade-right">
          <img src="/images/resource/image-3.png" alt="resource" />
        </figure>

        {/* <!-- Count Employers --> */}
        {/* <div className="applicants-list" data-aos="fade-up">
          <div className="title-box">
            <h4>Applicants List</h4>
          </div>
          <ul className="applicants">
            <ApplicantsList />
          </ul>
        </div> */}
      </div>
      {/* End image-column */}
    </>
  );
};

export default About2;
