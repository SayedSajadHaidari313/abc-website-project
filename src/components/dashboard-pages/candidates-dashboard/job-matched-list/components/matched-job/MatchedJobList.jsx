import { Link } from "react-router-dom";
import moment from "moment";
import { Alert, Avatar, Skeleton } from "antd";
import { useGetPostJobsData } from "@/queries/post.jobs.query";
import { useGetAuthUserData } from "@/queries/user.query";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const MatchedJobList = () => {
  const { data, isLoading, isError } = useGetPostJobsData(); // دیتا از سرور

  const { data: userAuth } = useGetAuthUserData();
  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />;

  if (isError)
    return (
      <Alert
        message="Error fetching data"
        description="Please try again later."
        type="error"
        showIcon
      />
    );

  const sortedJobs = data?.data?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const matchedJobs = sortedJobs
    ?.filter(
      (job) =>
        job?.job_category_id ===
        userAuth?.user?.jobseekerprofiles?.job_category_id
    )
    ?.slice(0, 7);

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/${path.replace(/\\/g, "/")}`;
  };

  const getStyleClass = (jobType) => {
    switch (jobType) {
      case "full_time":
        return "full_time";
      case "part_time":
        return "part_time";
      case "freelance":
        return "freelance";
      case "internship":
        return "internship";
      case "remote":
        return "remote";
      default:
        return "other";
    }
  };

  let content = matchedJobs?.map((item) => (
    <div
      className="job-block col-lg-6 d-flex col-md-12 col-sm-12"
      key={item.id}
    >
      <div className="inner-box">
        <div className="content">
          <span className="company-logo">
            <Avatar
              size={64}
              src={
                item?.company?.company_photo
                  ? formatImageUrl(item.company?.company_photo)
                  : null
              }
              alt={item?.company?.name}
            >
              {!item?.company?.company_photo && item?.company?.name
                ? item?.company?.name.charAt(0).toUpperCase()
                : ""}
            </Avatar>
          </span>

          <h4>
            <Link to={`/job-details/${item?.id}`}>{item?.job_title}</Link>
          </h4>

          <ul className="job-info">
            <li>
              <span className="icon flaticon-briefcase"></span>
              {/* اینجا company_name اگر داری */}
              {item?.company?.company_name}
            </li>
            <li>
              <span className="icon flaticon-map-locator"></span>
              {item?.provinces},{item?.countries}
            </li>
            <li>
              <span className="icon flaticon-clock-3"></span>
              {moment(item?.created_at).fromNow()}
            </li>
            <li>
              <span className="icon flaticon-money"></span> {item.salary_range}
            </li>
          </ul>

          <ul className="job-other-info">
            <li className={`job-tag ${getStyleClass(item.job_type)}`}>
              {item.job_type
                ?.replace("_", " ")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="row">{content}</div>
      {/* End .row */}
    </>
  );
};

export default MatchedJobList;
