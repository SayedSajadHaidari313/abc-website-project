import { useGetCompaniesData } from "@/queries/get.companies.data.query";
import PropTypes from "prop-types";


const JobDetailsDescriptions = ({currentCompanyId}) => {
  const { data: companyData, isLoading, isError } = useGetCompaniesData();
  if (isLoading) return <div>Loading ...</div>;
  if (isError) return <div>Error loading data</div>;
  
  
  const companyinfo = companyData?.data?.filter(
    (val) => val?.id === currentCompanyId
  );
  return (
    <div className="job-detail">
      <h4>About {companyinfo[0]?.name}</h4>
      <p>
      {companyinfo[0]?.description}
      </p>
    </div>
  );
};

JobDetailsDescriptions.propTypes = {
  currentCompanyId: PropTypes.number.isRequired,
}

export default JobDetailsDescriptions;
