import {
  BulbOutlined,
  TagsOutlined,
  RiseOutlined,
} from "@ant-design/icons";

const HowItWorksEmployer = () => {
  const steps = [
    {
      id: 1,
      icon: <TagsOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
      title: "Tag Your Job Listings",
      text: `Add professional tags to your job listings to match with candidates who have demonstrated expertise in those areas.`,
    },
    {
      id: 2,
      icon: <RiseOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
      title: "Get Matched Candidates",
      text: `Our system matches your job with professionals who have shared insights tagged with relevant expertise.`,
    },
    {
      id: 3,
      icon: <BulbOutlined style={{ fontSize: "32px", color: "#1890ff" }} />,
      title: "Review Candidate Insights",
      text: `See candidates' professional thinking through their insights before you even interview them.`,
    },
  ];

  return (
    <div className="row">
      {steps.map((item) => (
        <div className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
          <div className="work-block -type-4 text-center p-4  mb-4">
            <div className="icon-wrap mb-3">{item.icon}</div>
            <h5 className="title">{item.title}</h5>
            <p className="text">{item.text}</p>
          </div>
        </div>
      ))}
      <p className="text-center" >All jobs posted by employers are visible to everyone browsing the platform.  However, only registered users <br /> receive personalized match percentages  and early access to premium opportunities based on their professional <br /> tags and Insight Rank.</p>
    </div>
  );
};

export default HowItWorksEmployer;
