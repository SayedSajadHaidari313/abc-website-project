// import { useGetAuthUserData } from "@/queries/user.query";

// const TopCardBlock = () => {
//   const { data: userData } = useGetAuthUserData();

//   return (
//     <>
//       {userData.map((item) => (
//         <div
//           className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
//           key={item.id}
//         >
//           <div className={`ui-item ${item.uiClass}`}>
//             <div className="left">
//               <i className={`icon la ${item.icon}`}></i>
//             </div>
//             <div className="right">
//               <h4>{item.countNumber}</h4>
//               <p>{item.metaName}</p>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default TopCardBlock;

import { useGetAuthUserData } from "@/queries/user.query";
import { Tag, Progress } from "antd";
import {
  TrophyOutlined,
  BulbOutlined,
  LikeOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { render } from "react-dom";

const TopCardBlock = () => {
  const { data: userData } = useGetAuthUserData();

  const userRank = userData?.user?.user_rank || {};
  const insights = userData?.user?.insight || [];
  const posts = userData?.user?.insight || [];

  const nextGoal = 100;
  const totalInsights = userRank?.total_insights || 0;
  const totalVotes = userRank?.total_votes || 0;
  const currentRank = userRank?.rank || "Unranked";

  const cardData = [
    {
      id: 1,
      icon: "la-trophy",
      // countNumber: totalVotes,
      metaName: "Current Rank",
      extra: (
        <Tag color="purple" style={{ marginTop: 6  }}>
          {currentRank}
        </Tag>
      ),
    },
    {
      id: 2,
      icon: "la-lightbulb-o",
      countNumber: totalInsights,
      metaName: "Insights Shared",
      extra: (
        <Progress
          percent={Math.min((totalInsights / nextGoal) * 100, 100)}
          status="active"
          strokeColor="#722ed1"
          size="small"
        />
      ),
    },
    {
      id: 3,
      icon: "la-thumbs-o-up",
      countNumber: totalVotes,
      metaName: "Insight Votes Received",
    },
    {
      id: 4,
      icon: "la-file-text",
      countNumber: posts.length,
      metaName: "Total Posts",
    },
  ];

  return (
    <>
      {cardData.map((item) => (
        <div
          className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className="ui-item">
            <div className="left">
              <i className={`icon la ${item.icon}`}></i>
            </div>
            <div className="right">
              <h4>{item.countNumber}</h4>
              <p>{item.metaName}</p>
              {item.extra && <div className="mt-2">{item.extra}</div>}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;
