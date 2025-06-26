import MyProfile from "@/components/dashboard-pages/candidates-dashboard/my-profile";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Profile || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
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
