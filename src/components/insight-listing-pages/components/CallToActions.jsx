import { Button } from "antd";
import { Link } from "react-router-dom";

const CallToActions = () => {
  return (
    <div className="call-to-action-four ">
      <h5>Join InsightDeed</h5>
      <p>
        Create an account to share your own professional insights and build your
        knowledge archive.
      </p>
      <Button type="primary">
        <Link to="/register">Create Account</Link>
      </Button>
      <div
        className="image"
        style={{ backgroundImage: "url(/images/resource/ads-bg-4.png)" }}
      ></div>
    </div>
  );
};

export default CallToActions;
