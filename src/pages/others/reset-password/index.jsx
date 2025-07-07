import MetaComponent from "@/components/common/MetaComponent";
import Reset from "@/components/pages-menu/reset-password";

const metadata = {
  title: "ResetPassword || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
