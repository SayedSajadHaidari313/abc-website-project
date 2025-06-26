import { getRequest } from "@/auth/FetchInterceptor";
import { useQuery } from "@tanstack/react-query";

export const getUserTagsData = async () => {
  return await getRequest(`get_insight_tag`);
};

export const useGetUsersTagData = () => {
  return useQuery({
    queryKey: ["fetch-jobseeker-insight_tag"],
    queryFn: getUserTagsData
  });
};