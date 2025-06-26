import { Link } from "react-router-dom";

const CallToAction2 = () => {
  return (
    <section
      className="call-to-action-two"
      style={{ backgroundImage: "url(/images/background/1.jpg)" }}
    >
      <div className="auto-container" data-aos="fade-up">
        <div className="sec-title light text-center">
          <h2>Ready to Transform Your Hiring Process?</h2>
          <div className="text">
            Join InsightDeed today to find candidates based on demonstrated
            expertise, not just resume keywords.
          </div>
        </div>

        <div className="btn-box">
          <Link to="/register" className="theme-btn btn-style-three">
            Create Employer Account
          </Link>
          <Link to="/contact" className="theme-btn btn-style-two">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction2;
