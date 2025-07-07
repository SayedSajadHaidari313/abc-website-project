import { useGetAuthUserData } from "@/queries/user.query";
import { Tag, Progress } from "antd";
import { useGetMyRfpsData } from "@/queries/website.query/rfps.query";
import { useAuthStore } from "@/auth/auth.store";

const TopCardBlock = () => {
  const { data: userData } = useGetAuthUserData();
  const { user } = useAuthStore();
  // Fetch all RFPs for this user (first page, large pageSize to get all)
  const { data: rfpsData } = useGetMyRfpsData(1, 1000, null);
  const userRfps = (rfpsData?.data || []).filter(
    (rfp) => rfp.user_id === user?.id
  );

  // Profile completion logic (from ProfileCompletionCard)
  const userProfile = userData?.user || {};
  const fieldsToCheck = [
    userProfile.first_name,
    userProfile.last_name,
    userProfile.email,
    userProfile.phone,
    userProfile.photo,
    userProfile.jobseekerprofiles?.experience,
    userProfile.jobseekerprofiles?.gender,
    userProfile.jobseekerprofiles?.about,
    userProfile.jobseekerprofiles?.job_category?.name,
    userProfile.jobseekerprofiles?.cv,
  ];
  const completedFields = fieldsToCheck.filter(
    (v) => v && v.trim() !== ""
  ).length;
  const profileCompletion = Math.round(
    (completedFields / fieldsToCheck.length) * 100
  );

  const cardData = [
    {
      id: 1,
      icon: "la-file-archive-o",
      countNumber: userRfps.length,
      metaName: "RFPs Shared",
    },
    {
      id: 2,
      icon: "la-user",
      countNumber: `${profileCompletion}%`,
      metaName: "Profile Complete",
      extra: (
        <Progress
          percent={profileCompletion}
          status={profileCompletion === 100 ? "success" : "active"}
          strokeColor="#52c41a"
          size="small"
        />
      ),
    },
  ];

  return (
    <>
      {cardData.map((item) => (
        <div
          className="ui-block col-xl-6 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className="ui-item">
            <div className="left">
              <i className={`icon la ${item.icon}`}></i>
            </div>
            <div className="right">
              <h4>{item.countNumber}</h4>
              <p>{item.metaName}</p>
              {item.extra && <div className="mt-2">{item.extra}</div>}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;
