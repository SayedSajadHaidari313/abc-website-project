import {
  Card,
  Typography,
  Tooltip,
  message,
  Button,
  QRCode,
  Space,
} from "antd";
import {
  CopyOutlined,
  QrcodeOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  MobileOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { formatImageUrl, getFallbackImage } from "@/utils/imageUtils";

const { Title, Text, Paragraph } = Typography;

const CompanyQRCode = ({ companyUrl, companyName, companyLogo }) => {
  const [copied, setCopied] = useState(false);
  const qrRef = useRef(null);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(companyUrl);
      setCopied(true);
      message.success("Company URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      message.error("Failed to copy URL");
    }
  };

  const handleDownloadQR = () => {
    try {
      const canvas = qrRef.current?.querySelector("canvas");
      if (canvas) {
        const link = document.createElement("a");
        link.download = `${companyName || "company"}-qr-code.png`;
        link.href = canvas.toDataURL();
        link.click();
        message.success("QR Code downloaded successfully!");
      }
    } catch (err) {
      message.error("Failed to download QR code");
    }
  };

  // Get company logo URL
  const getCompanyLogoUrl = () => {
    if (companyLogo) {
      try {
        return formatImageUrl(companyLogo);
      } catch (error) {
        console.warn("Failed to format company logo URL:", error);
        return getFallbackImage("item");
      }
    }
    return getFallbackImage("item");
  };

  return (
    <Card
      className="company-qr-card"
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "1px solid #f0f0f0",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* Header with Icon and Title */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "8px" }}>
            <QrcodeOutlined
              style={{ fontSize: "28px", color: "#1890ff", marginRight: "8px" }}
            />
            <Title
              level={4}
              style={{ margin: 0, display: "inline", color: "#1890ff" }}
            >
              Quick Share QR Code
            </Title>
          </div>
          <Text type="secondary" style={{ fontSize: "13px" }}>
            Share this company instantly with anyone
          </Text>
        </div>

        {/* Benefits Section */}
        <div
          style={{
            marginBottom: "20px",
            padding: "12px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            textAlign: "left",
          }}
        >
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <MobileOutlined style={{ color: "#52c41a", fontSize: "16px" }} />
              <Text style={{ fontSize: "12px" }}>
                <strong>Scan with phone</strong> - Instantly open this company
                page
              </Text>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShareAltOutlined
                style={{ color: "#1890ff", fontSize: "16px" }}
              />
              <Text style={{ fontSize: "12px" }}>
                <strong>Easy sharing</strong> - No need to type long URLs
              </Text>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <LinkOutlined style={{ color: "#722ed1", fontSize: "16px" }} />
              <Text style={{ fontSize: "12px" }}>
                <strong>Direct access</strong> - Share company details instantly
              </Text>
            </div>
          </Space>
        </div>

        {/* QR Code Display */}
        <div
          ref={qrRef}
          className="qr-code-container"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "2px solid #f0f0f0",
          }}
        >
          <QRCode
            value={companyUrl}
            size={140}
            color="#000000"
            bgColor="#ffffff"
            icon={getCompanyLogoUrl()}
            iconSize={35}
            style={{ borderRadius: "8px" }}
          />
        </div>

        {/* Company Name */}
        <div style={{ marginBottom: "20px" }}>
          <Text strong style={{ fontSize: "14px", color: "#262626" }}>
            {companyName}
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Scan to visit this company page
          </Text>
        </div>

        {/* Action Buttons */}
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Tooltip title={copied ? "Copied!" : "Copy company URL"}>
            <Button
              type="primary"
              icon={<CopyOutlined />}
              onClick={handleCopyUrl}
              size="middle"
              style={{
                borderRadius: "8px",
                height: "40px",
                width: "100%",
              }}
            >
              Copy Company URL
            </Button>
          </Tooltip>

          <Tooltip title="Download QR Code for offline sharing">
            <Button
              type="default"
              icon={<DownloadOutlined />}
              onClick={handleDownloadQR}
              size="middle"
              style={{
                borderRadius: "8px",
                height: "40px",
                width: "100%",
                borderColor: "#52c41a",
                color: "#52c41a",
              }}
            >
              Download QR Code
            </Button>
          </Tooltip>
        </Space>

        {/* Usage Instructions */}
        <div
          style={{
            marginTop: "16px",
            padding: "12px",
            backgroundColor: "#e6f7ff",
            borderRadius: "8px",
            border: "1px solid #91d5ff",
          }}
        >
          <Text style={{ fontSize: "11px", color: "#1890ff" }}>
            <strong>How to use:</strong> Point your phone camera at this QR code
            to instantly open this company page on your mobile device.
          </Text>
        </div>
      </div>
    </Card>
  );
};

CompanyQRCode.propTypes = {
  companyUrl: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  companyLogo: PropTypes.string,
};

export default CompanyQRCode;
