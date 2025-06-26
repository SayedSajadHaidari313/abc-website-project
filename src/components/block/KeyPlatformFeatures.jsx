
import {
  BulbOutlined,
  BookOutlined,
  RiseOutlined,
  TagsOutlined,
  SearchOutlined,
  TeamOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const KeyPlatformFeatures = () => {
  const features = [
    {
      title: "Prompted Insights",
      icon: <BulbOutlined className="text-primary fs-4 me-2" />,
      description:
        "Daily industry-related questions to inspire your professional posts. Never run out of ideas for sharing your expertise.",
      example: `"What's one leadership lesson you learned this week?"`,
    },
    {
      title: "Insight Archive",
      icon: <BookOutlined className="text-primary fs-4 me-2" />,
      description:
        "Your personal professional knowledge library where you can organize, categorize, and revisit your insights.",
      bullets: [
        "Tag and categorize insights",
        "Mark key insights as \"Career Lessons\"",
        "Track your professional growth",
      ],
    },
    {
      title: "Insight Ranks",
      icon: <RiseOutlined className="text-primary fs-4 me-2" />,
      description:
        "Build professional credibility through quality insights and advance through ranks that unlock premium opportunities.",
      bullets: [
        "Starter Thinker (0-10 insights)",
        "Deep Analyst (11-50 insights)",
        "Industry Thought Leader (51+ insights)",
      ],
    },
    {
      title: "Tag-Based Matching",
      icon: <TagsOutlined className="text-primary fs-4 me-2" />,
      description:
        "Our unique tagging system connects your professional insights directly to relevant job opportunities.",
      tags: [
        "#ProductManagement",
        "#Leadership",
        "#SoftwareEngineering",
        "#UXDesign",
      ],
    },
    {
      title: "Personalized Job Matching",
      icon: <SearchOutlined className="text-primary fs-4 me-2" />,
      description:
        "Get matched with job opportunities based on your demonstrated expertise, not just your resume keywords.",
      bullets: [
        "Strong Matches (80-100%)",
        "Good Matches (50-79%)",
        "Partial Matches (0-49%)",
        "Early access to premium opportunities",
      ],
    },
    {
      title: "Professional Community",
      icon: <TeamOutlined className="text-primary fs-4 me-2" />,
      description:
        "Connect with professionals in your field, follow experts, and build your personalized feed of relevant insights.",
      bullets:  [
         "Follow professionals in your field", 
        "Discover trending insights",
        "Build your professional network",
      ],
    },
  ];

  return (
    <section className="auto-container">
      <div className="row g-4">
        {features.map((feature, index) => (
          <div className="col-lg-4 col-md-6" key={index}>
            <div
              className="card h-100 shadow-sm p-4 border-0"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h5 className="fw-semibold mb-3 d-flex align-items-center">
                {feature.icon}
                {feature.title}
              </h5>
              <p>{feature.description}</p>

              {feature.example && (
                <blockquote className="blockquote border-start ps-3 mt-2">
                  {feature.example}
                </blockquote>
              )}

              {feature.bullets && (
                <ul className="list-unstyled mt-2">
                  {feature.bullets.map((item, i) => (
                    <li key={i} className="mb-1"><CheckCircleOutlined style={{ color:"gray" }} /> {item}</li>
                  ))}
                </ul>
              )}

              {feature.tags && (
                <div className="mt-3">
                  {feature.tags.map((tag, i) => (
                    <span className="badge bg-secondary me-2 mb-1" key={i}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyPlatformFeatures;
