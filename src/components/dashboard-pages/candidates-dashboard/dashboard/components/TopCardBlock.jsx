import { useGetAuthUserData } from "@/queries/user.query";
import { Tag, Progress, Card, Row, Col, Typography, Space } from "antd";
import { useGetAuthUserRfp } from "@/queries/website.query/rfps.query";
import { useAuthStore } from "@/auth/auth.store";
import {
  FileTextOutlined,
  UserOutlined,
  TrophyOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const TopCardBlock = () => {
  const { data: userData } = useGetAuthUserData();
  const { user } = useAuthStore();
  const { data: rfpsData } = useGetAuthUserRfp(1, 1000, null);
  const userRfps = (rfpsData?.data || [])?.filter(
    (rfp) => rfp.user_id === user?.id
  );

  // Profile completion logic (from ProfileCompletionCard)
  const userProfile = userData?.user || {};
  const fieldsToCheck = [
    userProfile.name,
    userProfile.email,
    userProfile.user_about,
    userProfile.user_image,
  ];
  const completedFields = fieldsToCheck.filter(
    (v) => v && v.trim() !== ""
  ).length;
  const profileCompletion = Math.round(
    (completedFields / fieldsToCheck.length) * 100
  );

  const cardData = [
    {
      id: 1,
      icon: <FileTextOutlined style={{ fontSize: 24, color: "#1890ff" }} />,
      countNumber: userRfps.length,
      metaName: "RFPs Shared",
      description: "Your shared opportunities",
      color: "#1890ff",
      bgColor: "#e6f7ff",
    },
    {
      id: 2,
      icon: <UserOutlined style={{ fontSize: 24, color: "#52c41a" }} />,
      countNumber: `${profileCompletion}%`,
      metaName: "Profile Complete",
      description: "Your profile completion",
      color: "#52c41a",
      bgColor: "#f6ffed",
      extra: (
        <Progress
          percent={profileCompletion}
          status={profileCompletion === 100 ? "success" : "active"}
          strokeColor="#52c41a"
          size="small"
          style={{ marginTop: 8 }}
        />
      ),
    },
    {
      id: 3,
      icon: <TrophyOutlined style={{ fontSize: 24, color: "#fa8c16" }} />,
      countNumber: "0",
      metaName: "Achievements",
      description: "Your earned badges",
      color: "#fa8c16",
      bgColor: "#fff7e6",
    },
    {
      id: 4,
      icon: <RiseOutlined style={{ fontSize: 24, color: "#722ed1" }} />,
      countNumber: "0",
      metaName: "Connections",
      description: "Your network growth",
      color: "#722ed1",
      bgColor: "#f9f0ff",
    },
  ];

  return (
    <Row gutter={[24, 24]}>
      {cardData.map((item) => (
        <Col xs={24} sm={12} lg={6} key={item.id}>
          <Card
            className="stat-card"
            style={{
              borderRadius: 16,
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            hoverable
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: item.bgColor,
                  marginBottom: 16,
                }}
              >
                {item.icon}
              </div>

              <Title level={2} style={{ margin: "8px 0", color: item.color }}>
                {item.countNumber}
              </Title>

              <Text
                strong
                style={{ fontSize: 16, display: "block", marginBottom: 4 }}
              >
                {item.metaName}
              </Text>

              <Text type="secondary" style={{ fontSize: 12 }}>
                {item.description}
              </Text>

              {item.extra && <div style={{ marginTop: 12 }}>{item.extra}</div>}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TopCardBlock;
