import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRequest, getRequest, postRequest } from "auth/FetchInterceptor";

export const getCustomFiledData = async (
  current,
  pageSize,
  searchQuery,
  category
) => {
  return await getRequest(`admin/custom-fields`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
    category: category,
  });
};

export const useGetCustomFiledData = (
  current,
  pageSize,
  searchQuery,
  category
) => {
  return useQuery({
    queryKey: ["fetch-CustomFiled", current, pageSize, searchQuery, category],
    queryFn: () => getCustomFiledData(current, pageSize, searchQuery, category),
  });
};

export const CustomFiledPostCreate = (params) => {
  return postRequest(`admin/custom-fields`, params);
};

export const usePostCustomFiledCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => CustomFiledPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-CustomFiled"]);
    },
  });
};

export const deleteCustomFiled = async (ids) => {
  return deleteRequest(`delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

export const updateCustomFiled = async (params) => {
  return postRequest(`admin/custom-fields/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateCustomFiled = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateCustomFiled(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-admin-CustomFiled"]);
    },
  });
};

// Function to delete multiple CustomFiled
export const DeleteCustomFiled = async (ids) => {
  return deleteRequest(`admin/custom-fields`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple CustomFiled
export const useDeleteCustomFiled = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => deleteCustomFiled(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-admin-CustomFiled"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`admin/custom-fields/${id}`, {
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
      queryClient.invalidateQueries(["fetch-admin-CustomFiled"]);
    },
  });
};

// get CustomFiled data without Pagination and Search

export const getCustomFiledAllData = async () => {
  return await getRequest(`get-CustomFiled`);
};

export const useGetAllCustomFiledData = () => {
  return useQuery({
    queryKey: ["fetch-CustomFiled-get"],
    queryFn: () => getCustomFiledAllData(),
  });
};
