// import { useGetAuthUserData } from "@/queries/user.query";
// import {
//   Card,
//   Typography,
//   Row,
//   Col,
//   Tag,
//   Progress,
//   Space,
// } from "antd";
// import {
//   BarChartOutlined,
//   RiseOutlined,
//   StarOutlined,
//   BulbOutlined,
//   LikeOutlined,
//   InfoCircleOutlined,
// } from "@ant-design/icons";

// const { Title, Text, Paragraph } = Typography;

// const InsightRankOverview = () => {
//   const { data: userData } = useGetAuthUserData();
//   const userRank = userData?.user?.user_rank || null;
//   const UserInsight = userData?.user?.insight || [];

//   const currentRank = userRank?.rank;

//   const nextGoal =
//     userRank?.total_insights >= 51
//       ? 100
//       : userRank?.total_insights >= 11
//       ? 51
//       : 11;

//   return (
//     <div style={{ padding: 24 }}>
//       {/* Header */}
//       <Card bordered={false} style={{ marginBottom: 24 }}>
//         <Space>
//           <BulbOutlined style={{ fontSize: 24, color: "#722ed1" }} />
//           <Title level={3} style={{ margin: 0 }}>Insight Ranks</Title>
//         </Space>
//         <br />
//         <br />
//         <Text type="secondary">
//           Build professional credibility through quality insights.
//         </Text>
//       </Card>

//       {/* Your Rank Overview */}
//       <Card title="Your Current Rank" style={{ marginBottom: 24 }}>
//         <Row gutter={[16, 16]}>
//           <Col span={24}>
//             <Paragraph>
//               You’ve shared <strong>{userRank?.total_insights}</strong> insights and earned the highest rank:
//               <Tag color="purple" style={{ marginLeft: 8 }}>
//                 <RiseOutlined /> {currentRank}
//               </Tag>
//             </Paragraph>
//             <Paragraph>
//               <BarChartOutlined  /> {userRank?.total_insights}/{nextGoal} insights
//               <Progress
//                 percent={Math.min(
//                   (userRank?.total_insights / nextGoal) * 100,
//                   100
//                 )}
//                 status="active"
//                 strokeColor="#722ed1"
//                 style={{ marginTop: 8 }}
//               />
//               <Text type="success">
//                 {userRank?.total_insights >= nextGoal
//                   ? "You've exceeded the minimum requirement for this rank."
//                   : `Next milestone: ${nextGoal} insights`}
//               </Text>
//             </Paragraph>
//           </Col>

//           {/* Stats */}
//           <Col span={8}>
//             <Card>
//               <Space direction="vertical" align="center" style={{ width: "100%" }}>
//                 <Title level={3}><BulbOutlined /> {userRank?.total_insights}</Title>
//                 <Text>Total Insights</Text>
//               </Space>
//             </Card>
//           </Col>
//           <Col span={8}>
//             <Card>
//               <Space direction="vertical" align="center" style={{ width: "100%" }}>
//                 <Title level={3}><StarOutlined /> {UserInsight?.filter((item) => item?.is_featured === "yes")?.length}</Title>
//                 <Text>Featured Insights</Text>
//               </Space>
//             </Card>
//           </Col>
//           <Col span={8}>
//             <Card>
//               <Space direction="vertical" align="center" style={{ width: "100%" }}>
//                 <Title level={3}><LikeOutlined /> {userRank?.totalUpvotes}</Title>
//                 <Text>Total Upvotes</Text>
//               </Space>
//             </Card>
//           </Col>
//         </Row>
//       </Card>

//       {/* Rank System */}
//       <Card title={<><InfoCircleOutlined /> Insight Rank System</>} style={{ marginBottom: 24 }}>
//         <Row gutter={[16, 16]}>
//           <Col span={8}>
//             <Card title="Starter Thinker" bordered={false}>
//               <Text>0–10 insights shared</Text>
//               <Paragraph>Beginning your journey of sharing professional knowledge.</Paragraph>
//               <ul>
//                 <li>Basic profile badge</li>
//                 <li>Access to all platform features</li>
//               </ul>
//             </Card>
//           </Col>
//           <Col span={8}>
//             <Card title="Deep Analyst" bordered={false}>
//               <Text>11–50 insights shared</Text>
//               <Paragraph>Regularly contributing meaningful insights.</Paragraph>
//               <ul>
//                 <li>Deep Analyst profile badge</li>
//                 <li>Higher visibility in search</li>
//                 <li>Early access to features</li>
//               </ul>
//             </Card>
//           </Col>
//           <Col span={8}>
//             <Card title="Industry Thought Leader" bordered={false}>
//               <Text>51+ insights shared</Text>
//               <Paragraph>Recognized for significant professional contributions.</Paragraph>
//               <ul>
//                 <li>Exclusive badge</li>
//                 <li>Early job invites</li>
//                 <li>Featured in newsletters</li>
//               </ul>
//             </Card>
//           </Col>
//         </Row>
//       </Card>

