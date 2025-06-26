import { getRequest } from "@/auth/FetchInterceptor";
import { useQuery } from "@tanstack/react-query";

// تابع ساده بدون پارامتر
export const getSettingData = async () => {
  return await getRequest("terms");
};

// هوک استفاده از کوئری
export const useGettermsData = () => {
  return useQuery({
    queryKey: ["fetch-Terms"],
    queryFn: getSettingData,
  });
};
