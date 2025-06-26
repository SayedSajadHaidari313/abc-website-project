

import { postRequest } from "@/auth/FetchInterceptor";
import { useQuery } from "@tanstack/react-query";

// Fetch vote data
export const checkBookmarkStatus = async (insightId) => {
  return await postRequest(`jobseeker/insight/bookmark/check`,{
    insight_id: insightId,
  });
};
export const useCheckBookmarkStatus  = (insightId, options = {}) => {
  return useQuery({
    queryKey: ["bookmark-status", insightId],
    queryFn: () => checkBookmarkStatus(insightId),
    enabled: !!insightId, 
    ...options,
  });
};
