import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRequest, getRequest, postRequest } from "@/auth/FetchInterceptor";

export const getCategoryData = async (
  current,
  pageSize,
  searchQuery,
  category
) => {
  return await getRequest(`admin/categories`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
    category,
  });
};

export const useGetCategoryData = (
  current,
  pageSize,
  searchQuery,
  category
) => {
  return useQuery({
    queryKey: ["fetch-Category", current, pageSize, searchQuery, category],
    queryFn: () => getCategoryData(current, pageSize, searchQuery, category),
  });
};

export const CategoryPostCreate = (params) => {
  return postRequest(`admin/categories`, params);
};

export const usePostCategoryCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => CategoryPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-Category"]);
    },
  });
};

export const deleteCategory = async (ids) => {
  return deleteRequest(`delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

export const updateCategory = async (params) => {
  return postRequest(`admin/categories/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateCategory(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-Category"]);
    },
  });

};

// Function to delete multiple Category
export const DeleteCategory = async (ids) => {
  return deleteRequest(`admin/categories/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple Category
export const useDeleteCategory = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => deleteCategory(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-admin-Category"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`admin/categories/${id}`, {
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
      queryClient.invalidateQueries(["fetch-admin-Category"]);
    },
  });
};

// get Category data without Pagination and Search

export const getCategoryAllData = async () => {
  return await getRequest(`categories-data`);
};

export const useGetAllCategoryData = () => {
  return useQuery({
    queryKey: ["fetch-Category-get"],
    queryFn: () => getCategoryAllData(),
  });
};
