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
  Input,
  Skeleton,
} from "antd";
import {
  BookOutlined,
  StarOutlined,
  UserOutlined,
  InfoCircleOutlined,
  CheckCircleFilled,
  BulbOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useGetAuthUserData, useGetUserData } from "@/queries/user.query";
import CustomPagination from "@/components/pagination/CustomPagination";
import BookmarkButton from "../../insight-hubs/components/InsightBookMark";
import VoteButton from "../../insight-hubs/components/InsightVote";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
import moment from "moment";

const { Paragraph, Text } = Typography;

const InsightCard = () => {
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

  const usersWithInsight = UserData.filter(
    (user) => user?.insight && user?.insight.length > 0
  );

  const filteredInsights = usersWithInsight
    .map((user) => {
      let insights = user.insight;
      if (filter === "all") {
        // Only show bookmarked insights for archive
        insights = insights.filter((insight) =>
          insight?.bookmarks?.some(
            (bookmark) => bookmark.user_id === authUser?.user?.id
          )
        );
      }

      if (filter === "your") {
        if (user?.id !== authUser?.user?.id) {
          insights = []; // Remove all insights not from current user
        }
      }

      if (filter === "trending") {
        const sortedInsights = insights
          ?.slice()
          .sort((a, b) => (b.votes?.length || 0) - (a.votes?.length || 0));
        return { ...user, insights: sortedInsights };
      }

      if (filter === "career") {
        if (user?.id === authUser?.user?.id) {
          insights = insights.filter(
            (insight) => insight.is_career_lession === "yes"
          );
        } else {
          insights = [];
        }
      }

      if (filter === "tag" && tagFilter) {
        insights = insights.filter((insight) => {
          const tags = insight?.tags?.split("$") || [];
          return tags.includes(tagFilter);
        });
      }

      return { ...user, insights };
    })
    .filter((user) => user.insights.length > 0);

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

  const getColorByIndex = (index) => {
    const colors = [
      "magenta",
      "volcano",
      "orange",
      "gold",
      "lime",
      "green",
      "cyan",
      "blue",
      "geekblue",
      "purple",
    ];
    return colors[index % colors.length];
  };
  return (
    <>
      <Typography.Title level={3}>
        <BulbOutlined style={{ color: "#722ed1", marginRight: 8 }} />
        Insight Archive
      </Typography.Title>
      <Paragraph style={{ fontSize: "15px" }}>
        Your personal professional knowledge library
      </Paragraph>
      <Card style={{ borderRadius: 12, marginBottom: 20 }}>
        <Typography.Title style={{ fontSize: "18px" }}>
          About Insight Archive
        </Typography.Title>
        <Paragraph style={{ fontSize: "15px" }}>
          Your Insight Archive is a structured library of all your professional
          insights. You can:
        </Paragraph>
        <ul style={{ fontSize: "15px" }}>
          <li>
            {" "}
            <CheckCircleFilled /> Tag and categorize insights for easy reference
          </li>
          <li>
            {" "}
            <CheckCircleFilled /> Mark key insights as "Career Lessons" for
            future reference
          </li>
          <li>
            {" "}
            <CheckCircleFilled /> Track your professional growth through past
            insights
          </li>
          <li>
            {" "}
            <CheckCircleFilled /> uild a valuable knowledge asset over time
          </li>
        </ul>
      </Card>
      {/* Filter Buttons */}
      <Row gutter={[12, 12]} justify="center" style={{ marginBottom: 20 }}>
        <Col xs={24} sm={6} md={4}>
          <Button
            onClick={() => setFilter("all")}
            type={filter === "all" ? "primary" : "default"}
            icon={<BookOutlined />}
            size="large"
            block
            style={{ borderRadius: 8 }}
          >
            Archive Insights
          </Button>
        </Col>

        <Col xs={24} sm={12} md={4}>
          <Button
            onClick={() => setFilter("career")}
            type={filter === "career" ? "primary" : "default"}
            icon={<UserOutlined />}
            size="large"
            block
            style={{ borderRadius: 8 }}
          >
            Career Lessons
          </Button>
        </Col>
        <Col xs={24} sm={12} md={3}>
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
        <Col xs={24} sm={12} md={3}>
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
        <Col xs={24} sm={12} md={4}>
          <Input
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            placeholder="Filter by tag"
            onPressEnter={() => setFilter("tag")}
            style={{ borderRadius: 8 }}
          />
        </Col>
        <Col xs={24} sm={12} md={3}>
          <Button
            onClick={() => {
              if (tagFilter) setFilter("tag");
            }}
            type={filter === "tag" ? "primary" : "default"}
            icon={<InfoCircleOutlined />}
            size="large"
            block
            style={{ borderRadius: 8 }}
          >
            By Tag
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
          return user.insights.map((insight, insightIndex) => (
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
                      <Tag
                        style={{ marginLeft: 8 }}
                        className="bg-primary badge ms-2"
                      >
                        {userRank?.total_insights || 0} insights
                      </Tag>
                      <Tooltip title="Total insights shared">
                        <InfoCircleOutlined className="ms-2" />
                      </Tooltip>
                    </div>
                  </Space>

                  <Col span={24} style={{ marginTop: 12 }}>
                    <Paragraph>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: insight?.content || "---",
                        }}
                      ></span>
                      {/* {insight?.content || "No insight content."} */}
                    </Paragraph>
                  </Col>

                  {/* Tags */}
                  <Col span={24} style={{ marginBottom: 8 }}>
                    <Text type="secondary">Insight Tags:</Text>
                    {insight?.tag?.map((tag, index) => (
                      <Tag key={index} color={getColorByIndex(index)}>
                        {tag.name}
                      </Tag>
                    ))}
                  </Col>

                  {/* Footer icons */}
                  <Col span={24} className="d-flex justify-content-between ">
                    <Space size="large" className="d-flex align-items-center">
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
                    </Space>
                    <span className="text-muted d-flex align-items-center">
                      <span className="icon flaticon-clock-3 me-1"></span>
                      {moment(insight?.created_at).fromNow()}
                    </span>
                  </Col>
                </Col>
              </Row>
            </Card>
          ));
        })
      )}
      <CustomPagination
        total={UserData?.total || 0}
        current={pagination.current}
        pageSize={pagination.pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </>
  );
};

export default InsightCard;
