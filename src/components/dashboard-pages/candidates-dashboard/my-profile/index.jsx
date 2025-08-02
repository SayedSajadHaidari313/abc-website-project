import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import MyProfile from "./components/my-profile";
import CopyrightFooter from "../../CopyrightFooter";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import { Card, Row, Col, Typography, Space } from "antd";
import { UserOutlined, EditOutlined, SettingOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>

      <LoginPopup />
      <DashboardCandidatesHeader />
      <MobileMenu />
      <DashboardCandidatesSidebar />

      {/* Modern Profile Section */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="My Profile" />
          <MenuToggler />

          {/* Profile Header */}
          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            <Col xs={24}>
              <Card
                className="profile-header-card"
                style={{
                  background:
                    "linear-gradient(135deg, #00989a 0%, #007a7c 100%)",
                  color: "white",
                  borderRadius: 16,
                  border: "none",
                }}
              >
                <Row align="middle" gutter={24}>
                  <Col xs={24} sm={8}>
                    <div style={{ textAlign: "center" }}>
                      <UserOutlined style={{ fontSize: 48, color: "white" }} />
                    </div>
                  </Col>
                  <Col xs={24} sm={16}>
                    <Title level={3} style={{ color: "white", margin: 0 }}>
                      My Profile
                    </Title>
                    <Text
                      style={{ color: "rgba(255,255,255,0.9)", fontSize: 16 }}
                    >
                      Manage your personal information and professional details
                    </Text>
                    <Space style={{ marginTop: 16 }}>
                      <EditOutlined style={{ color: "white" }} />
                      <Text style={{ color: "white" }}>Edit Profile</Text>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          {/* Profile Content */}
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <Card
                title={
                  <Space>
                    <SettingOutlined style={{ color: "#1890ff" }} />
                    <span>Profile Settings</span>
                  </Space>
                }
                className="profile-settings-card"
                style={{
                  borderRadius: 16,
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <MyProfile />
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      <CopyrightFooter />
    </div>
  );
};

export default index;
