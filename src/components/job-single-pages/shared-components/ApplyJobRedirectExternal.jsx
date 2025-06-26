import { useEffect } from "react";
import PropTypes from "prop-types";

const ApplyJobRedirectExternal = ({ applyOnlineLink }) => {
  useEffect(() => {
    if (applyOnlineLink) {
      window.location.href = applyOnlineLink;
    }
  }, [applyOnlineLink]);

  return (
    <div className="text-center p-4">
      <p>Redirecting to external application link...</p>
    </div>
  );
};

ApplyJobRedirectExternal.propTypes = {
  applyOnlineLink: PropTypes.string.isRequired,
};

export default ApplyJobRedirectExternal;
