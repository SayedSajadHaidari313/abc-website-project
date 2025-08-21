// company hero
import React, { useState } from "react";
import { Spin, Pagination, Alert } from "antd";
import {
  useGetAllWebsiteItemsData,
  useGetItemsByCategoryId,
} from "@/queries/website.query/items.query";
import {
  getFallbackImage,
  createSafeImageErrorHandler,
} from "@/utils/imageUtils";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TbMoodEmptyFilled } from "react-icons/tb";
import { FaRegBuilding } from "react-icons/fa";
import SmartText from "@/components/common/SmartText";
import { truncateText } from "@/utils/PublicTruncat";
import { BankOutlined } from "@ant-design/icons";

const CompanyHero = ({
  jobs = [],
  searchQuery = "",
  location = "",
  category = "",
}) => {
  const [pageSize] = useState(12);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [imageLoadingStates, setImageLoadingStates] = React.useState({});
  const [isPageChanging, setIsPageChanging] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get("category") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");
  const activeCategory = category || urlCategory;
  const isCategorySelected = !!activeCategory;
  const categoryId = activeCategory ? Number(activeCategory) : undefined;

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
        category: activeCategory,
      });

  const itemData = data?.data || data?.items || [];
  const totalItems = data?.total || 0;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (itemData.length > 0) {
      const transformedItems = itemData?.map((item, index) => {
        return {
          status: item.item_status === 1 ? "OPEN" : "CLOSED",
          featured: item.item_featured_by_admin === 1,
          image: item.item_image
            ? `${BASE_IMAGE_URL}/${item.item_image}`
            : getFallbackImage("item"),
          avatar: item.user?.user_image
            ? `${BASE_IMAGE_URL}/${item.user.user_image}`
            : getFallbackImage("item"),
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

  const displayItems = jobs.length > 0 ? jobs : displayedItems;

  if (isLoading && currentPage === 1) {
    return (
      <div className="company-hero__loading">
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

  if (displayItems.length === 0) {
    return (
      <section className="job-section alternate company-hero__empty-state">
        <div className="company-hero__empty-state-content">
          <TbMoodEmptyFilled
            size={80}
            color="#bbb"
            className="company-hero__empty-state-icon"
          />
          <div className="company-hero__empty-state-title">
            No items found in this category.
          </div>
          <div className="company-hero__empty-state-subtitle">
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
          <div className="company-hero__page-loading-overlay">
            <div className="company-hero__page-loading-content">
              <Spin size="large" />
              <div className="company-hero__page-loading-text">
                Loading companies...
              </div>
            </div>
          </div>
        )}

        {/* Mobile filter toggle placed above the companies grid */}
        <div
          className="show-1023"
          style={{ padding: "0 15px", marginBottom: 15 }}
        >
          <button
            type="button"
            className="theme-btn btn-style-one w-100"
            data-bs-toggle="offcanvas"
            data-bs-target="#filter-sidebar"
            aria-controls="filter-sidebar"
          >
            <span className="la la-filter" style={{ marginRight: 8 }}></span>
            Filters
          </button>
        </div>

        <div className="row">
          {displayItems.map((job, idx) => (
            <div
              key={idx}
              className="col-xl-2-6 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4"
            >
              <div className="company-card">
                <div className="company-hero__card-image-container">
                  {imageLoadingStates[`${idx}-item`] && (
                    <div className="company-hero__card-loading">
                      <Spin size="small" />
                    </div>
                  )}
                  {job.image || job.avatar ? (
                    <img
                      src={
                        job.image ? (
                          `${BASE_IMAGE_URL}/${job.avatar}`
                        ) : (
                          <BankOutlined />
                        )
                      }
                      // src={job.image || job.avatar}
                      alt="Listing"
                      className="company-hero__card-image"
                      onError={createSafeImageErrorHandler(
                        job.avatar,
                        "item",
                        (e) => {
                          // Show fallback icon when both main image and avatar fail
                          const icon = document.createElement("span");
                          icon.className = "fallback-icon";
                          e.target.parentNode.appendChild(icon);
                        }
                      )}
                      onLoad={() => handleImageLoad(idx, "item")}
                      onLoadStart={() => handleImageLoadStart(idx, "item")}
                    />
                  ) : (
                    <div className="company-hero__card-fallback">
                      <FaRegBuilding size={64} color="#bbb" />
                    </div>
                  )}

                  {job.featured && (
                    <span className="company-hero__card-featured">
                      Promoted
                    </span>
                  )}
                </div>

                <div className="company-hero__card-body">
                  <div className="company-hero__card-title-container">
                    <span
                      className="company-hero__card-title"
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
                    <i className="fa fa-check-circle company-hero__card-verified"></i>
                  </div>

                  <SmartText
                    text={job.subtitle}
                    maxLength={60}
                    className="company-hero__card-description"
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
          <div className="company-hero__pagination">
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

export default CompanyHero;
