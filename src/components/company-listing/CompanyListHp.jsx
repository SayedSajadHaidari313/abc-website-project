// company list Hp
import React, { useState } from "react";
import { Spin, Alert, Pagination } from "antd";
import {
  useGetAllWebsiteItemsData,
  useGetItemsByCategoryId,
} from "@/queries/website.query/items.query";
import {
  formatImageUrl,
  getFallbackImage,
  createSafeImageErrorHandler,
} from "@/utils/imageUtils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TbMoodEmptyFilled } from "react-icons/tb";
import { FaRegBuilding } from "react-icons/fa";
import SmartText from "@/components/common/SmartText";
import { truncateText } from "@/utils/PublicTruncat";

const CompanyListHp = ({ jobs = [], searchQuery = "", location = "" }) => {
  const [pageSize] = useState(8);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [imageLoadingStates, setImageLoadingStates] = React.useState({});
  const [isPageChanging, setIsPageChanging] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");
  const isCategorySelected = !!category;
  const categoryId = category ? Number(category) : undefined;

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
      });

  const itemData = data?.data || data?.items || [];
  const totalItems = data?.total || 0;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (itemData.length > 0) {
      const transformedItems = itemData.map((item, index) => {
        const itemImageUrl = formatImageUrl(item.item_image);
        const userImageUrl = formatImageUrl(item.user?.user_image, "user");

        return {
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
          categoryColor: "#ff6f61",
          categoryIcon: "fa-warehouse",
          item_slug: item.item_slug,
          id: item.id,
        };
      });

      setDisplayedItems(transformedItems);
      // Hide loading state when new data is loaded
      setIsPageChanging(false);
    }
  }, [itemData]);

  const handlePageChange = (page) => {
    // Show loading state
    setIsPageChanging(true);

    // Update URL search parameters to persist page state
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    setSearchParams(newSearchParams);
    // No scroll - stays in same position
  };

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

  if (isLoading && currentPage === 1) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Spin size="large" />
      </div>
    );
  }

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

  if (displayedItems.length === 0) {
    return (
      <section className="job-section alternate company-list-hp__container">
        <div className="company-list-hp__empty-state">
          <TbMoodEmptyFilled
            size={80}
            color="#bbb"
            className="company-list-hp__empty-state-icon"
          />
          <div className="company-list-hp__empty-state-title">
            No items found in this category.
          </div>
          <div className="company-list-hp__empty-state-subtitle">
            Try adjusting your filters or check back later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="auto-container">
      <div className="col-lg-12">
        {/* Loading overlay when page is changing */}
        {isPageChanging && (
          <div className="company-list-hp__page-loading-overlay">
            <div className="company-list-hp__page-loading-content">
              <Spin size="large" />
              <div className="company-list-hp__page-loading-text">
                Loading companies...
              </div>
            </div>
          </div>
        )}

        <div className="row">
          {displayedItems.map((job, idx) => (
            <div
              key={idx}
              className="col-xl-2-4 col-lg-2 col-md-4 col-sm-4 col-xs-3 mb-4"
            >
              <div className="company-card">
                <div className="company-list-hp__card-image-container">
                  {imageLoadingStates[`${idx}-item`] && (
                    <div className="loading-overlay">
                      <Spin size="small" />
                    </div>
                  )}
                  {job.image || job.avatar ? (
                    <img
                      src={job.image || job.avatar}
                      alt="Listing"
                      className="company-list-hp__card-image"
                      onError={createSafeImageErrorHandler(
                        job.avatar,
                        "item",
                        (e) => {
                          // Show fallback icon when both main image and avatar fail
                          if (
                            !e.target.parentNode.querySelector(".fallback-icon")
                          ) {
                            const icon = document.createElement("span");
                            icon.className = "fallback-icon";
                            e.target.parentNode.appendChild(icon);
                          }
                        }
                      )}
                      onLoad={() => handleImageLoad(idx, "item")}
                      onLoadStart={() => handleImageLoadStart(idx, "item")}
                    />
                  ) : (
                    <div className="company-list-hp__card-fallback">
                      <FaRegBuilding size={64} color="#bbb" />
                    </div>
                  )}

                  {job.status && (
                    <span
                      className={`company-list-hp__card-status company-list-hp__card-status--${job.status.toLowerCase()}`}
                    >
                      {job.status}
                    </span>
                  )}

                  {job.featured && (
                    <span className="company-list-hp__card-featured">
                      Promoted
                    </span>
                  )}
                </div>

                <div className="company-list-hp__card-body">
                  <div className="company-list-hp__card-title-container">
                    <span
                      className="company-list-hp__card-title"
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
                    <i className="fa fa-check-circle company-list-hp__card-verified"></i>
                  </div>

                  <SmartText
                    text={job.subtitle}
                    maxLength={60}
                    className="company-list-hp__card-description"
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
        </div>

        {/* Pagination Component */}
        {totalItems > pageSize && (
          <div className="company-list-hp__pagination">
            <Pagination
              current={currentPage}
              total={totalItems}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
              showQuickJumper
              responsive={true}
              size="default"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyListHp;
