import LoginPopup from "@/components/common/form/login/LoginPopup";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import SocialTwo from "@/components/job-single-pages/social/SocialTwo";
import { useParams } from "react-router-dom";
import { formatImageUrl } from "@/utils/imageUtils";
import AdBlockDisplay from "@/components/common/AdBlockDisplay";
import MetaComponent from "@/components/common/MetaComponent";
import CompanyLocationMap from "@/components/common/CompanyLocationMap";
import Footer from "@/components/home-4/Footer";
import {
  Skeleton,
  Spin,
  Alert,
  Tag,
  Card,
  Avatar,
  Space,
  Typography,
  Divider,
} from "antd";
import { useGetCompanyBySlug } from "@/queries/website.query/company.query";
import SmartText from "@/components/common/SmartText";
import Advertisement from "@/components/advertisement/Advertisement";
import CompanyQRCode from "@/components/common/CompanyQRCode";
import { HiBuildingOffice2, HiMapPin, HiGlobeAlt } from "react-icons/hi2";
import { MdLocationOn, MdPhone, MdShare, MdBusiness } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import RelatedCompany from "@/components/employer-single-pages/related-company/RelatedCompany";

const { Title, Text, Paragraph } = Typography;

const metadata = {
  title: "Company Details - ABC.AF Directory Platform",
  description:
    "View detailed information about this company on ABC.AF, Afghanistan's trusted directory platform for business connections.",
};

