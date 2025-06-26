import { getRequest } from "@/auth/FetchInterceptor";
import { useQuery } from "@tanstack/react-query";

// تابع ساده بدون پارامتر
export const getContractTypeData = async () => {
    return await getRequest("get-contract-type");
  };
  
  // هوک استفاده از کوئری
  export const useGetContractTypeData = () => {
    return useQuery({
      queryKey: ["fetch-get-contract-type"],
      queryFn: getContractTypeData,
    });
  };