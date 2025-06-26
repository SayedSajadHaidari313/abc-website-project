import { getRequest, postRequest } from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getUsersData = async (
    current,
    pageSize,
    searchQuery,
  ) => {
    return await getRequest(`employer/users`, {
      current: current,
      pageSize: pageSize,
      searchQuery: searchQuery,
    });
  };
  
  export const useGetUserData = (current, pageSize, searchQuery) => {
    return useQuery({
      queryKey: ["fetch-employer-users", current, pageSize, searchQuery],
      queryFn: () => getUsersData(current, pageSize, searchQuery),
    });
  };

export const updateEmployer = async (params) => {
    return postRequest(`employer/companies/${params.get("id")}`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  
  export const useUpdateEmployer = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (params) => updateEmployer(params),
      onSuccess: () => {
        queryClient.invalidateQueries(["update-employer"]);
      },
    });
  };