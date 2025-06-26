


import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import FromContent3 from "./FromContent";

const ForgotPassword = () => {
  return (
    <div className="form-inner">
      <h3>Forgot Password </h3>
      <FromContent3 />
      {/* End form-group */}

      <div className="bottom-box">
        <div className="text">
          Already have an account?{" "}
          <Link to="/login" className="call-modal login">
            LogIn
          </Link>
        </div>
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default ForgotPassword;
