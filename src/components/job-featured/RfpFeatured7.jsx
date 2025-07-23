import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useGetRfpsData } from "@/queries/website.query/rfps.query";
import { formatImageUrl } from "@/utils/imageUtils";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { Pagination, Spin, Alert } from "antd";

import { MdDownloadForOffline } from "react-icons/md";

const getRequestTypeDisplay = (type) => {
  const types = {
    RFP: "Request for Proposal" ,
    RFQ: "Request for Quote",
    ITB: "Invitation to Bidding",
  };
  const name = types[type] || type;
  return `${name} (${type})`;
};

const RfpFeatured7 = () => {
  // Get search keyword from Redux filter state
  const keyword = useSelector((state) => state.employerFilter.keyword);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const { data, isLoading, isError } = useGetRfpsData(
    pagination.current,
    pagination.pageSize,
    keyword
  );
  const rfpsData = data?.data || [];
  const total = data?.total || 0;

  if (isLoading) {
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
            {item.file && (
              <a
                href={formatImageUrl(item.file)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <a className="theme-btn btn-style-three">
                  <MdDownloadForOffline style={{ fontSize: "20px" }} />
                </a>
              </a>
            )}
          </div>
        </div>
      ))}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={total}
          onChange={(page, pageSize) =>
            setPagination({ current: page, pageSize })
          }
          showSizeChanger
        />
      </div>
    </>
  );
};

export default RfpFeatured7;
