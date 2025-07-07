import ChangePassword from "@/components/dashboard-pages/employers-dashboard/change-password";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Change Password || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const ChangePasswordEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ChangePassword />
    </>
  );
};

export default ChangePasswordEmploeeDBPage;
