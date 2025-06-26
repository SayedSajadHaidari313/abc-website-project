import MetaComponent from "@/components/common/MetaComponent";
import Forgot from "@/components/pages-menu/forgot-password";

const metadata = {
  title: "ForgotPassword || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const ForgotPasswordPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <Forgot />
    </>
  );
};

export default ForgotPasswordPage;
