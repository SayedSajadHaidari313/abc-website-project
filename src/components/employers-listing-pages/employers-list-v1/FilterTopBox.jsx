import { Link } from "react-router-dom";
import ListingShowing from "../components/ListingShowing";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addDestination,
  addFoundationDate,
  addKeyword,
  addLocation,
  addPerPage,
  addSort,
} from "../../../features/filter/employerFilterSlice";
import { useGetCompaniesData } from "@/queries/get.companies.data.query";
import { Alert, Avatar, Skeleton } from "antd";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const FilterTopBox = () => {
  const {
    keyword,
    location,
    destination,
    category,
    foundationDate,
    sort,
    perPage,
  } = useSelector((state) => state.employerFilter) || {};
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetCompaniesData();
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
  const companies = data?.data;

  // --- Filter functions ---
  const keywordFilter = (item) => {
    if (!keyword) return true;
    const searchValue = keyword.toLowerCase();
    return [
      item?.name,
      item?.location,
      item?.JobType,
      item?.foundationDate?.toString(),
      item?.category?.toString(),
    ].some((field) => field?.toString().toLowerCase().includes(searchValue));
  };

  const locationFilter = (item) =>
    location !== ""
      ? item?.location?.toLowerCase().includes(location?.toLowerCase())
      : true;

  const destinationFilter = (item) =>
    item?.destination?.min >= destination?.min &&
    item?.destination?.max <= destination?.max;

  const categoryFilter = (item) =>
    category !== ""
      ? item?.category?.toLowerCase() === category?.toLowerCase()
      : true;

  const foundationDataFilter = (item) =>
    item?.foundationDate?.min >= foundationDate?.min &&
    item?.foundationDate?.max <= foundationDate?.max;

  const sortFilter = (a, b) => (sort === "des" ? b.id - a.id : a.id - b.id);

  // --- Filtering and Pagination ---
  const filteredCompanies = companies
    ?.filter(keywordFilter)
    ?.filter(locationFilter)
    ?.filter(destinationFilter)
    ?.filter(categoryFilter)
    ?.filter(foundationDataFilter)
    ?.sort(sortFilter);

  const totalFiltered = filteredCompanies?.length;

  const paginatedCompanies = filteredCompanies?.slice(
    perPage.start !== 0 ? perPage.start : 0,
    perPage.end !== 0 ? perPage.end : filteredCompanies?.length
  );

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/${path.replace(/\\/g, "/")}`;
  };

  // --- Render content ---
  const content = paginatedCompanies?.map((company) => (
    <div className="company-block-three" key={company.id}>
      <div className="inner-box">
        <div className="content">
          <div className="content-inner">
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
              <Link to={`/company-details/${company?.id}`}>{company.name}</Link>
            </h4>
            <ul className="job-info">
              <li>
                <span className="icon flaticon-map-locator"></span>{" "}
                {company.location}
              </li>
              <li>
                <span className="icon flaticon-briefcase"></span>{" "}
                {company.category}
              </li>
            </ul>
          </div>

          <ul className="job-other-info">
            {/* {company.isFeatured ? <li className="privacy">Promoted</li> : null} */}
            <li className="time">Open Jobs – {company.jobNumber}</li>
          </ul>
        </div>

        <button className="bookmark-btn">
          <span className="flaticon-bookmark"></span>
        </button>
      </div>
    </div>
  ));

  // --- Handlers ---
  const perPageHandler = (e) => {
    const pageData = JSON.parse(e.target.value);
    dispatch(addPerPage(pageData));
  };

  const sortHandler = (e) => {
    dispatch(addSort(e.target.value));
  };

  const showMoreHandler = () => {
    dispatch(addPerPage({ start: 0, end: 0 }));
  };

  const clearAll = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addDestination({ min: 0, max: 100 }));
    dispatch(addCategory(""));
    dispatch(addFoundationDate({ min: 1900, max: 2028 }));
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 0 }));
  };

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div className="ls-switcher">
        <div className="showing-result">
          <div className="text">
            Show <strong>{paginatedCompanies?.length}</strong> Companies
          </div>
        </div>

        <div className="sort-by">
          {(keyword !== "" ||
            location !== "" ||
            destination.min !== 0 ||
            destination.max !== 100 ||
            category !== "" ||
            foundationDate.min !== 1900 ||
            foundationDate.max !== 2028 ||
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

      {content}

      <ListingShowing
        total={totalFiltered}
        showing={paginatedCompanies?.length}
        onShowMore={showMoreHandler}
      />
    </>
  );
};

export default FilterTopBox;
