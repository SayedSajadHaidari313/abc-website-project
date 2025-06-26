
// Get post_jobs Query

import { deleteRequest, getRequest, postRequest } from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getPostJobData = async (
  current,
  pageSize,
  searchQuery,
) => {
  return await getRequest(`employer/post_jobs`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetPostJobData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-employer-post_jobs", current, pageSize, searchQuery],
    queryFn: () => getPostJobData(current, pageSize, searchQuery),
  });
};
// Get post_jobsCategories Query


// Create post_jobs Query

export const PostJobPostCreate = (params) => {
  return postRequest(`employer/post_jobs`, params);
};

export const usePostPostJobCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => PostJobPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-post_jobs"]);
    },
  });
};

// Update post_jobs Query
export const updatePostJob = async (params) => {
  return postRequest(`employer/post_jobs/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdatePostJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updatePostJob(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-post_jobs"]);
    },
  });
};

// Function to delete multiple post_jobs
export const DeletePostJob = async (ids) => {
  return deleteRequest(`employer/post_jobs/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple post_jobs
export const useDeletePostJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeletePostJob(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-post_jobs"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`employer/post_jobs/${id}`, {
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
      queryClient.invalidateQueries(["fetch-post_jobs"]);
    },
  });
};


export const getCompanyNameData = async () => {
  return await getRequest("employer/get_employer_company");
};

export const useGetCompanyNameData = () => {
  return useQuery({
    queryKey: ["fetch-company-dashboard-data"],
    queryFn: getCompanyNameData,
  });
};