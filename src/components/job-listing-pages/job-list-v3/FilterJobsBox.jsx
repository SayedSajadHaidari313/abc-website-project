import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addDatePosted,
  addDestination,
  addKeyword,
  addLocation,
  addPerPage,
  addSalary,
  addSort,
  addTag,
  clearExperience,
  clearJobType,
} from "../../../features/filter/filterSlice";
import {
  clearDatePostToggle,
  clearExperienceToggle,
  clearJobTypeToggle,
} from "../../../features/job/jobSlice";
import { useGetPostJobsData } from "@/queries/post.jobs.query";
import moment from "moment";
import { Alert, Avatar, Skeleton } from "antd";
import Pagination from "../components/Pagination";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const FilterJobsBox = () => {
  const { data, isLoading, isError } = useGetPostJobsData(); // دیتا از سرور

  const dispatch = useDispatch();

  const { jobList, jobSort } = useSelector((state) => state.filter);
  const {
    keyword,
    location,
    destination,
    category,
    jobType,
    datePosted,
    experience,
    // salary,
    // tag,
  } = jobList || {};

  const { sort, perPage } = jobSort;

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

    const jobs = data?.data?.filter(
      (job) => job.job_status === "active" || job.job_status === "promoted"
    );

  const keywordFilter = (item) => {
    if (keyword === "") return true;

    const jobTitle = item.job_title?.toLocaleLowerCase() || "";
    const companyName = item.company?.company_name?.toLocaleLowerCase() || "";
    const searchKeyword = keyword.toLocaleLowerCase();

    return (
      jobTitle.includes(searchKeyword) || companyName.includes(searchKeyword)
    );
  };

  const locationFilter = (item) => {
    if (location === "") return true;

    const provinces = item.provinces?.toLocaleLowerCase() || "";
    const countries = item.countries?.toLocaleLowerCase() || "";
    const searchLocation = location.toLocaleLowerCase();

    return (
      provinces.includes(searchLocation) || countries.includes(searchLocation)
    );
  };

  const destinationFilter = () => true; // دیتا فعلا destination نداره، بعدا اضافه کن

  const categoryFilter = (item) =>
    category !== ""
      ? item?.job_category_id?.toString() === category?.toString()
      : item;

  const jobTypeFilter = (item) =>
    jobType?.length !== 0 && item?.job_type !== undefined
      ? jobType?.includes(
          item?.job_type?.toLocaleLowerCase().split(" ").join("-")
        )
      : item;

  const datePostedFilter = (item) =>
    datePosted !== "all" && datePosted !== ""
      ? item?.post_date?.toLocaleLowerCase().includes(datePosted)
      : item;

  const experienceFilter = (item) =>
    experience?.length !== 0
      ? experience?.includes(item?.experiance?.toLocaleLowerCase())
      : item;

  const salaryFilter = () => true; // دیتا salary_range داره ولی باید min/max داشته باشه که اینجا فیلتر کنیم، بعدا اصلاح کن

  const tagFilter = () => true; // دیتا فعلا tag نداره، بعدا اضافه کن

  const sortFilter = (a, b) => (sort === "des" ? b.id - a.id : a.id - b.id);

  // --- Filtering and Pagination ---
  const filteredCompanies = jobs
    ?.filter(keywordFilter)
    ?.filter(locationFilter)
    ?.filter(destinationFilter)
    ?.filter(categoryFilter)
    ?.sort(sortFilter);

  const paginatedCompanies = filteredCompanies?.slice(
    perPage.start !== 0 ? perPage.start : 0,
    perPage.end !== 0 ? perPage.end : filteredCompanies?.length
  );

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

  let content = jobs
    ?.filter(keywordFilter)
    ?.filter(locationFilter)
    ?.filter(destinationFilter)
    ?.filter(categoryFilter)
    ?.filter(jobTypeFilter)
    ?.filter(datePostedFilter)
    ?.filter(experienceFilter)
    ?.filter(salaryFilter)
    ?.filter(tagFilter)
    ?.sort(sortFilter)
    .slice(perPage.start, perPage.end !== 0 ? perPage.end : 18)
    ?.map((item) => (
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
                alt="Company Logo"
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
                <span className="icon flaticon-money"></span>{" "}
                {item.salary_range}
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

  const sortHandler = (e) => {
    dispatch(addSort(e.target.value));
  };

  const perPageHandler = (e) => {
    const pageData = JSON.parse(e.target.value);
    dispatch(addPerPage(pageData));
  };

  const clearAll = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addDestination({ min: 0, max: 100 }));
    dispatch(addCategory(""));
    dispatch(clearJobType());
    dispatch(clearJobTypeToggle());
    dispatch(addDatePosted(""));
    dispatch(clearDatePostToggle());
    dispatch(clearExperience());
    dispatch(clearExperienceToggle());
    dispatch(addSalary({ min: 0, max: 20000 }));
    dispatch(addTag(""));
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 0 }));
  };

  return (
    <>
      <div className="ls-switcher">
        <div className="showing-result">
          <div className="text">
            Show <strong>{paginatedCompanies?.length}</strong> Jobs
          </div>
        </div>

        <div className="sort-by">
          {(keyword !== "" ||
            location !== "" ||
            destination.min !== 0 ||
            destination.max !== 100 ||
            category !== "" ||
            sort !== "" ||
            perPage.start !== 0 ||
            perPage.end !== 0) && (
            <button
              onClick={clearAll}
              className="btn btn-danger text-nowrap me-2"
              style={{
                minHeight: "45px",
                marginBottom: "15px",
              }}
            >
              Clear All
            </button>
          )}

          <select
            value={sort}
            className="chosen-single form-select"
            onChange={sortHandler}
          >
            <option value="">Sort by (default)</option>
            <option value="des">Newest</option>
            <option value="asc">Oldest</option>
          </select>

          <select
            onChange={perPageHandler}
            className="chosen-single form-select ms-3"
            value={JSON.stringify(perPage)}
          >
            <option value={JSON.stringify({ start: 0, end: 0 })}>All</option>
            <option value={JSON.stringify({ start: 0, end: 5 })}>
              5 per page
            </option>
            <option value={JSON.stringify({ start: 0, end: 10 })}>
              10 per page
            </option>
            <option value={JSON.stringify({ start: 0, end: 20 })}>
              20 per page
            </option>
          </select>
        </div>
      </div>

      <div className="row">{content}</div>
      {/* End .row */}

      <Pagination
        totalItems={filteredCompanies?.length}
        itemsPerPage={perPage.end - perPage.start}
        currentPage={
          Math.floor(perPage.start / (perPage.end - perPage.start)) + 1
        }
        onPageChange={(page) => {
          const start = (page - 1) * (perPage.end - perPage.start);
          const end = start + (perPage.end - perPage.start);
          dispatch(addPerPage({ start, end }));
        }}
      />

      {/* <!-- Pagination --> */}
    </>
  );
};

export default FilterJobsBox;