const CompanySingleDynamicV1 = () => {
  let params = useParams();
  const slug = params.slug;

  // Use the dedicated hook to fetch company by slug
  const { data, isLoading, isError } = useGetCompanyBySlug(slug);
  const company = data?.data;

  // Show loading state
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

  // Show error state
  if (isError) {
    return (
      <div style={{ padding: "40px 20px" }}>
        <Alert
          message="Error loading company data"
          description="Unable to load the company information. Please try again later."
          type="error"
          showIcon
          style={{ maxWidth: "600px", margin: "0 auto" }}
        />
      </div>
    );
  }

  // Show not found state
  if (!company) {
    return (
      <div style={{ padding: "40px 20px" }}>
        <Alert
          message="Company not found"
          description="The requested company could not be found in our directory."
          type="warning"
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

      {/* <!-- Modern Company Detail Section --> */}
      <section
        className="company-detail-section"
        style={{
          background: "#f5f7fc",
          padding: "60px 0 40px",
          position: "relative",
        }}
      >
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-8 col-md-12 col-sm-12">
              {/* Main Company Card */}
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
                        company?.item_image
                          ? formatImageUrl(company?.item_image)
                          : null
                      }
                      icon={!company?.item_image && <HiBuildingOffice2 />}
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
                        {company?.category && (
                          <Tag
                            color="blue"
                            style={{
                              fontSize: "14px",
                              padding: "4px 12px",
                              borderRadius: "20px",
                            }}
                          >
                            {company.category.category_name}
                          </Tag>
                        )}
                        <Title
                          level={2}
                          style={{ margin: 0, color: "#1a1a1a" }}
                        >
                          {company?.item_title}
                        </Title>
                        {company?.item_status === 1 && (
                          <Tag
                            color="green"
                            style={{
                              fontSize: "14px",
                              padding: "4px 12px",
                              borderRadius: "20px",
                            }}
                          >
                            Active Company
                          </Tag>
                        )}
                      </Space>
                    </div>
                  </div>
                </div>

                {/* Complete Company Information Card */}
                <div style={{ marginBottom: "32px" }}>
                  <Title
                    level={4}
                    style={{ marginBottom: "16px", color: "#1a1a1a" }}
                  >
                    <MdBusiness style={{ marginRight: "8px" }} />
                    Company Information
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
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "16px",
                      }}
                    >
                      {/* Contact Information */}
                      {company?.item_phone && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "16px",
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
                              width: "40px",
                              height: "40px",
                              backgroundColor: "#f0f2f5",
                              borderRadius: "8px",
                            }}
                          >
                            <MdPhone
                              style={{ color: "#1890ff", fontSize: "18px" }}
                            />
                          </div>
                          <div>
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              Contact Information
                            </Text>
                            <div>
                              <a
                                href={`tel:${company.item_phone}`}
                                style={{
                                  color: "#1890ff",
                                  textDecoration: "none",
                                }}
                              >
                                <Text strong style={{ fontSize: "14px" }}>
                                  {company.item_phone}
                                </Text>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Address */}
                      {(company?.city?.city_name || company?.country?.name) && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "16px",
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
                              width: "40px",
                              height: "40px",
                              backgroundColor: "#f0f2f5",
                              borderRadius: "8px",
                            }}
                          >
                            <MdLocationOn
                              style={{ color: "#1890ff", fontSize: "18px" }}
                            />
                          </div>
                          <div>
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              Address
                            </Text>
                            <div>
                              <Text strong style={{ fontSize: "14px" }}>
                                {`${company?.city?.city_name || ""} ${
                                  company?.country?.name || ""
                                }`.trim() || "Not specified"}
                              </Text>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Member Since */}
                      {company?.created_at && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "16px",
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
                              width: "40px",
                              height: "40px",
                              backgroundColor: "#f0f2f5",
                              borderRadius: "8px",
                            }}
                          >
                            <FaRegCalendarAlt
                              style={{ color: "#1890ff", fontSize: "18px" }}
                            />
                          </div>
                          <div>
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              Member Since
                            </Text>
                            <div>
                              <Text strong style={{ fontSize: "14px" }}>
                                {formatDate(company.created_at)}
                              </Text>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Category */}
                      {company?.category && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "16px",
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
                              width: "40px",
                              height: "40px",
                              backgroundColor: "#f0f2f5",
                              borderRadius: "8px",
                            }}
                          >
                            <HiBuildingOffice2
                              style={{ color: "#1890ff", fontSize: "18px" }}
                            />
                          </div>
                          <div>
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              Category
                            </Text>
                            <div>
                              <Text strong style={{ fontSize: "14px" }}>
                                {company.category.category_name}
                              </Text>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Status */}
                      {company?.item_status !== undefined && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "16px",
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
                              width: "40px",
                              height: "40px",
                              backgroundColor: "#f0f2f5",
                              borderRadius: "8px",
                            }}
                          >
                            <HiBuildingOffice2
                              style={{ color: "#1890ff", fontSize: "18px" }}
                            />
                          </div>
                          <div>
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              Status
                            </Text>
                            <div>
                              <Tag
                                color={
                                  company.item_status === 1 ? "green" : "red"
                                }
                                style={{
                                  fontSize: "12px",
                                  padding: "2px 8px",
                                  borderRadius: "12px",
                                }}
                              >
                                {company.item_status === 1
                                  ? "Active"
                                  : "Inactive"}
                              </Tag>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Company URL */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "16px",
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
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#f0f2f5",
                            borderRadius: "8px",
                          }}
                        >
                          <HiGlobeAlt
                            style={{ color: "#1890ff", fontSize: "18px" }}
                          />
                        </div>
                        <div>
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            Company URL
                          </Text>
                          <div>
                            <a
                              href={window.location.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#1890ff",
                                textDecoration: "none",
                              }}
                            >
                              <Text strong style={{ fontSize: "14px" }}>
                                View Company Page
                              </Text>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div style={{ marginBottom: "32px" }}>
                  <Title
                    level={4}
                    style={{ marginBottom: "16px", color: "#1a1a1a" }}
                  >
                    <HiBuildingOffice2 style={{ marginRight: "8px" }} />
                    About {company?.item_title}
                  </Title>
                  <div
                    style={{
                      backgroundColor: "#fafafa",
                      padding: "24px",
                      borderRadius: "12px",
                      border: "1px solid #f0f0f0",
                    }}
                  >
                    <Paragraph
                      style={{ margin: 0, fontSize: "16px", lineHeight: "1.6" }}
                    >
                      <SmartText
                        text={
                          company?.item_description ||
                          "No description available."
                        }
                      />
                    </Paragraph>
                  </div>
                </div>
                {/* Company Location Map */}
                <div style={{ marginBottom: "32px" }}>
                  <Title
                    level={4}
                    style={{ marginBottom: "16px", color: "#1a1a1a" }}
                  >
                    <HiMapPin style={{ marginRight: "8px" }} />
                    Company Location
                  </Title>
                  <Card
                    style={{
                      borderRadius: "12px",
                      border: "1px solid #f0f0f0",
                      overflow: "hidden",
                    }}
                    bodyStyle={{ padding: "0" }}
                  >
                    <CompanyLocationMap
                      latitude={company?.item_lat}
                      longitude={company?.item_lng}
                      companyName={company?.item_title}
                      address={
                        `${company?.city?.city_name || ""} ${
                          company?.country?.name || ""
                        }`.trim() || "Location"
                      }
                    />
                  </Card>
                </div>

                {/* About Section - Moved to bottom */}

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
                    Share this company
                  </Title>
                  <div style={{ marginTop: "8px" }}>
                    <SocialTwo />
                  </div>
                </div>
              </Card>
              <RelatedCompany currentCompany={company} />

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
                {/* QR Code Widget */}
                <Card
                  title={
                    <span style={{ fontSize: "18px", fontWeight: "600" }}>
                      <MdShare style={{ marginRight: "8px" }} />
                      Quick Share
                    </span>
                  }
                  style={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    marginBottom: "24px",
                    border: "none",
                  }}
                  bodyStyle={{ padding: "20px" }}
                >
                  <div style={{ textAlign: "center" }}>
                    <CompanyQRCode
                      companyUrl={window.location.href}
                      companyName={company?.item_title}
                      companyLogo={company?.item_image}
                    />
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
      {/* <!-- End Modern Company Detail Section --> */}

      <Footer />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default CompanySingleDynamicV1;
