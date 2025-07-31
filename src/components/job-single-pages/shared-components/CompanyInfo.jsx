import { useGetAllItemsData } from "@/queries/website.query/items.query";
import { Alert, Skeleton, Card, Typography, Divider, Tag, Space } from "antd";
import {
  CopyOutlined,
  UserOutlined,
  MailOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useState } from "react";
import { message } from "antd";

const { Title, Text, Paragraph } = Typography;

const CompanyInfo = ({ currentCompanyId }) => {
  const { data: companyData, isLoading, isError } = useGetAllItemsData();
  const [copied, setCopied] = useState(false);

  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />;

  if (isError)
    return (
      <Alert
        message="Error fetching data"
        description="Please try again later."
        type="error"
        showIcon
      />
    );

  const companyinfo = companyData?.data?.filter(
    (val) => val?.id === currentCompanyId
  );

  const company = companyinfo[0];

  if (!company) {
    return (
      <Alert
        message="Company information not found"
        description="The requested company data is not available."
        type="warning"
        showIcon
      />
    );
  }

  const handleCopyUrl = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      message.success("Company URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      message.error("Failed to copy URL");
    }
  };

  const formatUserName = (name) => {
    if (!name) return "Not provided";
    return name
      .toLowerCase()
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Card
      className="company-info-card"
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "1px solid #f0f0f0",
      }}
    >
      <div style={{ padding: "16px 0" }}>
        {/* Header Section */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <InfoCircleOutlined
            style={{ fontSize: "24px", color: "#1890ff", marginBottom: "8px" }}
          />
          <Title level={4} style={{ margin: "8px 0", color: "#1890ff" }}>
            Company Details
          </Title>
          <Text type="secondary" style={{ fontSize: "13px" }}>
            Complete information about this company
          </Text>
        </div>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Contact Information Section */}
          <div>
            <Title level={5} style={{ marginBottom: "12px", color: "#262626" }}>
              <UserOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
              Contact Information
            </Title>

            <div
              style={{
                padding: "12px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <UserOutlined
                  style={{ color: "#1890ff", marginRight: "8px" }}
                />
                <Text strong style={{ fontSize: "13px" }}>
                  Contact Person:
                </Text>
              </div>
              <Text
                style={{ marginLeft: "24px", color: "#666", fontSize: "13px" }}
              >
                {formatUserName(company?.user?.name)}
              </Text>
            </div>

            <div
              style={{
                padding: "12px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <MailOutlined
                  style={{ color: "#1890ff", marginRight: "8px" }}
                />
                <Text strong style={{ fontSize: "13px" }}>
                  Email Address:
                </Text>
              </div>
              <Text
                style={{ marginLeft: "24px", color: "#666", fontSize: "13px" }}
              >
                {company?.user?.email || "Not provided"}
              </Text>
            </div>

            <div
              style={{
                padding: "12px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <PhoneOutlined
                  style={{ color: "#1890ff", marginRight: "8px" }}
                />
                <Text strong style={{ fontSize: "13px" }}>
                  Phone Number:
                </Text>
              </div>
              <Text
                style={{ marginLeft: "24px", color: "#666", fontSize: "13px" }}
              >
                {company?.item_phone || "Not provided"}
              </Text>
            </div>
          </div>

          <Divider style={{ margin: "16px 0" }} />

          {/* Location Information */}
          <div>
            <Title level={5} style={{ marginBottom: "12px", color: "#262626" }}>
              <EnvironmentOutlined
                style={{ marginRight: "8px", color: "#1890ff" }}
              />
              Location Details
            </Title>

            <div
              style={{
                padding: "12px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <GlobalOutlined
                  style={{ color: "#1890ff", marginRight: "8px" }}
                />
                <Text strong style={{ fontSize: "13px" }}>
                  Address:
                </Text>
              </div>
              <Text
                style={{ marginLeft: "24px", color: "#666", fontSize: "13px" }}
              >
                {company?.item_address || "Not specified"}
              </Text>
            </div>
          </div>

          {/* User About Section */}
          {company?.user?.user_about && (
            <>
              <Divider style={{ margin: "16px 0" }} />
              <div>
                <Title
                  level={5}
                  style={{ marginBottom: "12px", color: "#262626" }}
                >
                  <InfoCircleOutlined
                    style={{ marginRight: "8px", color: "#1890ff" }}
                  />
                  About Contact Person
                </Title>
                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                  }}
                >
                  <Paragraph
                    style={{
                      color: "#666",
                      fontSize: "13px",
                      lineHeight: "1.6",
                      margin: 0,
                    }}
                  >
                    {company?.user?.user_about}
                  </Paragraph>
                </div>
              </div>
            </>
          )}

          <Divider style={{ margin: "16px 0" }} />

          {/* Share Section */}
          <div>
            <Title level={5} style={{ marginBottom: "12px", color: "#52c41a" }}>
              <CopyOutlined style={{ marginRight: "8px", color: "#52c41a" }} />
              Share This Company
            </Title>
            <div
              style={{
                padding: "12px",
                backgroundColor: "#f6ffed",
                borderRadius: "8px",
                border: "1px solid #b7eb8f",
              }}
            >
              <Text
                style={{
                  fontSize: "12px",
                  color: "#52c41a",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                <strong>Share Benefits:</strong>
              </Text>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "16px",
                  fontSize: "11px",
                  color: "#52c41a",
                }}
              >
                <li>Share with colleagues and partners</li>
                <li>Easy access to company information</li>
                <li>Direct link to company details</li>
              </ul>
            </div>
            <div
              onClick={handleCopyUrl}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                backgroundColor: "#f6ffed",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "1px solid #b7eb8f",
                marginTop: "8px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#d9f7be";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f6ffed";
              }}
            >
              <div style={{ flex: 1 }}>
                <Text style={{ fontSize: "12px", color: "#52c41a" }}>
                  Copy company URL
                </Text>
              </div>
              <CopyOutlined style={{ color: "#52c41a" }} />
            </div>
          </div>
        </Space>
      </div>
    </Card>
  );
};

CompanyInfo.propTypes = {
  currentCompanyId: PropTypes.number.isRequired,
};

export default CompanyInfo;
