// company sponsored
import React from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useGetAllItemsData } from "@/queries/website.query/items.query";
import { formatImageUrl, getFallbackImage } from "@/utils/imageUtils";
import { useNavigate } from "react-router-dom";
import SmartText from "@/components/common/SmartText";
import { FaRegBuilding } from "react-icons/fa";
import { truncateText } from "@/utils/PublicTruncat";

// Custom arrow components
const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} slick-arrow slick-prev custom-prev company-sponsored__arrow--prev`}
      onClick={onClick}
    >
      <LeftOutlined />
    </div>
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} slick-arrow slick-next custom-next company-sponsored__arrow--next`}
      onClick={onClick}
    >
      <RightOutlined />
    </div>
  );
};

const CompanySponsored = ({ jobs = [] }) => {
  const { data, isLoading, isError, refetch } = useGetAllItemsData();
  const itemData = data?.data || [];
  const [imageLoadingStates, setImageLoadingStates] = React.useState({});
  const navigate = useNavigate();

  const handleImageLoad = (index, type) => {
    setImageLoadingStates((prev) => ({
      ...prev,
      [`${index}-${type}`]: false,
    }));
  };

  const handleImageLoadStart = (index, type) => {
    setImageLoadingStates((prev) => ({
      ...prev,
      [`${index}-${type}`]: true,
    }));
  };

  const transformedItem = itemData?.map((item, index) => {
    const itemImageUrl = formatImageUrl(item.item_image);
    const userImageUrl = formatImageUrl(item.user?.user_image, "item");

    return {
      status: item.item_status === 1 ? "OPEN" : "CLOSED",
      featured: item.item_featured_by_admin === 1,
      image: itemImageUrl || getFallbackImage("item"),
      avatar: userImageUrl || getFallbackImage("item"),
      title: item.item_title,
      subtitle: item.item_description,
      phone: item.item_phone,
      location: `${item.city?.city_name || ""} ${
        item.country?.name || ""
      }`.trim(),
      category: item.category?.category_name,
      rating: 4.5,
      reviews: 42,
      categoryColor: "#ff6f61",
      categoryIcon: "fa-warehouse",
      item_slug: item.item_slug,
      id: item.id,
    };
  });

  const displayItems = jobs.length > 0 ? jobs : transformedItem;

  if (isLoading) {
    return (
      <div className="company-sponsored__loading">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <section className="job-section alternate">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Most Popular Company</h2>
            <div className="text">Error loading data. Please try again.</div>
          </div>
        </div>
      </section>
    );
  }

  if (displayItems.length === 0) {
    return (
      <section className="job-section alternate">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>Sponsored & Most Popular Company</h2>
            <div className="text">No Company available at the moment.</div>
          </div>
        </div>
      </section>
    );
  }

  const settings = {
    dots: true,
    infinite: displayItems.length > 4,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <section className="job-section alternate">
      <div className="auto-container">
        <div className="sec-title text-center">
          <h2>Sponsored & Most Popular Company</h2>
          <div className="text">
            Know your worth and find the Company that qualify your life
          </div>
        </div>

        <div className="company-sponsored__slider-container">
          <Slider {...settings}>
            {displayItems.map((job, idx) => (
              <div key={idx} className="company-sponsored__slide">
                <div className="company-sponsored__card">
                  <div className="company-sponsored__card-image-container">
                    {imageLoadingStates[`${idx}-item`] && (
                      <div className="company-sponsored__card-loading">
                        <Spin size="small" />
                      </div>
                    )}
                    {job.image || job.avatar ? (
                      <img
                        src={job.image || job.avatar}
                        alt="Listing"
                        className="company-sponsored__card-image"
                        onLoad={() => handleImageLoad(idx, "item")}
                        onLoadStart={() => handleImageLoadStart(idx, "item")}
                      />
                    ) : (
                      <div className="company-sponsored__card-fallback">
                        <FaRegBuilding size={64} color="#bbb" />
                      </div>
                    )}

                    {job.featured && (
                      <span className="company-sponsored__card-featured">
                        Promoted
                      </span>
                    )}
                  </div>

                  <div className="company-sponsored__card-body">
                    <div className="company-sponsored__card-title-container">
                      <span
                        className="company-sponsored__card-title"
                        onClick={() =>
                          navigate(
                            `/company/${
                              job.item_slug ||
                              job.id ||
                              job.title.toLowerCase().replace(/\s+/g, "-")
                            }`
                          )
                        }
                      >
                        {truncateText(job.title, 20)}
                      </span>
                      <i className="fa fa-check-circle company-sponsored__card-verified"></i>
                    </div>

                    <SmartText
                      text={job.subtitle}
                      maxLength={50}
                      className="company-sponsored__card-description"
                    />

                    <button
                      className="theme-btn btn-style-one"
                      onClick={() =>
                        navigate(
                          `/company/${
                            job.item_slug ||
                            job.id ||
                            job.title.toLowerCase().replace(/\s+/g, "-")
                          }`
                        )
                      }
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default CompanySponsored;
