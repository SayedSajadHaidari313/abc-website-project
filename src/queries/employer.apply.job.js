import { getRequest } from "@/auth/FetchInterceptor";
import { useQuery } from "@tanstack/react-query";

export const getEmployerApplyJobData = async (postJobId) => {
  return await getRequest(`employer/count_apply_jobs/${postJobId}`);
};

export const useGetEmployerApplyJobData = (postJobId) => {
  return useQuery({
    queryKey: ["fetch-employer-apply-job", postJobId],
    queryFn: () => getEmployerApplyJobData(postJobId),
    enabled: !!postJobId,
  });
};


export const getShowJobSeekerApplyJobData = async (id) => {
  return await getRequest(`employer/apply-jobs/${id}`);
};

export const useGetShowJobSeekerApplyJobData = (id) => {
  return useQuery({
    queryKey: ["fetch-employer-apply-job", id],
    queryFn: () => getShowJobSeekerApplyJobData(id),
    enabled: !!id,
  });
};

