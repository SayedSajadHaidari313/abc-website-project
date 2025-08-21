import {
  deleteRequest,
  getRequest,
  postRequest,
} from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getItemsData = async (current, pageSize, searchQuery) => {
  return await getRequest(`admin/items`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetItemsData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-Items", current, pageSize, searchQuery],
    queryFn: () => getItemsData(current, pageSize, searchQuery),
  });
};

export const ItemsPostCreate = (params) => {
  return postRequest(`admin/items`, params);
};

export const usePostItemsCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => ItemsPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-Items"]);
    },
  });
};

export const deleteItems = async (ids) => {
  return deleteRequest(`delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

export const updateItems = async (params) => {
  return postRequest(`items-user/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateItems = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateItems(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-Items"]);
    },
  });
};

// Function to delete multiple Items
export const DeleteItems = async (ids) => {
  return deleteRequest(`admin/items/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple Items
export const useDeleteItems = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => deleteItems(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-Items"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`admin/items/${id}`, {
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
      queryClient.invalidateQueries(["fetch-Items"]);
    },
  });
};

// get Items data without Pagination and Search

export const getItemsAllData = async () => {
  return await getRequest(`get-Items`);
};

export const useGetAllItemsData = () => {
  return useQuery({
    queryKey: ["fetch-Items-all"],
    queryFn: () => getItemsAllData(),
  });
};

export const getAllItemsData = async (
  current,
  pageSize,
  searchQuery,
  location,
  category
) => {
  return await getRequest(`get-all-item`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
    location: location,
    category: category,
  });
};

export const useGetAllWebsiteItemsData = ({
  current,
  pageSize,
  searchQuery,
  location,
  category,
}) => {
  return useQuery({
    queryKey: [
      "fetch-get-all-item",
      current,
      pageSize,
      searchQuery,
      location,
      category,
    ],
    queryFn: () =>
      getAllItemsData(current, pageSize, searchQuery, location, category),
    enabled: !!current && !!pageSize, // Ensure query runs only when pagination is set
  });
};

export const getMyItemsAllData = async () => {
  return await getRequest(`user/my-items`);
};

export const useGetAllMyItemsData = () => {
  return useQuery({
    queryKey: ["fetch-get-my-items"],
    queryFn: () => getMyItemsAllData(),
  });
};

// Fetch items by categoryId
export const getItemsByCategoryId = async (
  categoryId,
  current,
  pageSize,
  searchQuery
) => {
  return await getRequest(`category/${categoryId}/items`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
    categoryId: categoryId,
  });
};

export const useGetItemsByCategoryId = ({
  categoryId,
  current,
  pageSize,
  searchQuery,
}) => {
  return useQuery({
    queryKey: [
      "fetch-items-by-category",
      categoryId,
      current,
      pageSize,
      searchQuery,
    ],
    queryFn: () =>
      getItemsByCategoryId(categoryId, current, pageSize, searchQuery),
    enabled: !!categoryId && !!current && !!pageSize, // Only run if categoryId and pagination are set
  });
};
