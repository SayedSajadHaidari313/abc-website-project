import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useGetRfpsData } from "@/queries/website.query/rfps.query";
import { formatImageUrl } from "@/utils/imageUtils";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { Pagination, Spin, Alert } from "antd";
import { useSearchParams } from "react-router-dom";
import React from "react";

const getRequestTypeDisplay = (type) => {
  const types = {
    RFP: "Request for Proposal",
    rfp: "Request for Proposal",
    rfq: "Request for Quote",
    RFQ: "Request for Quote",
    tib: "Invitation to Bidding",
    ITB: "Invitation to Bidding",
  };
  const name = types[type] || type;
  return `${name} (${type})`;
};

const RfpFeatured7 = () => {
  // Get search keyword from Redux filter state
  const keyword = useSelector((state) => state.employerFilter.keyword);
  const [pageSize] = useState(10);
  const [isPageChanging, setIsPageChanging] = useState(false);

  // URL search params for page persistence
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const { data, isLoading, isError } = useGetRfpsData(
    currentPage,
    pageSize,
    keyword
  );
  const rfpsData = data?.data || [];
  const total = data?.total || 0;

  // Hide loading state when new data is loaded
  React.useEffect(() => {
    if (rfpsData.length > 0) {
      setIsPageChanging(false);
    }
  }, [rfpsData]);

  const handlePageChange = (page) => {
    // Show loading state
    setIsPageChanging(true);

    // Update URL search parameters to persist page state
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    setSearchParams(newSearchParams);
    // No scroll - stays in same position
  };

  if (isLoading && currentPage === 1) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return <Alert message="Error fetching data" type="error" showIcon />;
  }

  if (rfpsData.length === 0) {
    return <Alert message="No RFPs found" type="info" showIcon />;
  }

  return (
    <>
      {/* Loading overlay when page is changing */}
      {isPageChanging && (
        <div className="company-list-hp__page-loading-overlay">
          <div className="company-list-hp__page-loading-content">
            <Spin size="large" />
            <div className="company-list-hp__page-loading-text">
              Loading RFPs...
            </div>
          </div>
        </div>
      )}

      {rfpsData.map((item) => (
        <div className="job-block-five regular" key={item.id}>
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                {item.user.user_image ? (
                  <img
                    style={{ borderRadius: "10px" }}
                    src={formatImageUrl(item.user.user_image, "user")}
                    alt="company logo"
                  />
                ) : (
                  <HiBuildingOffice2
                    style={{
                      fontSize: "82px",
                      color: "#696969",
                      padding: "7px",
                      margin: "7px",
                    }}
                  />
                )}
              </span>
              <div>
                <h4 style={{ marginBottom: "5px" }}>
                  <Link to={`/rfps-details/${item.id}`}>
                    {getRequestTypeDisplay(item.request_type)}
                  </Link>
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#696969",
                    marginBottom: "5px",
                  }}
                >
                  {item.title}
                </p>
                <ul className="job-info">
                  <li>
                    Opening Date:{" "}
                    {new Date(item.created_at).toLocaleDateString()}
                  </li>
                  <li>
                    Closing date:{" "}
                    {new Date(item.close_date).toLocaleDateString()}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Component with CompanyListHp styling */}
      {total > pageSize && (
        <div className="company-list-hp__pagination">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper
            responsive={true}
            size="default"
          />
        </div>
      )}
    </>
  );
};

export default RfpFeatured7;
