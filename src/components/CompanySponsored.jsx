import React from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Divider, Spin } from "antd";
import { useGetAllItemsData } from "@/queries/website.query/items.query";
import {
  formatImageUrl,
  getFallbackImage,
  handleImageError,
} from "@/utils/imageUtils";
import { useNavigate } from "react-router-dom";
import SmartText from "@/components/common/SmartText";
import { FaRegBuilding } from "react-icons/fa";

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

const CompanySponsored = ({ jobs = [] }) => {
  const { data, isLoading, isError, refetch } = useGetAllItemsData();
  const itemData = data?.data || [];
  const [imageLoadingStates, setImageLoadingStates] = React.useState({});
  const navigate = useNavigate();

  // Handle image loading state
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

  // Transform API data to match the expected format
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
      rating: 4.5, // Default rating since item_average_rating is null
      reviews: 42, // Default reviews count
      categoryColor: "#ff6f61", // Default color
      categoryIcon: "fa-warehouse", // Default icon
      item_slug: item.item_slug,
      id: item.id,
    };
  });

  const displayItems = jobs.length > 0 ? jobs : transformedItem;

  // Show loading state
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Spin size="large" />
      </div>
    );
  }

  // Show error state
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

  // Show empty state
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

  // Slider settings
  const settings = {
    dots: true,
    infinite: displayItems.length > 4,
    speed: 500,
    slidesToShow: 4,
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
    <section className="job-section alternate">
      <div className="auto-container">
        <div className="sec-title text-center">
          <h2>Sponsored & Most Popular Company</h2>
          <div className="text">
            Know your worth and find the Company that qualify your life
          </div>
        </div>
        {/* End sec-title */}

        <div className="job-slider-container" style={{ position: "relative" }}>
          <Slider {...settings}>
            {displayItems.map((job, idx) => (
              <div key={idx} style={{ padding: "0 10px" }}>
                <div
                  className="card-company"
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 2px 12px #0001",
                    margin: "0 auto",
                    maxWidth: "100%",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    {imageLoadingStates[`${idx}-item`] && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#f5f5f5",
                          zIndex: 1,
                        }}
                      >
                        <Spin size="small" />
                      </div>
                    )}
                    {job.image || job.avatar ? (
                      <img
                        src={job.image || job.avatar}
                        alt="Listing"
                        style={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          if (e.target.src !== job.avatar && job.avatar) {
                            e.target.src = job.avatar;
                          } else {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                            const icon = document.createElement("span");
                            icon.className = "fallback-icon";
                            e.target.parentNode.appendChild(icon);
                          }
                        }}
                        onLoad={() => handleImageLoad(idx, "item")}
                        onLoadStart={() => handleImageLoadStart(idx, "item")}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: 200,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#f5f5f5",
                        }}
                      >
                        <FaRegBuilding size={64} color="#bbb" />
                      </div>
                    )}
                    <span
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        background:
                          job.status === "OPEN" ? "#27ae60" : "#e74c3c",
                        color: "#fff",
                        borderRadius: 6,
                        padding: "2px 10px",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {job.status}
                    </span>

                    {job.featured && (
                      <span
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          background: "#fff",
                          color: "#ff9800",
                          borderRadius: 6,
                          padding: "2px 10px",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        Promoted
                      </span>
                    )}
                  </div>
                  <div className="card-body" style={{ padding: 16 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 600,
                          cursor: "pointer",
                          color: "#1890ff",
                        }}
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
                        {job.title}
                      </span>
                      <i
                        className="fa fa-check-circle"
                        style={{ color: "#27ae60", marginLeft: 6 }}
                      ></i>
                    </div>
                    {/* Subtitle */}
                    <SmartText text={job.subtitle} maxLength={80} />
                    <div
                      style={{ fontSize: 13, color: "#888", marginBottom: 8 }}
                    >
                      <i className="fa fa-phone" style={{ marginRight: 4 }}></i>{" "}
                      {job.phone} &nbsp;
                      <i
                        className="fa fa-map-marker-alt"
                        style={{ marginRight: 4 }}
                      ></i>{" "}
                      {job.location}
                    </div>
                    <Divider></Divider>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span
                        style={{
                          background: job.categoryColor,
                          color: "#fff",
                          borderRadius: 6,
                          padding: "2px 10px",
                          fontSize: 13,
                        }}
                      >
                        <i
                          className={`fa ${job.categoryIcon}`}
                          style={{ marginRight: 4 }}
                        ></i>
                        {job.category}
                      </span>
                      <span
                        style={{
                          fontWeight: 600,
                          color: "#27ae60",
                          fontSize: 15,
                        }}
                      >
                        {job.rating}
                      </span>
                      <span style={{ color: "#888", fontSize: 13 }}>
                        {job.reviews} Reviews
                      </span>
                    </div>
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
