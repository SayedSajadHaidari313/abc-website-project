import { useGetCompaniesData } from "@/queries/get.companies.data.query";
import { Alert, Skeleton } from "antd";
import PropTypes from "prop-types";
const CompanyInfo = ({ currentCompanyId }) => {
  const { data: companyData, isLoading, isError } = useGetCompaniesData();
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

  const companyinfo = companyData?.data?.filter(
    (val) => val?.id === currentCompanyId
  );

  return (
    <ul className="company-info">
      <li>
        Primary industry:{" "}
        <span>
          {companyinfo[0]?.company_type
            ?.toLowerCase()
            .replace(/_/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </span>
      </li>

      <li>
        Founded in: <span>{companyinfo[0]?.stablished_in}</span>
      </li>
      <li>
        Email: <span>{companyinfo[0]?.email}</span>
      </li>

      <li>
        Location: <span>{companyinfo[0]?.location}</span>
      </li>
    </ul>
  );
};

CompanyInfo.propTypes = {
  currentCompanyId: PropTypes.number.isRequired,
};

export default CompanyInfo;
