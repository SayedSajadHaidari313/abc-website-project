import MetaComponent from "@/components/common/MetaComponent";
import Forgot from "@/components/pages-menu/forgot-password";

const metadata = {
  title: "ForgotPassword || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
