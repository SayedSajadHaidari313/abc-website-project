import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRequest, getRequest, postRequest } from "auth/FetchInterceptor";

// Get InsightVotes Query

export const getInsightVotesData = async (
  current,
  pageSize,
  searchQuery,
) => {
  return await getRequest(`admin/insight_votes`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetInsightVotesData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-admin-insight_votes", current, pageSize, searchQuery],
    queryFn: () => getInsightVotesData(current, pageSize, searchQuery),
  });
};
// Get InsightVotesCategories Query


// Create InsightVotes Query

export const InsightVotesPostCreate = (params) => {
  return postRequest(`admin/insight_votes`, params);
};

export const usePostInsightVotesCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => InsightVotesPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-insight_votes"]);
    },
  });
};

// Update InsightVotes Query
export const updateInsightVotes = async (params) => {
  return postRequest(`admin/insight_votes/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateInsightVotes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateInsightVotes(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-insight_votes"]);
    },
  });
};

// Function to delete multiple InsightVotes
export const DeleteInsightVotes = async (ids) => {
  return deleteRequest(`admin/insight_votes/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple InsightVotes
export const useDeleteInsightVotes = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteInsightVotes(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-insight_votes"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`admin/insight_votes/${id}`, {
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
      queryClient.invalidateQueries(["fetch-insight_votes"]);
    },
  });
};
