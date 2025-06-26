import {  getRequest} from "@/auth/FetchInterceptor";
import { useQuery } from "@tanstack/react-query"

// Get Insight Query

export const getMatchedInsightData = async (
  current,
  pageSize,
  searchQuery,
) => {
  return await getRequest(`jobseeker/onlymatchedInsights`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetMatchedInsightData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-Matched-insight", current, pageSize, searchQuery],
    queryFn: () => getInsightData(current, pageSize, searchQuery),
  });
};

