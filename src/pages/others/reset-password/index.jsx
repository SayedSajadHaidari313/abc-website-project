import MetaComponent from "@/components/common/MetaComponent";
import Reset from "@/components/pages-menu/reset-password";

const metadata = {
  title: "ResetPassword || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const ResetPasswordPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <Reset />
    </>
  );
};

export default ResetPasswordPage;
