import LogIn from "@/components/pages-menu/login";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Login || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
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
