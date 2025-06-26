import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRequest, getRequest, postRequest } from "auth/FetchInterceptor";

// Get EducationLevel Query

export const getEducationLevelData = async (
  current,
  pageSize,
  searchQuery,
) => {
  return await getRequest(`admin/education-levels`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetEducationLevelData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-admin-education-levels", current, pageSize, searchQuery],
    queryFn: () => getEducationLevelData(current, pageSize, searchQuery),
  });
};
// Get EducationLevelCategories Query


// Create EducationLevel Query

export const EducationLevelPostCreate = (params) => {
  return postRequest(`admin/education-levels`, params);
};

export const usePostEducationLevelCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => EducationLevelPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-education-levels"]);
    },
  });
};

// Update EducationLevel Query
export const updateEducationLevel = async (params) => {
  return postRequest(`admin/education-levels/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateEducationLevel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateEducationLevel(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-education-levels"]);
    },
  });
};

// Function to delete multiple EducationLevel
export const DeleteEducationLevel = async (ids) => {
  return deleteRequest(`admin/education-levels/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple EducationLevel
export const useDeleteEducationLevel = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteEducationLevel(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-education-levels"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`admin/education-levels/${id}`, {
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
      queryClient.invalidateQueries(["fetch-education-levels"]);
    },
  });
};
