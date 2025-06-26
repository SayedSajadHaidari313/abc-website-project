import React from "react";
import {
  BulbOutlined,
  TagsOutlined,
  RiseOutlined,
  SearchOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const ForEmployer = () => {
  const steps = [
    {
      id: 1,
      icon: <BulbOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
      title: "Share Insights",
      text: `Respond to daily prompts or share your own professional observations to build your knowledge archive.`,
    },
    {
      id: 2,
      icon: <TagsOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
      title: "Tag Your Knowledge",
      text: `Add professional tags to your insights to categorize your expertise and improve job matching.`,
    },
    {
      id: 3,
      icon: <RiseOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
      title: "Build Credibility",
      text: `Advance through Insight Ranks as you share more valuable knowledge, unlocking premium features.`,
    },
    {
      id: 4,
      icon: <SearchOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
      title: "Get Personalized Matches",
      text: `Registered users receive personalized match percentages and early access to premium opportunities based on their demonstrated expertise.`,
    },
  ];

  return (
    <div className="container py-3">
      <Row gutter={[32, 32]} align="middle">
        {/* Left Section */}
        <Col xs={24} md={12}>
          <Title level={1}>Find Candidates Based on Demonstrated Expertise</Title>
          <Paragraph>
            InsightDeed offers a unique approach to hiring that goes beyond resumes and keywords.
          </Paragraph>
          <div className="d-flex gap-3 mt-4">
            <Button type="primary" size="large">
              <Link to="/register">  Post a Job</Link>
            </Button>
            <Button type="default" size="large">
             <Link to="/login"> Employer Login</Link>
            </Button>
          </div>
        </Col>

        {/* Right Section */}
        <Col xs={24} md={12}>
          <Card title="Why InsightDeed for Employers?" bordered={false}>
            <Paragraph strong>
              <CheckCircleOutlined style={{ color : "blue"}} /> Evidence-Based Hiring
            </Paragraph>
            <Paragraph>
              See how candidates think through real professional situations before you interview them.
            </Paragraph>
            <Paragraph strong>
             <CheckCircleOutlined style={{ color : "blue"}} /> Targeted Access
            </Paragraph>
            <Paragraph>
              Reach professionals with verified expertise in specific domains through our tag-based matching system.
            </Paragraph>
            <Paragraph strong>
             <CheckCircleOutlined style={{ color : "blue"}} /> Engagement Beyond Hiring
            </Paragraph>
            <Paragraph>
              Build your brand presence through the knowledge ecosystem by sharing company insights.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ForEmployer;
