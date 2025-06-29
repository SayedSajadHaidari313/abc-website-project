import { Link } from "react-router-dom";
import recentJobApplied from "../../../../../data/job-featured";
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

const JobApplied = () => {
  const jobs = recentJobApplied.slice(0, 6);

  // Slider settings
  const settings = {
    dots: true,
    infinite: jobs.length > 2,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
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
    <div
      className="job-applied-slider-container"
      style={{ position: "relative" }}
    >
      <Slider {...settings}>
        {jobs.map((item) => (
          <div key={item.id} style={{ padding: "0 10px" }}>
            <div className="job-block">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo">
                    <img src={item.logo} alt="item brand" />
                  </span>
                  <h4>
                    <Link to={`/job-single-v1/${item.id}`}>
                      {item.jobTitle}
                    </Link>
                  </h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-briefcase"></span>
                      {item.company}
                    </li>
                    {/* compnay info */}
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {item.location}
                    </li>
                    {/* location info */}
                    <li>
                      <span className="icon flaticon-clock-3"></span>{" "}
                      {item.time}
                    </li>
                    {/* time info */}
                    <li>
                      <span className="icon flaticon-money"></span>{" "}
                      {item.salary}
                    </li>
                    {/* salary info */}
                  </ul>
                  {/* End .job-info */}

                  <ul className="job-other-info">
                    {item.jobType.map((val, i) => (
                      <li key={i} className={`${val.styleClass}`}>
                        {val.type}
                      </li>
                    ))}
                  </ul>
                  {/* End .job-other-info */}

                  <button className="bookmark-btn">
                    <span className="flaticon-bookmark"></span>
                  </button>
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

export default JobApplied;
