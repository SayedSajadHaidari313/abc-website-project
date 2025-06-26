import { Link } from "react-router-dom";
import { useGetCompaniesData } from "@/queries/get.companies.data.query";
import PropTypes from "prop-types";
import { Avatar } from "antd";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const RelatedJobs = ({ currentCompanyId }) => {
  const { data: companyData, isLoading, isError } = useGetCompaniesData();

  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error loading data</div>;

  // پیدا کردن شرکت مشخص‌شده
  const company = companyData?.data?.find(
    (val) => val?.id === currentCompanyId
  );

  // بررسی اینکه شرکت وجود دارد و حداقل یک job دارد
  if (!company || !company.post_jobs || company.post_jobs.length === 0) {
    return null; // هیچ چیز نمایش داده نشود
  }

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/${path.replace(/\\/g, "/")}`;
  };

  return (
    <>
      {company.post_jobs.map((job) => (
        <div className="job-block" key={job.id}>
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                <Avatar
                  size={64}
                  src={
                    company?.company_photo
                      ? formatImageUrl(company.company_photo)
                      : null
                  }
                  alt={company?.company_name}
                >
                  {!company?.company_photo && company?.company_name
                    ? company.company_name.charAt(0).toUpperCase()
                    : ""}
                </Avatar>
              </span>
              <h4>
                <Link to={`/job-details/${job.id}`}>{job?.job_title}</Link>
              </h4>

              <ul className="job-info">
                <li>
                  <span className="icon flaticon-briefcase"></span>
                  {company?.name}
                </li>
                <li>
                  <span className="icon flaticon-map-locator"></span>
                  {job.provinces}, {job.countries}
                </li>
                <li>
                  <span className="icon flaticon-clock-3"></span>
                  {job?.created_at &&
                    new Date(job.created_at).toLocaleDateString()}
                </li>
                <li>
                  <span className="icon flaticon-money"></span>
                  {job?.salary_range}
                </li>
              </ul>

              <ul className="job-other-info">
                <li className={`job-tag ${job?.styleClass}`}>
                  {job?.job_type
                    ?.replace("_", " ")
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </li>
              </ul>

              <button className="bookmark-btn">
                <span className="flaticon-bookmark"></span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

RelatedJobs.propTypes = {
  currentCompanyId: PropTypes.string,
};

export default RelatedJobs;
