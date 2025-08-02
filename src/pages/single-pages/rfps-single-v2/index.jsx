import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import Contact from "@/components/job-single-pages/shared-components/Contact";
import { useParams } from "react-router-dom";
import { useGetRfpById } from "@/queries/website.query/rfps.query";
import { formatImageUrl } from "@/utils/imageUtils";
import {
  HiBuildingOffice2,
  HiCalendar,
  HiClock,
  HiDocumentText,
  HiUser,
  HiDocument,
  HiPaperClip,
} from "react-icons/hi2";
import {
  Spin,
  Alert,
  Tag,
  Divider,
  Card,
  Avatar,
  Button,
  Space,
  Typography,
} from "antd";
import {
  MdDownloadForOffline,
  MdShare,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdFileDownload,
  MdDescription,
} from "react-icons/md";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

import MetaComponent from "@/components/common/MetaComponent";
import Advertisement from "@/components/advertisement/Advertisement";
import { useAuthStore } from "@/auth/auth.store";
import AdBlockDisplay from "@/components/common/AdBlockDisplay";

const { Title, Text, Paragraph } = Typography;

const metadata = {
  title: "RFP Details - View Request for Proposals | ABC.AF Directory Platform",
  description:
    "Explore detailed information about this Request for Proposal (RFP) on ABC.AF, Afghanistan's trusted directory platform for business opportunities and professional connections.",
};

const getRequestTypeDisplay = (type) => {
  const types = {
    RFP: "Request for Proposal",
    RFQ: "Request for Quote",
    ITB: "Invitation to Bidding",
  };
  const name = types[type] || type;
  return `${name} (${type})`;
};

const getRequestTypeColor = (type) => {
  const colors = {
    RFP: "blue",
    RFQ: "green",
    ITB: "orange",
  };
  return colors[type] || "default";
};

const getFileExtension = (filename) => {
  if (!filename) return "";
  return filename.split(".").pop().toUpperCase();
};

const getFileIcon = (filename) => {
  const ext = getFileExtension(filename).toLowerCase();
  const iconMap = {
    pdf: <HiDocument style={{ color: "#ff4d4f" }} />,
    doc: <HiDocument style={{ color: "#1890ff" }} />,
    docx: <HiDocument style={{ color: "#1890ff" }} />,
    xls: <HiDocument style={{ color: "#52c41a" }} />,
    xlsx: <HiDocument style={{ color: "#52c41a" }} />,
    ppt: <HiDocument style={{ color: "#fa8c16" }} />,
    pptx: <HiDocument style={{ color: "#fa8c16" }} />,
    txt: <HiDocument style={{ color: "#666" }} />,
    zip: <HiDocument style={{ color: "#722ed1" }} />,
    rar: <HiDocument style={{ color: "#722ed1" }} />,
  };
  return iconMap[ext] || <HiDocument style={{ color: "#666" }} />;
};

const formatFileSize = (bytes) => {
  if (!bytes) return "Unknown size";
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
};

