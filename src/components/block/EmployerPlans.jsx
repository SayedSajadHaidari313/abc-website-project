import {
  BulbOutlined,
  CheckCircleOutlined,
  CiCircleOutlined,
  StarOutlined,
  StockOutlined,
  TagOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Typography, Button, Badge } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const EmployerSolutionsSection = () => {
  const plans = [
    {
      title: "Basic",
      price: "Free",
      icon: <CheckCircleOutlined style={{ fontSize: 20, color: "#52c41a" }} />,
      features: ["Post up to 3 jobs", "Basic tag matching", "Company profile"],
    },
    {
      title: "Premium",
      price: "Recommended",
      icon: <StarOutlined style={{ fontSize: 20, color: "#1890ff" }} />,
      features: [
        "Unlimited job postings",
        "Advanced tag matching",
        "Priority access to high-tier professionals",
        "Featured company insights",
      ],
    },
    {
      title: "Enterprise",
      price: "Custom",
      icon: <ThunderboltOutlined style={{ fontSize: 20, color: "#faad14" }} />,
      features: [
        "All Premium features",
        "Dedicated account manager",
        "Custom integration options",
        "Advanced analytics",
      ],
    },
  ];

  return (
    <div style={{ padding: "4rem 2rem", background: "#ffffff" }}>
      <Row gutter={[40, 32]} align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={24} md={12}>
          <Card
            title={<Title level={3}>Employer Solutions</Title>}
            bordered={false}
            style={{
              background: "#f9f9f9",
              borderRadius: 12,
              padding: 10,
              // boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
            }}
          >
            <Row gutter={[16, 16]}>
              {plans.map((plan, idx) => (
                <Col xs={24} sm={12} md={24} key={idx}>
                  <Card
                    title={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {/* Left side: Icon + Title */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          {plan.icon}
                          <span>{plan.title}</span>
                        </div>

                        {/* Right side: Badge */}
                        <Badge
                          count={plan.price}
                          style={{
                            backgroundColor:
                              plan.title === "Premium"
                                ? "#1890ff"
                                : plan.title === "Enterprise"
                                ? "#faad14"
                                : "#52c41a",
                          }}
                        />
                      </div>
                    }
                    size="small"
                    style={{
                      height: "100%",
                      textAlign: "center",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        textAlign: "left",
                      }}
                    >
                      {plan.features.map((feat, i) => (
                        <li key={i} style={{ marginBottom: 8 }}>
                          <CheckCircleOutlined /> {feat}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingRight: 12,
            }}
          >
            <Title level={2}>Beyond Traditional Job Boards</Title>
            <Paragraph style={{ fontSize: 16 }}>
              InsightDeed offers employers a unique way to find candidates based
              on demonstrated expertise, not just resume keywords.
            </Paragraph>
            <ul style={{ fontSize: 15, lineHeight: 2 }}>
              <li>
                <strong>
                  <BulbOutlined style={{ fontSize: 20 }} /> Company Insights
                </strong>
                <br />
                Share your company's professional knowledge to attract
                candidates who align with your values and approach.
              </li>
              <li>
                <strong>
                  {" "}
                  <StockOutlined style={{ fontSize: 20 }} /> Rank-Based Access
                </strong>
                <br />
                Premium employers get early access to professionals with higher
                Insight Ranks, connecting you with verified experts.
              </li>
              <li>
                <strong>
                  {" "}
                  <TagOutlined style={{ fontSize: 20 }} /> Precision Matching
                </strong>
                <br />
                Our tag-based matching system ensures you only see candidates
                with relevant expertise for your specific needs.
              </li>
            </ul>
            <Button type="primary" size="large" style={{ marginTop: 24 }}>
              <Link to={"/register"}>Get Started</Link>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EmployerSolutionsSection;
