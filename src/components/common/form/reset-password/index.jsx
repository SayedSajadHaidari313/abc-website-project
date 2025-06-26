import { Link } from "react-router-dom";
import FromContent4 from "./FromContent4";

const ResetPassword = () => {
  return (
    <div className="form-inner">
      <h3>Reset Password </h3>
      <FromContent4 />
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

export default ResetPassword;