const RfpSingleDynamicV2 = () => {
  let params = useParams();
  const id = params.id;
  const { data, isLoading, isError } = useGetRfpById(id);
  const rfp = data?.data;
  const { isLoggedIn } = useAuthStore();

  if (isLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !rfp) {
    return (
      <div style={{ padding: "40px 20px" }}>
        <Alert
          message="Error fetching RFP details"
          description="Unable to load the RFP information. Please try again later."
          type="error"
          showIcon
          style={{ maxWidth: "600px", margin: "0 auto" }}
        />
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isExpired = new Date(rfp.close_date) < new Date();

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Modern RFP Detail Section --> */}
      <section
        className="rfp-detail-section"
        style={{
          background: "#f5f7fc",
          padding: "60px 0 40px",
          position: "relative",
        }}
      >
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-8 col-md-12 col-sm-12">
              {/* Main RFP Card */}
              <Card
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  border: "none",
                  overflow: "hidden",
                }}
                bodyStyle={{ padding: "40px" }}
              >
                {/* Header Section */}
                <div style={{ marginBottom: "32px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "20px",
                      marginBottom: "24px",
                    }}
                  >
                    <Avatar
                      size={80}
                      src={
                        rfp.user?.user_image
                          ? formatImageUrl(rfp.user.user_image, "user")
                          : null
                      }
                      icon={!rfp.user?.user_image && <HiBuildingOffice2 />}
                      style={{
                        backgroundColor: "#f0f2f5",
                        color: "#666",
                        fontSize: "32px",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <Tag
                          color={getRequestTypeColor(rfp.request_type)}
                          style={{
                            fontSize: "14px",
                            padding: "4px 12px",
                            borderRadius: "20px",
                          }}
                        >
                          {getRequestTypeDisplay(rfp.request_type)}
                        </Tag>
                        <Title
                          level={2}
                          style={{ margin: 0, color: "#1a1a1a" }}
                        >
                          {rfp.title}
                        </Title>
                        {rfp.user?.company_name && (
                          <Text
                            strong
                            style={{ fontSize: "16px", color: "#666" }}
                          >
                            {rfp.user.company_name}
                          </Text>
                        )}
                      </Space>
                    </div>
                  </div>

                  {/* Status and Dates */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "16px",
                      padding: "20px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FaRegCalendarAlt style={{ color: "#1890ff" }} />
                      <Text strong>Opening:</Text>
                      <Text>{formatDate(rfp.created_at)}</Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FaRegClock
                        style={{ color: isExpired ? "#ff4d4f" : "#52c41a" }}
                      />
                      <Text strong>Closing:</Text>
                      <Text type={isExpired ? "danger" : "success"}>
                        {formatDate(rfp.close_date)}
                      </Text>
                    </div>
                    {isExpired && (
                      <Tag color="red" style={{ marginLeft: "auto" }}>
                        EXPIRED
                      </Tag>
                    )}
                  </div>
                </div>

                {/* Description Section */}
                <div style={{ marginBottom: "32px" }}>
                  <Title
                    level={4}
                    style={{ marginBottom: "16px", color: "#1a1a1a" }}
                  >
                    <HiDocumentText style={{ marginRight: "8px" }} />
                    RFP Description
                  </Title>
                  <div
                    style={{
                      backgroundColor: "#fafafa",
                      padding: "24px",
                      borderRadius: "12px",
                      border: "1px solid #f0f0f0",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: rfp.description || "No description available.",
                    }}
                  />
                </div>

                {/* Download Section */}
                {rfp.file && (
                  <div style={{ marginBottom: "32px" }}>
                    <Title
                      level={4}
                      style={{ marginBottom: "16px", color: "#1a1a1a" }}
                    >
                      <MdDescription style={{ marginRight: "8px" }} />
                      RFP Attachments
                    </Title>

                    <Card
                      style={{
                        borderRadius: "12px",
                        border: "1px solid #f0f0f0",
                        backgroundColor: "#fafafa",
                      }}
                      bodyStyle={{ padding: "24px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          padding: "20px",
                          backgroundColor: "#ffffff",
                          borderRadius: "8px",
                          border: "1px solid #e8e8e8",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "60px",
                            height: "60px",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "8px",
                            fontSize: "24px",
                          }}
                        >
                          {getFileIcon(rfp.file)}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ marginBottom: "8px" }}>
                            <Text strong style={{ fontSize: "16px" }}>
                              RFP Document
                            </Text>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "16px",
                              alignItems: "center",
                            }}
                          >
                            <Tag color="blue" style={{ fontSize: "12px" }}>
                              {getFileExtension(rfp.file)}
                            </Tag>
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              {formatFileSize(rfp.file_size || 0)}
                            </Text>
                          </div>
                        </div>

                        {isLoggedIn ? (
                          <Button
                            type="primary"
                            size="large"
                            icon={<MdFileDownload />}
                            href={formatImageUrl(rfp.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              height: "48px",
                              borderRadius: "8px",
                              fontSize: "14px",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            Download
                          </Button>
                        ) : (
                          <Alert
                            message="Login Required"
                            description="Please log in to download the RFP document."
                            type="info"
                            showIcon
                            style={{
                              borderRadius: "8px",
                              maxWidth: "200px",
                              fontSize: "12px",
                            }}
                          />
                        )}
                      </div>

                      <div
                        style={{
                          marginTop: "16px",
                          padding: "16px",
                          backgroundColor: "#f8f9fa",
                          borderRadius: "8px",
                          border: "1px solid #e8e8e8",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "8px",
                          }}
                        >
                          <HiPaperClip style={{ color: "#1890ff" }} />
                          <Text strong style={{ fontSize: "14px" }}>
                            File Information
                          </Text>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "16px",
                          }}
                        >
                          <div>
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              File Type:
                            </Text>
                            <div>
                              <Text strong style={{ fontSize: "12px" }}>
                                {getFileExtension(rfp.file)} Document
                              </Text>
                            </div>
                          </div>
                          <div>
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              Upload Date:
                            </Text>
                            <div>
                              <Text strong style={{ fontSize: "12px" }}>
                                {formatDate(rfp.created_at)}
                              </Text>
                            </div>
                          </div>
                          {rfp.file_size && (
                            <div>
                              <Text
                                type="secondary"
                                style={{ fontSize: "12px" }}
                              >
                                File Size:
                              </Text>
                              <div>
                                <Text strong style={{ fontSize: "12px" }}>
                                  {formatFileSize(rfp.file_size)}
                                </Text>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {/* Share Section */}
                <div
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "24px",
                    borderRadius: "12px",
                    border: "1px solid #e8e8e8",
                  }}
                >
                  <Title
                    level={5}
                    style={{ marginBottom: "20px", color: "#1a1a1a" }}
                  >
                    <MdShare style={{ marginRight: "8px" }} />
                    Share this RFP
                  </Title>
                  <div style={{ marginTop: "8px" }}>
                    <SocialTwo />
                  </div>
                </div>
              </Card>

              {/* Advertisement Section */}
              <div
                style={{
                  margin: "32px 0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <AdBlockDisplay position="after_company_listing" />
              </div>
            </div>
            {/* End .content-column */}

            <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
              <div style={{ position: "sticky", top: "20px" }}>
                {/* Contact Widget */}
                <Card
                  title={
                    <span style={{ fontSize: "18px", fontWeight: "600" }}>
                      <MdEmail style={{ marginRight: "8px" }} />
                      Contact Information
                    </span>
                  }
                  style={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    marginBottom: "24px",
                    border: "none",
                  }}
                >
                  {rfp.user && (
                    <div style={{ marginBottom: "24px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "16px",
                        }}
                      >
                        <Avatar
                          size={48}
                          src={
                            rfp.user.user_image
                              ? formatImageUrl(rfp.user.user_image, "user")
                              : null
                          }
                          icon={!rfp.user.user_image && <HiUser />}
                        />
                        <div>
                          <Text strong style={{ fontSize: "16px" }}>
                            {rfp.user.name || "Contact Person"}
                          </Text>
                          {rfp.user.company_name && (
                            <div>
                              <Text type="secondary">
                                {rfp.user.company_name}
                              </Text>
                            </div>
                          )}
                        </div>
                      </div>

                      {rfp.user.email && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "8px",
                          }}
                        >
                          <MdEmail style={{ color: "#1890ff" }} />
                          <a
                            href={`mailto:${rfp.user.email}`}
                            style={{ color: "#1890ff" }}
                          >
                            {rfp.user.email}
                          </a>
                        </div>
                      )}

                      {rfp.user.phone && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "8px",
                          }}
                        >
                          <MdPhone style={{ color: "#1890ff" }} />
                          <a
                            href={`tel:${rfp.user.phone}`}
                            style={{ color: "#1890ff" }}
                          >
                            {rfp.user.phone}
                          </a>
                        </div>
                      )}

                      {rfp.user.address && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <MdLocationOn style={{ color: "#1890ff" }} />
                          <Text type="secondary">{rfp.user.address}</Text>
                        </div>
                      )}
                    </div>
                  )}

                  <Divider style={{ margin: "16px 0" }} />

                  <div>
                    <Title level={5} style={{ marginBottom: "16px" }}>
                      Send Message
                    </Title>
                    <Contact />
                  </div>
                </Card>

                {/* Advertisement */}
                <Card
                  style={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    marginBottom: "24px",
                    border: "none",
                  }}
                  bodyStyle={{ padding: "20px" }}
                >
                  <Advertisement />
                </Card>

                {/* Google AdSense */}
                <div style={{ marginBottom: "24px" }}>
                  <AdBlockDisplay position="left_side" />
                </div>
              </div>
            </div>
            {/* End .sidebar-column */}
          </div>
        </div>
      </section>
      {/* <!-- End Modern RFP Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default RfpSingleDynamicV2;
