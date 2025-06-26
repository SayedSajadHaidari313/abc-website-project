
// Get InsightTag Query

import { getRequest } from "@/auth/FetchInterceptor";
import { useQuery } from "@tanstack/react-query";

export const getInsightTagData = async (
  current,
  pageSize,
  searchQuery,
) => {
  return await getRequest(`jobseeker/insights/matching-tags`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetInsightTagData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-InsightTag", current, pageSize, searchQuery],
    queryFn: () => getInsightTagData(current, pageSize, searchQuery),
  });
};