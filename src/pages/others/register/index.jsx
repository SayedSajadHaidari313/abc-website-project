import RegisterForm from "@/components/pages-menu/register";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Register || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const RegisterPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />

      <RegisterForm />
    </>
  );
};

export default RegisterPage;
