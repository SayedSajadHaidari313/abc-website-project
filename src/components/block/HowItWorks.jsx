import {
  BulbOutlined,
  TagsOutlined,
  RiseOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const HowItWorks = () => {
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
      text: `While all jobs are visible to everyone, registered users receive personalized match percentages and early access to premium opportunities based on their demonstrated expertise.`,
    },
  ];

  return (
    <>
      <div className="row">
        {steps.map((item) => (
          <div className="col-lg-3 col-md-6 col-sm-12" key={item.id}>
            <div className="work-block -type-4 ">
              <div className="icon-wrap mb-3">{item.icon}</div>
              <h5 className="title">{item.title}</h5>
              <p className="text">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HowItWorks;
