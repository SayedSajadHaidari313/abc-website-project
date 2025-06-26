import { getRequest, postRequest } from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getInsightBookMarkData = async () => {
    return await getRequest("/insight-bookmark");
  };
  
  export const useGetInsightBookMarkData = () => {
    return useQuery({
      queryKey: ["fetch-get-insight-bookmark"],
      queryFn: getInsightBookMarkData,
    });
  };

  
  export const InsightBookMarkCreate = (params) => {
    return postRequest(`jobseeker/insight-bookmark`, params);
  };
  
  export const usePostInsightBookMarkCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (params) => InsightBookMarkCreate(params),
      onSuccess: () => {
queryClient.invalidateQueries(["fetch-get-insight-bookmark"]);
      },
    });
  };
  
  