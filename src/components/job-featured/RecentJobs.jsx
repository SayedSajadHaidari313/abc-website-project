import { Link } from "react-router-dom";
import jobFeatured from "../../data/job-featured";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// Custom arrow components
const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-prev`} onClick={onClick}>
      <LeftOutlined />
    </div>
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-next`} onClick={onClick}>
      <RightOutlined />
    </div>
  );
};

const RecentJobs = () => {
  const jobs = jobFeatured.slice(20, 22);

  // Slider settings
  const settings = {
    dots: true,
    infinite: jobs.length > 1,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="recent-jobs-slider-container">
      <Slider {...settings}>
        {jobs.map((item) => (
          <div key={item.id} className="recent-jobs-container">
            <div className="job-block-four">
              <div className="inner-box">
                <ul className="job-other-info">
                  {item.jobType.map((val, i) => (
                    <li key={i} className={`${val.styleClass}`}>
                      {val.type}
                    </li>
                  ))}
                </ul>
                <span className="company-logo">
                  <img src={item.logo} alt="featured job" />
                </span>
                <span className="company-name">Catalyst</span>
                <h4>
                  <Link to={`/job-single-v3/${item.id}`}>{item.jobTitle}</Link>
                </h4>
                <div className="location">
                  <span className="icon flaticon-map-locator"></span>
                  {item.location}
                </div>
              </div>
            </div>
            {/* End job-block */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecentJobs;
