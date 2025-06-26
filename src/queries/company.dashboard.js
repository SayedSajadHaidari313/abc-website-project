import { getRequest } from "@/auth/FetchInterceptor";
import { useQuery } from "@tanstack/react-query";

export const getCompanyDashboardData = async () => {
    return await getRequest("employer/company_dashboard");
  };
  
  export const useGetCompanyDashboardData = () => {
    return useQuery({
      queryKey: ["fetch-company-dashboard-data"],
      queryFn: getCompanyDashboardData,
    });
  };