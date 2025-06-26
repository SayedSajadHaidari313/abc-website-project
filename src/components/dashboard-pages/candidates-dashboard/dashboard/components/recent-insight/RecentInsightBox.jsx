import { Alert, Avatar, Skeleton, Tag, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useGetAllInsightData } from "@/queries/all.insight.query";
import { useAuthStore } from "@/auth/auth.store";
import BookmarkButton from "../../../insight-hubs/components/InsightBookMark";
import VoteButton from "../../../insight-hubs/components/InsightVote";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
import moment from "moment";

const RecentInsightBox = () => {
  const { data, isLoading, isError } = useGetAllInsightData();
  const { user: userAuth } = useAuthStore();

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
  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />;

  if (isError)
    return (
      <Alert
        message="Error fetching data"
        description="Please try again later."
        type="error"
        showIcon
      />
    );

  const insights = data?.data
    ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    ?.slice(0, 3);
  let content = insights?.map((item) => (
    <div
      className="job-block col-lg-12 d-flex col-md-12 col-sm-12"
      key={item.id}
    >
      <div className="inner-box w-100">
        <div className="content d-flex flex-column">
          <span className="company-logo mb-2 ">
            <Avatar
              size={64}
              src={
                item?.user?.photo
                  ? `${BASE_IMAGE_URL}${item?.user?.photo}`
                  : "/images/default-avatar.png"
              }
            >
              {!item?.user?.photo && item?.user?.first_name
                ? item?.user?.first_name.charAt(0).toUpperCase()
                : ""}
            </Avatar>
          </span>
          <h4 className="mb-1">{item?.user?.first_name}</h4>
          <div className="d-flex align-items-center mb-3 ">
            <span className=" secondary">
              {item?.user?.user_rank?.rank || "No Rank"}
            </span>
            <span className="badge bg-primary ms-2">
              {item?.user?.user_rank?.total_insights || 0} insights
            </span>
            <Tooltip title="Total insights shared">
              <InfoCircleOutlined className="ms-2" />
            </Tooltip>
          </div>
        </div>
        <ul className="insight-info text-left">
          <li className="mb-3 text-left">
            <span
              dangerouslySetInnerHTML={{
                __html: item?.content || "---",
              }}
            ></span>
          </li>
          <li className="">
            <div className="">
              Insight Tags:
              {item?.tag?.map((tag, index) => (
                <Tag key={index} color={getColorByIndex(index)}>
                  {tag.name}
                </Tag>
              ))}
            </div>
          </li>
        </ul>
        <li className="d-flex justify-content-between text-left">
          <div className="d-flex align-items-center">
            <VoteButton
              insightId={item?.id}
              userId={userAuth?.id}
              initialVotes={item?.votes_count || 0}
            />

            {/* Optional other icons */}
            <BookmarkButton insightId={item?.id} userId={userAuth?.id} />
          </div>
          <span className="text-muted d-flex align-items-center">
            <span className="icon flaticon-clock-3 me-1"></span>
            {moment(item?.created_at).fromNow()}
          </span>
        </li>
      </div>
    </div>
  ));

  return (
    <>
      <div className="">{content}</div>
      {/* End .row */}
    </>
  );
};

export default RecentInsightBox;
