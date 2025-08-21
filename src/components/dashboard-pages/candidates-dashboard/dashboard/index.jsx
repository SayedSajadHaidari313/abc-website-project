import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import TopCardBlock from "./components/TopCardBlock";
import CopyrightFooter from "../../CopyrightFooter";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import Profile from "./components/Profile";
import CompanyQRCode from "../../../common/CompanyQRCode";
import { useGetAuthUserData } from "@/queries/user.query";
import { Card, Col, Row, Typography, Space, Divider, Button } from "antd";
import {
  UserOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Index = () => {
  const { data: userData } = useGetAuthUserData();

  // Get company data from user
  const userObj = userData?.user || userData?.items || {};
  const company = userObj?.items?.[0];
  const hasCompany = company && userObj?.items?.length > 0;

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>

      <LoginPopup />
      <DashboardCandidatesHeader />
      <MobileMenu />
      <DashboardCandidatesSidebar />

      {/* Modern Dashboard Section */}
      <section className="user-dashboard">
        <div className="">
          <BreadCrumb title="Dashboard" />
          <MenuToggler />

          {/* Welcome Section */}
          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            <Col xs={24} lg={24}>
              <Card
                className="welcome-card"
                style={{
                  background:
                    "linear-gradient(135deg, #00989a 0%, #007a7c 100%)",
                  color: "white",
                  borderRadius: 16,
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
                      Welcome back, {userObj?.name || "User"}! 👋
                    </Title>
                    <Text
                      style={{ color: "rgba(255,255,255,0.9)", fontSize: 16 }}
                    >
                      Ready to showcase your business? Let's explore your
                      directory opportunities.
                    </Text>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          {/* Profile Section */}
          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            <Profile />
          </Row>

          {/* Statistics Cards */}
          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            <Col xs={24}>
              <Title level={4} style={{ marginBottom: 16 }}>
                <BarChartOutlined
                  style={{ marginRight: 8, color: "#1890ff" }}
                />
                Your Statistics
              </Title>
              <TopCardBlock />
            </Col>
          </Row>
          {/* Company QR Code Section - Only show if user has a company */}
          {hasCompany && (
            <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
              <Col xs={24}>
                <Card
                  title={
                    <Space>
                      <StarOutlined style={{ color: "#1890ff" }} />
                      <span>Company QR Code</span>
                    </Space>
                  }
                  className="qr-code-card"
                  style={{ borderRadius: 16 }}
                >
                  <div className="qr-code-content">
                    <Row gutter={[24, 24]} align="middle">
                      <Col xs={24} md={12}>
                        <div className="quick-share-info">
                          <Title level={5}>
                            <CheckCircleOutlined
                              style={{ color: "#52c41a", marginRight: 8 }}
                            />
                            Quick Share
                          </Title>
                          <Text type="secondary">
                            Anyone can scan this QR code to visit your company
                            page instantly!
                          </Text>
                          <Divider />
                          <Text strong>Perfect for:</Text>
                          <ul style={{ marginTop: 8 }}>
                            <li>Business cards</li>
                            <li>Presentations</li>
                            <li>Networking events</li>
                            <li>Digital sharing</li>
                          </ul>
                        </div>
                      </Col>
                      <Col xs={24} md={12}>
                        <div style={{ textAlign: "center" }}>
                          <CompanyQRCode
                            companyUrl={`${window.location.origin}/company/${company?.item_slug}`}
                            companyName={company?.item_title || "My Company"}
                            companyLogo={company?.item_image}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
          )}

          {/* Recent Activity Section */}
        </div>
      </section>

      <CopyrightFooter />
    </div>
  );
};

export default Index;
