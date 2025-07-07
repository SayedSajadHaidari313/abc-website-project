import MyProfile from "@/components/dashboard-pages/candidates-dashboard/my-profile";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Profile || ABC.AF - Directory Platform",
  description: "ABC.AF - Directory Platform",
};

const MyProfilePage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <MyProfile />
    </>
  );
};

export default MyProfilePage;
