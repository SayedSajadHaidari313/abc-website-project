import { getRequest } from "@/auth/FetchInterceptor";
import { useQuery } from "@tanstack/react-query";

// تابع ساده بدون پارامتر
export const getEducationLevelData = async () => {
    return await getRequest("get-education-level");
  };
  
  // هوک استفاده از کوئری
  export const useGetEducationLevelData = () => {
    return useQuery({
      queryKey: ["fetch-education-level"],
      queryFn: getEducationLevelData,
    });
  };