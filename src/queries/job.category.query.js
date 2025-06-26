import { deleteRequest, getRequest, postRequest } from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get JobCategory Query

export const getJobCategoryData = async (
  current,
  pageSize,
  searchQuery,
) => {
  return await getRequest(`job-category`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetJobCategoryData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-admin-job-categories", current, pageSize, searchQuery],
    queryFn: () => getJobCategoryData(current, pageSize, searchQuery),
  });
};
// Get JobCategoryCategories Query


// Create JobCategory Query

export const JobCategoryPostCreate = (params) => {
  return postRequest(`job-category`, params);
};

export const usePostJobCategoryCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => JobCategoryPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-job-categories"]);
    },
  });
};

// Update JobCategory Query
export const updateJobCategory = async (params) => {
  return postRequest(`job-category/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateJobCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateJobCategory(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-job-categories"]);
    },
  });
};

// Function to delete multiple JobCategory
export const DeleteJobCategory = async (ids) => {
  return deleteRequest(`job-category/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple JobCategory
export const useDeleteJobCategory = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteJobCategory(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-job-categories"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`job-category/${id}`, {
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
      queryClient.invalidateQueries(["fetch-job-categories"]);
    },
  });
};


export const getAllCategoryData = async () => {
  return await getRequest(`job-category`);
};
export const useGetAllCategoryData = () => {
  return useQuery({
    queryKey: ["fetch-job-category"],
    queryFn: () => getAllContractTypeData(),
  });
};
