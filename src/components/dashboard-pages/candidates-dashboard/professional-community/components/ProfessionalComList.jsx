import {
  Avatar,
  Card,
  Col,
  Row,
  Tag,
  Tooltip,
  Typography,
  Space,
  Skeleton,
  Segmented, // Importing Skeleton from Ant Design
} from "antd";
import {
  InfoCircleOutlined,
  CheckCircleFilled,
  TeamOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useGetAuthUserData, useGetUserData } from "@/queries/user.query";
import CustomPagination from "@/components/pagination/CustomPagination";
import { useGetInsightTrandData } from "@/queries/all.insight.query";
import Discover from "./Discover";
import YourNetwork from "./Network";
import VoteButton from "../../insight-hubs/components/InsightVote";
import BookmarkButton from "../../insight-hubs/components/InsightBookMark";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const { Paragraph, Text } = Typography;

const ProfessionalComList = () => {
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
  const [alignValue, setAlignValue] = useState("all");

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

  // const handleVote = (insightId, userId) => {
  //   const isVoted = user?.votedInsights?.includes(insightId); // Check if insight is already voted by the user

  //   const voteAction = isVoted ? "remove" : "add"; // Determine action based on whether the user has already voted

  //   mutate({
  //     insight_id: insightId,
  //     user_id: authUser?.user?.id,
  //     action: voteAction,
  //   });

  //   // Update UI locally by toggling the like status
  //   setUser((prevUser) => {
  //     const updatedVotedInsights = isVoted
  //       ? prevUser.votedInsights.filter((id) => id !== insightId) // Remove the insight from voted list
  //       : [...prevUser.votedInsights, insightId]; // Add the insight to voted list
  //     return { ...prevUser, votedInsights: updatedVotedInsights };
  //   });
  // };

  const onPageChange = (page, pageSize) => {
    setPagination({ ...pagination, current: page, pageSize });
  };

  const onPageSizeChange = (value) => {
    setPagination({ ...pagination, pageSize: value, current: 1 });
  };

  return (
    <>
      <Typography.Title level={3}>
        {" "}
        <TeamOutlined style={{ color: "#722ed1", marginRight: 8 }} />
        Professional Community
      </Typography.Title>
      <Paragraph style={{ fontSize: "15px" }}>
        Connect with professionals and build your network
      </Paragraph>
      <Card style={{ borderRadius: 12, marginBottom: 20 }}>
        <Typography.Title style={{ fontSize: "18px" }}>
          About Professional Community
        </Typography.Title>
        <Paragraph style={{ fontSize: "15px" }}>
          The Community section is focused on connecting with other
          professionals. Here you can:
        </Paragraph>
        <ul style={{ fontSize: "15px" }}>
          <li>
            {" "}
            <CheckCircleFilled /> Discover and follow professionals in your
            field
          </li>
          <li>
            {" "}
            <CheckCircleFilled /> Build your personalized feed based on who you
            follow
          </li>
          <li>
            {" "}
            <CheckCircleFilled /> Engage with content from your professional
            network
          </li>
          <li>
            {" "}
            <CheckCircleFilled /> Find professionals with similar or
            complementary expertise
          </li>
        </ul>
        <Paragraph style={{ fontSize: "15px" }}>
          Looking for professional knowledge? Visit the Insights Hub to discover
          and share expertise.
        </Paragraph>
      </Card>
      {/* Filter Buttons */}
      <Row justify="center" style={{ marginBottom: 20 }}>
        <Segmented
          value={alignValue}
          onChange={(val) => {
            setAlignValue(val);
            setFilter(val);
          }}
          options={[
            { label: "All Insights", value: "all" },
            // { label: "Discover", value: "discover" },
            { label: "Trending", value: "trending" },
            // { label: "Your Network", value: "your" },
          ]}
          block
          className="responsive-segmented"
        />
      </Row>

      {/* Conditionally Render Discover Component */}
      {filter === "discover" ? (
        <Discover />
      ) : filter === "your" ? (
        <YourNetwork />
      ) : // Render Insights if not in "discover" filter mode
      isLoading ? (
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
                      />{" "}
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

export default ProfessionalComList;
