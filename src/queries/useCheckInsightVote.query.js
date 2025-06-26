

import { getRequest } from "@/auth/FetchInterceptor";
import { useQuery } from "@tanstack/react-query";

// Fetch vote data
export const getVoteData = async (insightId) => {
  return await getRequest(`jobseeker/insights/${insightId}/vote-status`);
};
export const useGetVoterData = (insightId, options = {}) => {
  return useQuery({
    queryKey: ["insight-vote-status", insightId],
    queryFn: () => getVoteData(insightId),
    enabled: !!insightId, 
    ...options,
  });
};
