import { deleteRequest, getRequest, postRequest } from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Get InsightVote Query

export const getInsightVoteData = async (
  current,
  pageSize,
  searchQuery,
) => {
  return await getRequest(`insight_vote`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetInsightVoteData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-jobseeker-insightVote", current, pageSize, searchQuery],
    queryFn: () => getInsightVoteData(current, pageSize, searchQuery),
  });
};
// Get InsightVoteCategories Query

// Create InsightVote Query

export const InsightVotePostCreate = (params) => {
  return postRequest(`insight_vote`, params);
};

export const usePostInsightVoteCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => InsightVotePostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-all-insightVote"]);
    },
  });
};

// Update InsightVote Query
export const updateInsightVote = async (params) => {
  return postRequest(`insight_vote/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateInsightVote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateInsightVote(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-InsightVote"]);
    },
  });
};

// Function to delete multiple InsightVote
export const DeleteInsightVote = async (ids) => {
  return deleteRequest(`insight_vote/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple InsightVote
export const useDeleteInsightVote = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteInsightVote(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-InsightVote"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`insight_vote/${id}`, {
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
      queryClient.invalidateQueries(["fetch-InsightVote"]);
    },
  });
};
