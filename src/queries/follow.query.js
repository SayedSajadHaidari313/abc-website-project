import { deleteRequest, getRequest, postRequest } from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Get Follow Query

export const getFollowData = async (
  current,
  pageSize,
  searchQuery,
) => {
  return await getRequest(`jobseeker/insight_followers`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetFollowData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-jobseeker-Follow", current, pageSize, searchQuery],
    queryFn: () => getFollowData(current, pageSize, searchQuery),
  });
};
// Get FollowCategories Query

// Create Follow Query

export const FollowPostCreate = (params) => {
  return postRequest(`jobseeker/insight_followers`, params);
};

export const usePostFollowCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => FollowPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-all-Follow"]);
    },
  });
};

// Update Follow Query
export const updateFollow = async (params) => {
  return postRequest(`jobseeker/insight_followers/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateFollow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateFollow(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-Follow"]);
    },
  });
};

// Function to delete multiple Follow
export const DeleteFollow = async (ids) => {
  return deleteRequest(`jobseeker/insight_followers/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple Follow
export const useDeleteFollow = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteFollow(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-Follow"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`jobseeker/insight_followers/${id}`, {
    params: {
      id,
    },
  });
};
export const useSingleDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => singleDelete(params.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-Follow"]);
    },
  });
};
