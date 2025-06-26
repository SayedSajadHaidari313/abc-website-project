import { getRequest } from "@/auth/FetchInterceptor";
import { useQuery } from "@tanstack/react-query";

export const getCVBankData = async (current, pageSize, searchQuery) => {
  return await getRequest(`employer/cv-bank`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetCVBankData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-cv-bank", current, pageSize, searchQuery],
    queryFn: () => getCVBankData(current, pageSize, searchQuery),
  });
};