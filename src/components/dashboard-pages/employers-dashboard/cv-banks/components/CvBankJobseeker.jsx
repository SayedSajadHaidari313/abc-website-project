import { useState, useMemo } from "react";
import {
  Skeleton,
  Alert,
  Pagination,
  Button,
  Tooltip,
  Input,
  Select,
  Modal,
  Avatar,
} from "antd";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
import { useGetCVBankData } from "@/queries/cv.bank.jobseeker.query";
import NoJobseekersResult from "./NoJobseekersResult";

const { Option } = Select;

const CvBankJobseeker = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [genderFilter, setGenderFilter] = useState(null);
  const [experienceFilter, setExperienceFilter] = useState(null);

  const pageSize = 4;
  const { data, isLoading, isError } = useGetCVBankData();

  const jobseekers = data?.jobSeekrs?.data || [];

  const filteredJobseekers = useMemo(() => {
    return jobseekers.filter((j) => {
      // Search term matching
      const searchTermMatch = searchTerm
        ? `${j?.user?.first_name || ""} ${j?.user?.last_name || ""} ${
            j?.user?.email || ""
          }`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : true;

      // Category filter matching
      const categoryMatch = categoryFilter
        ? j?.job_category?.name === categoryFilter
        : true;

      // Gender filter matching
      const genderMatch = genderFilter
        ? j?.gender?.toUpperCase() === genderFilter.toUpperCase()
        : true;

      // Experience filter matching
      const experienceMatch = experienceFilter
        ? j?.experience?.toString() === experienceFilter
        : true;

      return searchTermMatch && categoryMatch && genderMatch && experienceMatch;
    });
  }, [jobseekers, searchTerm, categoryFilter, genderFilter, experienceFilter]);

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}${path.replace(/\\/g, "/")}`;
  };

  const formatCVUrl = (cv) => {
    if (!cv) return null;
    return `${BASE_IMAGE_URL}${cv.replace(/\\/g, "/")}`;
  };

  const renderJobseekerCard = (jobseeker) => (
    <div
      className="candidate-block-three col-lg-6 col-md-12 col-sm-12 mt-20"
      key={jobseeker.id}
    >
      <div className="inner-box">
        <div className="flex flex-col items-center">
          {/* Photo and Name Section */}
          <div className="text-center mb-4">
            <Avatar
              src={
                jobseeker?.user?.photo
                  ? formatImageUrl(jobseeker.user.photo)
                  : null
              }
              size={80}
              style={{ backgroundColor: "#ccc", marginBottom: 12 }}
            >
              {!jobseeker?.user?.photo &&
                jobseeker?.user?.first_name?.charAt(0).toUpperCase()}
            </Avatar>
            <h4 className="name text-lg font-semibold">
              {jobseeker?.user?.first_name} {jobseeker?.user?.last_name}
            </h4>
            <div className="text-blue-600 font-medium mt-1">
              {jobseeker?.job_category?.name || "Unknown Category"}
            </div>
          </div>

          {/* Information Section */}
          <div className="w-full">
            <ul className="candidate-info space-y-2">
              <li className="flex items-center gap-2">
                <span className="font-medium">Email:</span>
                <span>
                  <strong>{jobseeker?.user?.email || "Unknown Email"}</strong>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium">Experience:</span>
                <span>
                  <strong>{jobseeker.experience}</strong>{" "}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium">Gender:</span>
                <span>
                  <strong>{jobseeker.gender}</strong>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-medium">Phone:</span>
                <span>
                  <strong>{jobseeker?.user?.phone}</strong>
                </span>
              </li>
            </ul>

            {/* Download CV Button */}
            {jobseeker.cv && (
              <div className="mt-4 text-center">
                <a
                  href={formatCVUrl(jobseeker.cv)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button type="primary" icon={<DownloadOutlined />}>
                    Download CV
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaginatedList = (list) => {
    if (!list || list.length === 0) {
      return <NoJobseekersResult />;
    } else {
      const startIndex = (currentPage - 1) * pageSize;
      const paginated = list.slice(startIndex, startIndex + pageSize);

      return (
        <>
          <div className="row">{paginated.map(renderJobseekerCard)}</div>
          {list.length > pageSize && (
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={list.length}
              onChange={(page) => setCurrentPage(page)}
              className="mt-6 text-center"
            />
          )}
        </>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} avatar paragraph={{ rows: 4 }} active />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        message="Data Fetching Error"
        description="Please try again."
        type="error"
        showIcon
      />
    );
  }

  // Get unique categories and experiences for filters
  const uniqueCategories = [
    ...new Set(jobseekers.map((j) => j.job_category?.name).filter(Boolean)),
  ];
  const uniqueExperiences = [
    ...new Set(jobseekers.map((j) => j.experience).filter(Boolean)),
  ];

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <h3 className="text-xl font-semibold mb-4">
          {/* Available Cv Banks ({filteredJobseekers.length}) */}
        </h3>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Input.Search
            size="large"
            allowClear
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            style={{ width: 240, marginRight: 8, marginBottom: 8 }}
          />
          <Select
            size="large"
            allowClear
            placeholder="Filter by category"
            value={categoryFilter}
            onChange={(value) => {
              setCategoryFilter(value);
              setCurrentPage(1);
            }}
            style={{ width: 180, marginRight: 8 }}
          >
            {uniqueCategories.map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
          <Select
            size="large"
            allowClear
            placeholder="Filter by gender"
            value={genderFilter}
            onChange={(value) => {
              setGenderFilter(value);
              setCurrentPage(1);
            }}
            style={{ width: 140, marginRight: 8 }}
          >
            <Option value="MALE">Male</Option>
            <Option value="FEMALE">Female</Option>
          </Select>
          <Select
            size="large"
            allowClear
            placeholder="Filter by experience"
            value={experienceFilter}
            onChange={(value) => {
              setExperienceFilter(value);
              setCurrentPage(1);
            }}
            style={{ width: 180 }}
          >
            {uniqueExperiences.map((exp) => (
              <Option key={exp} value={exp.toString()}>
                {exp} years
              </Option>
            ))}
          </Select>
        </div>

        {renderPaginatedList(filteredJobseekers)}
      </div>
    </div>
  );
};

export default CvBankJobseeker;
