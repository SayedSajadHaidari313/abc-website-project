import {
  Avatar,
  Card,
  Col,
  Row,
  Tag,
  Tooltip,
  Typography,
  Space,
  Button,
  Skeleton, // Importing Skeleton from Ant Design
} from "antd";
import {
  InfoCircleOutlined,
  PlusCircleOutlined,
  CheckCircleFilled,
  BulbOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useGetAuthUserData, useGetUserData } from "@/queries/user.query";
import CustomPagination from "@/components/pagination/CustomPagination";
import { useGetInsightTrandData } from "@/queries/all.insight.query";
import { Link } from "react-router-dom";
import BookmarkButton from "./InsightBookMark";
import VoteButton from "./InsightVote";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const { Paragraph, Text } = Typography;

const InsightHubList = () => {
  const { data: authUser } = useGetAuthUserData();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    searchQuery: localStorage.getItem("searchInput") || "",
  });
  const { data, isLoading } = useGetUserData(
    pagination.current,
    pagination.pageSize,
    pagination.searchQuery
  );
  const UserData = data?.data || [];
  // States for filter logic
  const [filter, setFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("");
  const { data: TrandingData } = useGetInsightTrandData(
    pagination.current,
    pagination.pageSize,
    pagination.searchQuery
  );

  const usersWithInsight = UserData?.filter(
    (user) => user?.insight && user?.insight.length > 0
  );

  const filteredInsights = usersWithInsight
    .map((user) => {
      let insights = user?.insight;

      if (filter === "trending") {
        const sortedInsights = insights
          ?.slice()
          .sort((a, b) => (b.votes?.length || 0) - (a.votes?.length || 0));
        return { ...user, insights: sortedInsights };
      }

      if (filter === "your") {
        if (user?.id !== authUser?.user?.id) {
          insights = []; // Remove all insights not from current user
        }
      }

      if (filter === "featured") {
        insights = insights.filter((insight) => insight.is_featured === "yes");
      }
      if (filter === "career") {
        insights = insights.filter(
          (insight) => insight.is_career_lession === "yes"
        );
      }

      if (filter === "tag" && tagFilter) {
        insights = insights.filter((insight) => {
          const tags = insight?.tags?.split("$") || [];
          return tags.includes(tagFilter);
        });
      }

      return { ...user, insights };
    })
    .filter((user) => user?.insights?.length > 0);

  const onPageChange = (page, pageSize) => {
    setPagination({ ...pagination, current: page, pageSize });
  };

  const onPageSizeChange = (value) => {
    setPagination({ ...pagination, pageSize: value, current: 1 });
  };

  const handleSearch = (value) => {
    setPagination({ ...pagination, searchQuery: value, current: 1 });
    localStorage.setItem("searchInput", value);
  };

  return (
    <>
      <Typography.Title level={3}>
        {" "}
        <BulbOutlined style={{ color: "#722ed1", marginRight: 8 }} />
        Insights Hub
      </Typography.Title>
      <Paragraph style={{ fontSize: "15px" }}>
        Your personal professional knowledge library
      </Paragraph>
      <Card style={{ borderRadius: 12, marginBottom: 20 }}>
        <Typography.Title style={{ fontSize: "18px" }}>
          <ExclamationCircleOutlined /> About Insights Hub
        </Typography.Title>
        <Paragraph style={{ fontSize: "15px" }}>
          The Insights Hub is focused on professional knowledge sharing. Here
          you can:
        </Paragraph>
        <ul style={{ fontSize: "15px" }}>
          <li>
            {" "}
            <CheckCircleFilled /> Discover valuable professional insights
            organized by topics
          </li>
          <li>
            {" "}
            <CheckCircleFilled /> Share your own expertise to build your
            professional credibility
          </li>
          <li>
            {" "}
            <CheckCircleFilled /> Save and organize knowledge in your personal
            Insight Archive
          </li>
          <li>
            {" "}
            <CheckCircleFilled /> Track your Insight Tier progress as you
            contribute knowledge
          </li>
        </ul>
        <Paragraph style={{ fontSize: "15px" }}>
          <strong>Looking for people</strong> to follow? Visit the{" "}
          <Link to={"/candidate/community"}>Community section</Link> to connect
          with professionals.
        </Paragraph>
      </Card>
      {/* Filter Buttons */}
      <Row gutter={[12, 12]} justify="center" style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12} md={4}>
          <Button
            onClick={() => setFilter("all")}
            type={filter === "all" ? "primary" : "default"}
            size="large"
            block
            style={{ borderRadius: 8 }}
          >
            All Insights
          </Button>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Button
            onClick={() => setFilter("featured")}
            type={filter === "featured" ? "primary" : "default"}
            size="large"
            block
            style={{ borderRadius: 8 }}
          >
            By Topic
          </Button>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Button
            onClick={() => setFilter("trending")}
            type={filter === "trending" ? "primary" : "default"}
            size="large"
            block
            style={{ borderRadius: 8 }}
          >
            Trending
          </Button>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Button
            onClick={() => setFilter("your")}
            type={filter === "your" ? "primary" : "default"}
            size="large"
            block
            style={{ borderRadius: 8 }}
          >
            Your Insights
          </Button>
        </Col>
      </Row>

      {/* Render Insights */}
      {isLoading ? (
        // Skeleton Loader while data is loading
        <Row gutter={[12, 12]}>
          {[...Array(3)].map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card style={{ borderRadius: 12, marginBottom: 20 }}>
                <Skeleton avatar paragraph={{ rows: 2 }} active />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        filteredInsights.map((user, userIndex) => {
          const userRank = user?.user_rank;
          return user?.insights?.map((insight, insightIndex) => (
            <Card
              key={`${userIndex}-${insightIndex}`}
              style={{
                borderRadius: 12,
                marginBottom: 20,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Row gutter={[12, 12]} justify="space-between">
                {/* Avatar + Name */}
                <Col xs={24} md={16} lg={16}>
                  <Space align="start">
                    <Avatar
                      size={48}
                      src={
                        user?.photo
                          ? `${BASE_IMAGE_URL}${user?.photo}`
                          : "/images/default-avatar.png"
                      }
                    />
                    <div>
                      <Text strong>
                        {user?.first_name} {user?.last_name}
                      </Text>
                      <br />
                      <Text type="secondary">
                        {userRank?.rank || "No Rank"}
                      </Text>
                      <Tag style={{ marginLeft: 8 }}>
                        {userRank?.total_insights || 0} insights
                      </Tag>
                      <Tooltip title="Total insights shared">
                        <InfoCircleOutlined style={{ marginLeft: 6 }} />
                      </Tooltip>
                    </div>
                  </Space>

                  <Col span={24} style={{ marginTop: 12 }}>
                    <Paragraph>
                      {insight?.content || "No insight content."}
                    </Paragraph>
                  </Col>

                  {/* Tags */}
                  <Col span={24} style={{ marginBottom: 8 }}>
                    <Text type="secondary">Insight Tags:</Text>
                    <Space wrap style={{ marginTop: 4 }}>
                      {(insight?.tags?.split("$") || []).map((tag, idx) =>
                        tag ? (
                          <Tag key={idx} bordered={false} color="blue">
                            #{tag}
                          </Tag>
                        ) : null
                      )}
                    </Space>
                  </Col>

                  {/* Footer icons */}
                  <Col span={24}>
                    <Space size="large">
                      {/* Insight Vote Button with Count */}

                      <VoteButton
                        insightId={insight?.id}
                        userId={authUser?.user?.id}
                        initialVotes={insight?.votes?.length || 0}
                      />

                      {/* Optional other icons */}
                      <BookmarkButton
                        insightId={insight?.id}
                        userId={authUser?.user?.id}
                      />
                      {/* <Button type="text" icon={<StarOutlined />} /> */}
                    </Space>
                  </Col>
                </Col>
              </Row>
            </Card>
          ));
        })
      )}
      <CustomPagination
        total={data?.total || 0}
        current={pagination.current}
        pageSize={pagination.pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </>
  );
};

export default InsightHubList;
