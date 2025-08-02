import React from "react";
import {
  Button,
  Card,
  Progress,
  Tag,
  Typography,
  Row,
  Col,
  Space,
  Alert,
} from "antd";
import { useGetAuthUserData } from "@/queries/user.query";
import {
  UserOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const ProfileCompletionCard = () => {
  const { data: userData, isLoading, error } = useGetAuthUserData();
  const user = userData?.user || {};

  // Show loading state
  if (isLoading) {
    return (
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        className="profile-completion-card"
      >
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div className="route-loading-spinner">
            <div className="route-loading-spinner__spinner" />
          </div>
          <Text type="secondary" style={{ marginTop: 16, display: "block" }}>
            Loading your profile data...
          </Text>
        </div>
      </Card>
    );
  }

  // Show error state
  if (error) {
    return (
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        className="profile-completion-card"
      >
        <Alert
          message="Error Loading Profile"
          description="There was an error loading your profile data. Please try refreshing the page."
          type="error"
          showIcon
          style={{ borderRadius: 8 }}
        />
      </Card>
    );
  }

  // Define fields to check with labels and their values
  const fieldsToCheck = [
    { label: "Full Name", value: user.name, icon: <UserOutlined /> },
    { label: "Bio", value: user.user_about, icon: <UserOutlined /> },
    { label: "Email", value: user.email, icon: <UserOutlined /> },
    { label: "Profile Photo", value: user.user_image, icon: <UserOutlined /> },
  ];

  // Add company fields if user has company data
  if (user.items && user.items.length > 0) {
    const company = user.items[0];
    fieldsToCheck.push(
      {
        label: "Company Name",
        value: company.item_title,
        icon: <UserOutlined />,
      },
      {
        label: "Company Description",
        value: company.item_description,
        icon: <UserOutlined />,
      },
      {
        label: "Company Phone",
        value: company.item_phone,
        icon: <UserOutlined />,
      },
      {
        label: "Company Address",
        value: company.item_address,
        icon: <UserOutlined />,
      },
      {
        label: "Company Logo",
        value: company.item_image,
        icon: <UserOutlined />,
      }
    );
  }

  // Calculate completion percentage and collect missing fields
  const calculateCompletion = () => {
    let completedFields = 0;
    const missingFields = [];
    const completedFieldsList = [];

    fieldsToCheck.forEach(({ label, value, icon }) => {
      if (value && value.trim() !== "") {
        completedFields++;
        completedFieldsList.push({ label, icon });
      } else {
        missingFields.push({ label, icon });
      }
    });

    const completionPercent = Math.round(
      (completedFields / fieldsToCheck.length) * 100
    );

    return { completionPercent, missingFields, completedFieldsList };
  };

  const { completionPercent, missingFields, completedFieldsList } =
    calculateCompletion();

  // Determine status and color
  const getStatusInfo = () => {
    if (completionPercent === 100) {
      return {
        status: "success",
        color: "#52c41a",
        bgColor: "#f6ffed",
        icon: <TrophyOutlined style={{ color: "#52c41a" }} />,
        message: "Excellent! Your profile is complete! 🎉",
      };
    } else if (completionPercent >= 75) {
      return {
        status: "active",
        color: "#1890ff",
        bgColor: "#e6f7ff",
        icon: <CheckCircleOutlined style={{ color: "#1890ff" }} />,
        message: "Great progress! Almost there! 💪",
      };
    } else if (completionPercent >= 50) {
      return {
        status: "active",
        color: "#fa8c16",
        bgColor: "#fff7e6",
        icon: <ExclamationCircleOutlined style={{ color: "#fa8c16" }} />,
        message: "Good start! Keep going! 📈",
      };
    } else {
      return {
        status: "exception",
        color: "#ff4d4f",
        bgColor: "#fff2f0",
        icon: <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />,
        message: "Let's get started! Complete your profile to stand out! 🚀",
      };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Card
      style={{
        marginBottom: 24,
        borderRadius: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        border: "none",
      }}
      className="profile-completion-card"
    >
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={8}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: statusInfo.bgColor,
                marginBottom: 16,
              }}
            >
              {statusInfo.icon}
            </div>
            <Title
              level={3}
              style={{ margin: "8px 0", color: statusInfo.color }}
            >
              {completionPercent}%
            </Title>
            <Text type="secondary">Profile Complete</Text>
          </div>
        </Col>

        <Col xs={24} md={16}>
          <div>
            <Title level={4} style={{ marginBottom: 8 }}>
              {statusInfo.message}
            </Title>

            <Progress
              percent={completionPercent}
              status={statusInfo.status}
              strokeColor={statusInfo.color}
              style={{ marginBottom: 16 }}
            />

                          <Text type="secondary" style={{ fontSize: 14 }}>
                Complete your profile to get better directory listings and increase
                your visibility to potential clients and partners.
              </Text>

            {missingFields?.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <Text strong style={{ display: "block", marginBottom: 8 }}>
                  Missing or incomplete fields:
                </Text>
                <Space wrap>
                  {missingFields.map((field) => (
                    <Tag
                      color="red"
                      key={field.label}
                      style={{
                        marginBottom: 8,
                        borderRadius: 6,
                        padding: "4px 8px",
                      }}
                    >
                      {field.icon} {field.label}
                    </Tag>
                  ))}
                </Space>
              </div>
            )}

            {completedFieldsList?.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <Text
                  strong
                  style={{
                    display: "block",
                    marginBottom: 8,
                    color: "#52c41a",
                  }}
                >
                  Completed fields:
                </Text>
                <Space wrap>
                  {completedFieldsList.map((field) => (
                    <Tag
                      color="green"
                      key={field.label}
                      style={{
                        marginBottom: 8,
                        borderRadius: 6,
                        padding: "4px 8px",
                      }}
                    >
                      {field.icon} {field.label}
                    </Tag>
                  ))}
                </Space>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProfileCompletionCard;
