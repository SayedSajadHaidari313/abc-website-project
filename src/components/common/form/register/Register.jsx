import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import LoginWithSocial from "./LoginWithSocial";
// import Form from "./FormContent";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="form-inner">
      <h3>Create a Free InsightDeed Account</h3>

      {/* End .form-group */}

      <TabPanel>{/* <Form /> */}</TabPanel>
      {/* End user Form */}

      {/* End form-group */}

      <div className="bottom-box">
        <div className="text">
          Already have an account?{" "}
          <Link
            to="#"
            className="call-modal login"
            data-bs-toggle="modal"
            data-bs-dismiss="modal"
            data-bs-target="#loginPopupModal"
          >
            LogIn
          </Link>
        </div>
        <div className="divider">
          <span>or</span>
        </div>
        {/* <LoginWithSocial /> */}
      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default Register;
