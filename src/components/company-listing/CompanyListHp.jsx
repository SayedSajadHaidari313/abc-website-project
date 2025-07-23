import React, { useState } from "react";
import { Divider, Spin, Alert, Button } from "antd";
import {
  useGetAllWebsiteItemsData,
  useGetItemsByCategoryId,
} from "@/queries/website.query/items.query";
import { formatImageUrl, getFallbackImage } from "@/utils/imageUtils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TbMoodEmptyFilled } from "react-icons/tb";
import { FaRegBuilding } from "react-icons/fa";
import SmartText from "@/components/common/SmartText";
import { truncateText } from "@/utils/PublicTruncat";

const CompanyListHp = ({
  jobs = [],
  searchQuery = "",
  location = "",
  // category = "",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Use categoryId if category is selected, otherwise use default fetch
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const isCategorySelected = !!category;
  const categoryId = category ? Number(category) : undefined;

  // const categoryId = category ? Number(category) : undefined;
  const { data, isLoading, isError, refetch } = isCategorySelected
    ? useGetItemsByCategoryId({
        categoryId,
        current: currentPage,
        pageSize: pageSize,
        searchQuery: searchQuery,
      })
    : useGetAllWebsiteItemsData({
        current: currentPage,
        pageSize: pageSize,
        searchQuery: searchQuery,
        location: location,
        // Do NOT pass category here!
      });

  const itemData = data?.data || data?.items || [];
  const totalItems = data?.total || 0;
  const [imageLoadingStates, setImageLoadingStates] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    if (itemData.length > 0) {
      const transformedNewItems = itemData.map((item, index) => {
        const itemImageUrl = formatImageUrl(item.item_image);
        const userImageUrl = formatImageUrl(item.user?.user_image, "user");

        return {
          // status: item.item_status === 1 ? "OPEN" : "CLOSED",
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
          categoryColor: "#ff6f61", // Default color
          categoryIcon: "fa-warehouse", // Default icon
          item_slug: item.item_slug,
          id: item.id,
        };
      });

      // Append new items or reset if it's the first page
      setDisplayedItems((prev) =>
        currentPage === 1
          ? transformedNewItems
          : [...prev, ...transformedNewItems]
      );

      // Check if we've reached the end of items
      setHasMoreItems(transformedNewItems.length === pageSize);
      setIsLoadingMore(false);
    }
  }, [itemData, currentPage]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setCurrentPage((prev) => prev + 1);
  };

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
    const userImageUrl = formatImageUrl(item.user?.user_image, "user");

    return {
      // status: item.item_status === 1 ? "OPEN" : "CLOSED",
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
      categoryColor: "#ff6f61", // Default color
      categoryIcon: "fa-warehouse", // Default icon
      item_slug: item.item_slug,
      id: item.id,
    };
  });

  const displayItems = jobs.length > 0 ? jobs : transformedItem;

  // Helper function to detect Farsi (Persian) text
  function isFarsi(text) {
    return /[\u0600-\u06FF]/.test(text);
  }

  // Show loading state
  if (isLoading && currentPage === 1) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Spin size="large" />
      </div>
    );
  }

  // Show error state
  if (isError) {
    return (
      <Alert
        message="Error fetching data"
        description="Please try again later."
        type="error"
        showIcon
      />
    );
  }

  // Show empty state
  if (displayedItems.length === 0) {
    return (
      <section
        className="job-section alternate"
        style={{
          minHeight: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <TbMoodEmptyFilled
            size={80}
            color="#bbb"
            style={{ marginBottom: 20, opacity: 0.7 }}
          />
          <div
            style={{
              fontSize: 20,
              color: "#888",
              fontWeight: 500,
              marginBottom: 8,
            }}
          >
            No items found in this category.
          </div>
          <div style={{ fontSize: 14, color: "#bbb" }}>
            Try adjusting your filters or check back later.
          </div>
        </div>
      </section>
    );
  }

  // Main render
  return (
    <div className="auto-container">
      <div className="col-lg-12">
        {/* <style>{`
          .col-5-items {
            flex: 0 0 20%;
            max-width: 20%;
          }
          
          @media (max-width: 1199px) {
            .col-5-items {
              flex: 0 0 25%;
              max-width: 25%;
            }
          }
          
          @media (max-width: 991px) {
            .col-5-items {
              flex: 0 0 33.333%;
              max-width: 33.333%;
            }
          }
          
          @media (max-width: 767px) {
            .col-5-items {
              flex: 0 0 50%;
              max-width: 50%;
            }
          }
          
          @media (max-width: 575px) {
            .col-5-items {
              flex: 0 0 100%;
              max-width: 100%;
            }
          }
        `}</style> */}

        <div
          className="row"
          style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "0 -10px", // Negative margin to counteract padding
          }}
        >
          {displayedItems.map((job, idx) => (
            <div
              key={idx}
              className="col-xl-2 col-lg-3 col-md-4 col-sm-3 col-xs-3 mb-4"
            >
              <div
                className="company-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 2px 12px #0001",
                  border: "1px solid #f0f0f0",
                  height: "100%", // Ensure equal height
                }}
              >
                {/* Photo Section */}
                <div
                  style={{
                    position: "relative",
                    paddingTop: "75%", // Responsive aspect ratio
                    overflow: "hidden",
                  }}
                >
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
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
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
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f5f5f5",
                      }}
                    >
                      <FaRegBuilding size={64} color="#bbb" />
                    </div>
                  )}

                  {/* Status and Featured Badges */}
                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      background: job.status === "OPEN" ? "#27ae60" : "#e74c3c",
                      color: "#fff",
                      borderRadius: 6,
                      padding: "2px 10px",
                      fontSize: 12,
                      fontWeight: 600,
                      zIndex: 2,
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
                        zIndex: 2,
                      }}
                    >
                      Promoted
                    </span>
                  )}
                </div>

                {/* Details Section */}
                <div
                  className="card-body"
                  style={{
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
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
                        fontSize: 16,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        flex: 1,
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
                      {truncateText(job.title, 20)}{" "}
                    </span>
                    <i
                      className="fa fa-check-circle"
                      style={{ color: "#27ae60", marginLeft: 6, fontSize: 14 }}
                    ></i>
                  </div>

                  <SmartText
                    text={job.subtitle}
                    maxLength={60}
                    style={{
                      color: "#666",
                      marginBottom: 0,
                      fontSize: 12,
                      flex: 1,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreItems && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <button
              className="theme-btn btn-style-one"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <>
                  <Spin size="small" style={{ marginRight: "8px" }} />
                  Loading...
                </>
              ) : (
                "Load More Companies"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyListHp;
