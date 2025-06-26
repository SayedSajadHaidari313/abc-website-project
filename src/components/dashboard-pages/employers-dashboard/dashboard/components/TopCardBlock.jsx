import { useAuthStore } from "@/auth/auth.store";
import { useGetCompanyDashboardData } from "@/queries/company.dashboard";

const TopCardBlock = () => {
  const { data } = useGetCompanyDashboardData();
  const { user } = useAuthStore();

  if (!data || !data.company) return null;

const userCompany = data?.company?.find((comp) => comp.user_id === user?.id);
const companyBalance = userCompany?.balance?.credit || 0;
  const cardContent = [
    {
      id: 1,
      icon: "flaticon-briefcase",
      countNumber: data?.jobs_posted,
      metaName: "Posted Jobs",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "la-file-invoice",
      countNumber: data?.total_applications,
      metaName: "All Applications",
      uiClass: "ui-lightblue",
    },
    {
      id: 3,
      icon: "la-check-circle",
      countNumber: data?.shortlisted_applications,
      metaName: "Shortlisted",
      uiClass: "ui-green",
    },
    {
      id: 4,
      icon: "la-hourglass-half",
      countNumber: data?.pending_applications,
      metaName: "Pending",
      uiClass: "ui-yellow",
    },
    {
      id: 5,
      icon: "la-thumbs-up",
      countNumber: data?.accepted_applications,
      metaName: "Accepted",
      uiClass: "ui-primary",
    },
    {
      id: 6,
      icon: "la-thumbs-down",
      countNumber: data?.rejected_applications,
      metaName: "Rejected",
      uiClass: "ui-red",
    },
  ];
  // const isSameCompanyUser = user?.id === data?.company?.user_id;

  return (
    <>
      {cardContent.map((item) => (
        <div
          className="ui-block col-xl-4 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className={`ui-item ${item.uiClass}`}>
            <div className="left">
              <i className={`icon la ${item.icon}`}></i>
            </div>
            <div className="right">
              <h4>{item.countNumber}</h4>
              <p>{item.metaName}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="ui-block col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div className="ui-item ui-purple">
          <div className="left">
            <i className="icon la la-gift"></i>
          </div>
          <div className="right text-center">
            <p style={{ fontSize: "20px" }}>
              You currently have a free trial packages available.
              <span style={{ display: "block", height: "12px" }}></span>
              Each job post costs 15 credits.
            </p>
          </div>
          <h4>{companyBalance}</h4>
        </div>
      </div>
    </>
  );
};

export default TopCardBlock;
