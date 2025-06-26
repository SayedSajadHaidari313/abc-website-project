import {
  deleteRequest,
  getRequest,
  postRequest,
} from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get InsightTags Query

// export const getInsightTagsData = async (
//   current,
//   pageSize,
//   searchQuery,
// ) => {
//   return await getRequest(`jobseeker/insight_tag`, {
//     current: current,
//     pageSize: pageSize,
//     searchQuery: searchQuery,
//   });
// };

// export const useGetInsightTagsData = (current, pageSize, searchQuery) => {
//   return useQuery({
//     queryKey: ["fetch-jobseeker-insight_tag", current, pageSize, searchQuery],
//     queryFn: () => getInsightTagsData(current, pageSize, searchQuery),
//   });
// };

export const getInsightTagsData = async () => {
  return await getRequest("get_insight_tag");
};

export const useGetInsightTagsData = () => {
  return useQuery({
    queryKey: ["fetch-apply-job"],
    queryFn: getInsightTagsData,
  });
};

// Get InsightTagsCategories Query

// Create InsightTags Query

export const InsightTagsPostCreate = (params) => {
  return postRequest(`jobseeker/insight_tag`, params);
};

export const usePostInsightTagsCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => InsightTagsPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-insight_tags"]);
    },
  });
};

// Update InsightTags Query
export const updateInsightTags = async (params) => {
  return postRequest(`jobseeker/insight_tag/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateInsightTags = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateInsightTags(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-insight_tags"]);
    },
  });
};

// Function to delete multiple InsightTags
export const DeleteInsightTags = async (ids) => {
  return deleteRequest(`jobseeker/insight_tag/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple InsightTags
export const useDeleteInsightTags = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteInsightTags(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-insight_tags"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`jobseeker/insight_tag/${id}`, {
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
      queryClient.invalidateQueries(["fetch-insight_tags"]);
    },
  });
};
