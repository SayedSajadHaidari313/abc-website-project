import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRequest, getRequest, postRequest } from "auth/FetchInterceptor";

export const getLanguageData = async (
  current,
  pageSize,
  searchQuery,
  category
) => {
  return await getRequest(`admin/languages`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
    category,
  });
};

export const useGetLanguageData = (current, pageSize, searchQuery, category) => {
  return useQuery({
    queryKey: ["fetch-Language", current, pageSize, searchQuery, category],
    queryFn: () => getLanguageData(current, pageSize, searchQuery, category),
  });
};

export const LanguagePostCreate = (params) => {
  return postRequest(`admin/languages`, params);
};

export const usePostLanguageCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => LanguagePostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-language"]);
    },
  });
};

export const deleteLanguage = async (ids) => {
  return deleteRequest(`delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

export const updateLanguage = async (params) => {
  return postRequest(`admin/languages/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateLanguage(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-admin-Language"]);
    },
  });
};

// Function to delete multiple Language
export const DeleteLanguage = async (ids) => {
  return deleteRequest(`admin/languages/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple Language
export const useDeleteLanguage = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => deleteLanguage(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-admin-Language"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`admin/languages/${id}`, {
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
      queryClient.invalidateQueries(["fetch-admin-Language"]);
    },
  });
};

// get Language data without Pagination and Search

export const getLanguageAllData = async () => {
  return await getRequest(`get-languages`);
};

export const useGetAllLanguageData = () => {
  return useQuery({
    queryKey: ["fetch-Language-get"],
    queryFn: () => getLanguageAllData(),
  });
};
