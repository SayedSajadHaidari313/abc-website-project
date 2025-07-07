import { useGetAllItemsData } from "@/queries/website.query/items.query";
import { Alert, Skeleton } from "antd";
import PropTypes from "prop-types";
const CompanyInfo = ({ currentCompanyId }) => {
  const { data: companyData, isLoading, isError } = useGetAllItemsData();
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
        User Name:{" "}
        <span>
          {companyinfo[0]?.user.name
            ?.toLowerCase()
            .replace(/_/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </span>
      </li>

      <li>
        Email Address: <span>{companyinfo[0]?.user?.email}</span>
      </li>
      <li>
        User About: <span>{companyinfo[0]?.user?.user_about}</span>
      </li>

      <li>
        Location: <span>{companyinfo[0]?.item_address}</span>
      </li>
    </ul>
  );
};

CompanyInfo.propTypes = {
  currentCompanyId: PropTypes.number.isRequired,
};

export default CompanyInfo;
