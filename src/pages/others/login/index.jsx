import LogIn from "@/components/pages-menu/login";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Login || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

const LoginPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <LogIn />
    </>
  );
};

export default LoginPage;
