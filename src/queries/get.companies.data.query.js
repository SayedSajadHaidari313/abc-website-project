import { getRequest } from "@/auth/FetchInterceptor";
import { useQuery } from "@tanstack/react-query";

// تابع ساده بدون پارامتر
export const getCompaniesData = async () => {
    return await getRequest("get_companies_data");
  };
  
  // هوک استفاده از کوئری
  export const useGetCompaniesData = () => {
    return useQuery({
      queryKey: ["fetch-companies-data"],
      queryFn: getCompaniesData,
    });
  };