//       {/* Tips */}
//       <Card title="How to Advance Your Rank">
//         <Paragraph>
//           <strong>📢 Share Quality Insights:</strong> Focus on meaningful observations.
//         </Paragraph>
//         <Paragraph>
//           <strong>🤝 Engage with the Community:</strong> Upvote and bookmark insights.
//         </Paragraph>
//         <Paragraph>
//           <strong>🏅 Aim for Featured Insights:</strong> Respond to prompts with unique views.
//         </Paragraph>
//         <Paragraph>
//           <strong>🧠 Connect Insights to Your Profession:</strong> Use relevant tags and context.
//         </Paragraph>
//       </Card>
//     </div>
//   );
// };

// export default InsightRankOverview;

import { useGetAuthUserData } from "@/queries/user.query";
import {
  Card,
  Typography,
  Row,
  Col,
  Tag,
  Progress,
  List,
  Avatar,
  Button,
  Space,
  Divider,
} from "antd";
import {
  RocketOutlined,
  StarOutlined,
  FireOutlined,
  ArrowUpOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  UserOutlined,
  PlusOutlined,
  SketchCircleFilled,
  BulbOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const InsightRankOverview = () => {
  const { data: userData } = useGetAuthUserData();
  const userRank = userData?.user?.user_rank || null;
  const UserInsight = userData?.user?.insight || null;
  const currentRank = userRank?.rank;
  const navigate = useNavigate();

  const nextGoal =
    userRank?.total_insights >= 51
      ? 100
      : userRank?.total_insights >= 11
      ? 51
      : 11;

  const featuredInsights = [
    { title: "Team Alignment in Product Launches", upvotes: 53 },
    { title: "User Research Question Techniques", upvotes: 42 },
    { title: "Ruthless Prioritization Strategy", upvotes: 38 },
  ];

  const jobOpportunities = [
    { title: "Senior Product Manager", company: "TechCorp" },
    { title: "Product Strategy Lead", company: "InnovateCo" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        {/* Left Column */}
        <Col xs={24} lg={16}>
          <Card bordered={false} style={{ marginBottom: 24 }}>
            <Title level={3}>
              <BulbOutlined style={{ color: "#722ed1", marginRight: 8 }} />
              Insight Ranks
            </Title>
            <Text type="secondary">
              Build professional credibility through quality insights
            </Text>
          </Card>

          <Card title="Your Current Rank" style={{ marginBottom: 24 }}>
            <Paragraph>
              You’ve shared <strong>{userRank?.total_insights}</strong> insights
              and earned the highest rank:
              <Tag color="purple" style={{ marginLeft: 8 }}>
                {currentRank}
              </Tag>
            </Paragraph>
            <Paragraph>
              {userRank?.total_insights}/{nextGoal} insights
              <Progress
                percent={Math.min(
                  (userRank?.total_insights / nextGoal) * 100,
                  100
                )}
                status="active"
                strokeColor="#722ed1"
              />
              <Text type="success">
                {userRank?.total_insights >= nextGoal
                  ? "You've exceeded the minimum requirement for this rank."
                  : `Next milestone: ${nextGoal} insights`}
              </Text>
            </Paragraph>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col xs={24} md={8}>
                <Card>
                  <Title level={4}>
                    <ArrowUpOutlined /> {userRank?.total_insights}
                  </Title>
                  <Text>Total Insights</Text>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card>
                  <Title level={4}>
                    <StarOutlined />{" "}
                    {
                      UserInsight?.filter((item) => item?.is_featured === "yes")
                        ?.length
                    }
                  </Title>
                  <Text>Featured Insights</Text>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card>
                  <Title level={4}>
                    <FireOutlined /> {userRank?.totalUpvotes}
                  </Title>
                  <Text>Total Upvotes</Text>
                </Card>
              </Col>
            </Row>
          </Card>

          <Card title="Insight Rank System" style={{ marginBottom: 24 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={24}>
                <Card bordered={false}>
                  <Title level={5}>
                    <SketchCircleFilled 
                      style={{ color: "#722ed1", marginRight: 8 }}
                    />
                    Starter Thinker
                  </Title>
                  <Divider />
                  <Text>0–10 insights shared</Text>
                  <Paragraph>
                    Beginning your journey of sharing professional knowledge.
                  </Paragraph>
                  <ul>
                    <li>Basic profile badge</li>
                    <li>Access to all platform features</li>
                  </ul>
                </Card>
              </Col>
              <Col xs={24} md={24}>
                <Card  bordered={false}>
                <Title level={5}>
                    <SketchCircleFilled 
                      style={{ color: "#722ed1", marginRight: 8 }}
                    />
                    Deep Analyst
                  </Title>
                  <Divider />
                  <Text>11–50 insights shared</Text>
                  <Paragraph>
                    Regularly contributing meaningful insights.
                  </Paragraph>
                  <ul>
                    <li><CheckCircleOutlined /> Deep Analyst profile badge</li>
                    <li><CheckCircleOutlined /> Higher visibility in search</li>
                    <li><CheckCircleOutlined /> Early access to features</li>
                  </ul>
                </Card>
              </Col>
              <Col xs={24} md={24}>
                <Card bordered={false}>
                <Title level={5}>
                    <SketchCircleFilled 
                      style={{ color: "#722ed1", marginRight: 8 }}
                    />
                    Industry Thought Leader
                  </Title>
                  <Divider />
                  <Text>51+ insights shared</Text>
                  <Paragraph>
                    Recognized for significant professional contributions.
                  </Paragraph>
                  <ul>
                    <li> <CheckCircleOutlined /> Exclusive badge</li>
                    <li> <CheckCircleOutlined /> Early job invites</li>
                    <li><CheckCircleOutlined /> Featured in newsletters</li>
                  </ul>
                </Card>
              </Col>
            </Row>
          </Card>

          <Card title="How to Advance Your Rank">
            <Paragraph>
              <strong>Share Quality Insights:</strong> Focus on meaningful
              observations.
            </Paragraph>
            <Paragraph>
              <strong>Engage with the Community:</strong> Upvote and bookmark
              insights.
            </Paragraph>
            <Paragraph>
              <strong>Aim for Featured Insights:</strong> Respond to prompts
              with unique views.
            </Paragraph>
            <Paragraph>
              <strong>Connect Insights to Your Profession:</strong> Use relevant
              tags and context.
            </Paragraph>
          </Card>
        </Col>

        {/* Right Column */}
        <Col xs={24} lg={8}>
          {/* Share a New Insight */}
          <Card
            title={
              <Space>
                <PlusOutlined />
                Share a New Insight
              </Space>
            }
            style={{ marginBottom: 24 }}
          >
            <Button
              type="primary"
              block
              style={{ marginBottom: 16 }}
              icon={<CheckCircleOutlined />}
              onClick={() => navigate("/candidate/post-new-insight")}
            >
              Start Writing
            </Button>

            {/* Your Rank Benefits inside this card */}
            <Card
              title={
                <Space>
                  <TrophyOutlined />
                  Your Rank Benefits
                </Space>
              }
              bordered={false}
              style={{ backgroundColor: "#fafafa" }}
            >
              <ul>
                <li>
                  <CheckCircleOutlined /> Exclusive profile badge
                </li>
                <li>
                  <CheckCircleOutlined /> Early job invites
                </li>
                <li>
                  <CheckCircleOutlined /> Trending insights placement
                </li>
                <li>
                  <CheckCircleOutlined /> Featured in newsletters
                </li>
                <li>
                  <CheckCircleOutlined /> Priority in job matching
                </li>
              </ul>
            </Card>
          </Card>

          {/* Featured Insights */}
          <Card
            title={
              <Space>
                <StarOutlined />
                Featured Insights
              </Space>
            }
            style={{ marginBottom: 24 }}
          >
            <List
              dataSource={featuredInsights}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<ArrowUpOutlined />} />}
                    title={item.title}
                    description={`${item.upvotes} upvotes`}
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Job Opportunities */}
          <Card
            title={
              <Space>
                <UserOutlined />
                Job Opportunities
              </Space>
            }
          >
            <List
              dataSource={jobOpportunities}
              renderItem={(job) => (
                <List.Item>
                  <List.Item.Meta
                    title={job.title}
                    description={`${job.company} • Early Access`}
                  />
                </List.Item>
              )}
            />
            <div style={{ marginTop: 8 }}>
              <Button
                type="primary"
                block
                style={{ marginBottom: 16 }}
                icon={<CheckCircleOutlined />}
                onClick={() => navigate("/candidate/post-new-insight")}
              >
                View All the Job
              </Button>{" "}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InsightRankOverview;
