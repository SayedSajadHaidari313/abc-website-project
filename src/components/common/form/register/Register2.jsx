import FormContent2 from "./FormContent2";
import { Link } from "react-router-dom";
import LoginWithSocial from "./LoginWithSocial";

const Register2 = () => {
  return (
    <div className="form-inner">
      <h3>Create Your Business Account</h3>
      <FormContent2 />
      {/* End Employer Form */}
      <div className="bottom-box">
        <div className="text">
          Already have an account?{" "}
          <Link to="/login" className="call-modal login">
            LogIn
          </Link>
        </div>
        <div className="divider">
          <span>or</span>
        </div>
        <LoginWithSocial />
      </div>
    </div>
  );
};

export default Register2;
