import MobileMenu from "../../../header/MobileMenu";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import VisitCardPreview from "./VisitCardPreview";
import "./visit-card.scss";
import { Card, Typography, Space, Tag, Button } from "antd";
import { IdcardOutlined, QrcodeOutlined } from "@ant-design/icons";

const VisitCardPage = () => {
  // Get real company data from user d
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>

      <LoginPopup />
      <DashboardCandidatesHeader />
      <MobileMenu />
      <DashboardCandidatesSidebar />

      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Your Visit Card" />
          <MenuToggler />

          <div className="container" style={{ marginBottom: 16 }}>
            <Card
              bordered={false}
              style={{
                background:
                  "linear-gradient(135deg, rgba(14,165,233,1) 0%, rgba(59,130,246,1) 50%, rgba(99,102,241,1) 100%)",
                color: "#fff",
                borderRadius: 12,
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              }}
              bodyStyle={{ padding: 20 }}
            >
              <Space align="start" size={16} style={{ width: "100%" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <IdcardOutlined style={{ fontSize: 24, color: "#fff" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Space
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Space size={8} wrap>
                      <Typography.Title
                        level={4}
                        style={{ margin: 0, color: "#fff" }}
                      >
                        Digital Visit Card
                      </Typography.Title>
                      <Tag color="gold" style={{ borderRadius: 6 }}>
                        New
                      </Tag>
                    </Space>
                  </Space>
                  <Typography.Paragraph
                    style={{ color: "#f8fafc", margin: "6px 0 12px" }}
                  >
                    Generate a branded card with your logo and QR code. Download
                    high-quality PNGs for sharing or printing.
                  </Typography.Paragraph>
                  <Space wrap>
                    <Button
                      type="primary"
                      icon={<IdcardOutlined />}
                      href="#visit-card-preview"
                      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.18)" }}
                    >
                      View Preview
                    </Button>
                    <Button
                      icon={<QrcodeOutlined />}
                      href="#visit-card-preview"
                    >
                      QR Included
                    </Button>
                    <Space size={[6, 6]} wrap style={{ marginLeft: 8 }}>
                      <Tag color="blue" style={{ borderRadius: 6, margin: 0 }}>
                        PNG
                      </Tag>
                      <Tag
                        color="geekblue"
                        style={{ borderRadius: 6, margin: 0 }}
                      >
                        QR
                      </Tag>
                      <Tag
                        color="purple"
                        style={{ borderRadius: 6, margin: 0 }}
                      >
                        Auto Layout
                      </Tag>
                    </Space>
                  </Space>
                </div>
              </Space>
            </Card>
          </div>

          <div className="visit-card-page">
            <div className="container">
              <div className="row">
                <div className="col-lg-12" id="visit-card-preview">
                  <VisitCardPreview />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CopyrightFooter />
    </div>
  );
};

export default VisitCardPage;
