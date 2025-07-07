import React from "react";
import { Divider, Spin, Pagination, Input, Alert } from "antd";
import {
  useGetAllWebsiteItemsData,
  useGetItemsByCategoryId,
} from "@/queries/website.query/items.query";
import { formatImageUrl, getFallbackImage } from "@/utils/imageUtils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TbMoodEmptyFilled } from "react-icons/tb";
import { FaRegBuilding } from "react-icons/fa";
import SmartText from "@/components/common/SmartText";
import { useGetAllCategoryData } from "@/queries/website.query/category.query";

const CompanyPage1 = ({
  jobs = [],
  searchQuery = "",
  location = "",
  // category = "",
}) => {
  const [pagination, setPagination] = React.useState({
    current: 1,
    pageSize: 9,
  });

  // Fetch all categories for recursive child lookup
  const { data: categoryData } = useGetAllCategoryData();
  const categories = categoryData?.data || [];

  // Helper: recursively get all child category IDs
  const getAllChildCategoryIds = (categories, parentId) => {
    let result = [];
    categories.forEach((cat) => {
      if (cat.category_parent_id === parentId) {
        result.push(cat.id);
        result = result.concat(getAllChildCategoryIds(categories, cat.id));
      }
    });
    return result;
  };

  // Use categoryId if category is selected, otherwise use default fetch
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const isCategorySelected = !!category;
  const categoryId = category ? Number(category) : undefined;

  // If a category is selected, get all child IDs and use as comma-separated string
  let categoryIdsParam = undefined;
  if (isCategorySelected && categories.length > 0) {
    const allCategoryIds = [
      categoryId,
      ...getAllChildCategoryIds(categories, categoryId),
    ];
    categoryIdsParam = allCategoryIds.join(",");
  }

  const { data, isLoading, isError, refetch } = isCategorySelected
    ? useGetAllWebsiteItemsData({
        current: pagination.current,
        pageSize: pagination.pageSize,
        searchQuery: searchQuery,
        location: location,
        category: categoryIdsParam,
      })
    : useGetAllWebsiteItemsData({
        current: pagination.current,
        pageSize: pagination.pageSize,
        searchQuery: searchQuery,
        location: location,
        // Do NOT pass category here!
      });

  const itemData = data?.data || [];
  const totalItems = data?.data?.total || 0;

  const [imageLoadingStates, setImageLoadingStates] = React.useState({});
  const navigate = useNavigate();

  console.log("itemData", itemData);

  // Test image URLs when data changes
  React.useEffect(() => {
    if (itemData.length > 0) {
      itemData.forEach((item, index) => {
        const itemImageUrl = formatImageUrl(item.item_image);
        const userImageUrl = formatImageUrl(item.user?.user_image, "user");

        if (itemImageUrl) {
          testImageUrl(itemImageUrl).then((isAccessible) => {
            console.log(
              `Item ${index + 1} image accessible:`,
              isAccessible,
              itemImageUrl
            );
          });
        }

        if (userImageUrl) {
          testImageUrl(userImageUrl).then((isAccessible) => {
            console.log(
              `Item ${index + 1} user image accessible:`,
              isAccessible,
              userImageUrl
            );
          });
        }
      });
    }
  }, [itemData]);

  const handlePageChange = (page, pageSize) => {
    setPagination({ current: page, pageSize: pageSize });
    window.scrollTo(0, 0);
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

  // Test image URL accessibility
  const testImageUrl = async (url) => {
    if (!url) return false;
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      console.warn("Image test failed for:", url, error);
      return false;
    }
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
      <Alert
        message="Error fetching data"
        description="Please try again later."
        type="error"
        showIcon
      />
    );
  }

  // Show empty state
  if (displayItems.length === 0) {
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

  return (
    <div className="auto-container">
      <div className="col-lg-12">
        <div className="row">
          {displayItems.map((job, idx) => (
            <div
              key={idx}
              className="col-xl-3 col-lg-3 col-md-6 col-sm-12"
              style={{ padding: "0 10px", marginBottom: "20px" }}
            >
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
                      background: job.status === "OPEN" ? "#27ae60" : "#e74c3c",
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
                  <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>
                    <SmartText text={job.subtitle} maxLength={80} />
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#888",
                      marginBottom: 8,
                    }}
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="pagination-container"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={totalItems}
            onChange={handlePageChange}
            showSizeChanger
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyPage1;
