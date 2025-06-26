import { deleteRequest, getRequest, postRequest } from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Get Insight Query

export const getInsightData = async (
  current,
  pageSize,
  searchQuery,
) => {
  return await getRequest(`jobseeker/insight`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetInsightData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-jobseeker-insight", current, pageSize, searchQuery],
    queryFn: () => getInsightData(current, pageSize, searchQuery),
  });
};

export const getAllInsightData = async (
  current,
  pageSize,
  searchQuery,
) => {
  return await getRequest(`get_insight`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetAllInsightData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-get_insight", current, pageSize, searchQuery],
    queryFn: () => getAllInsightData(current, pageSize, searchQuery),
  });
};

export const getInsightTrandData = async (
  current,
  pageSize,
  searchQuery,
) => {
  return await getRequest(`nsight-trend`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetInsightTrandData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-jobseeker-insight-trand", current, pageSize, searchQuery],
    queryFn: () => getInsightTrandData(current, pageSize, searchQuery),
  });
};
// Get InsightCategories Query

// Create Insight Query

export const InsightPostCreate = (params) => {
  return postRequest(`jobseeker/insight`, params);
};

export const usePostInsightCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => InsightPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-all-insight"]);
    },
  });
};

// Update Insight Query
export const updateInsight = async (params) => {
  return postRequest(`jobseeker/insight/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateInsight = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateInsight(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-Insight"]);
    },
  });
};

// Function to delete multiple Insight
export const DeleteInsight = async (ids) => {
  return deleteRequest(`jobseeker/insight/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple Insight
export const useDeleteInsight = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteInsight(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-Insight"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`jobseeker/insight/${id}`, {
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
      queryClient.invalidateQueries(["fetch-Insight"]);
    },
  });
};
