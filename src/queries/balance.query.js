import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRequest, getRequest, postRequest } from "auth/FetchInterceptor";

// Get balance Query

export const getBalanceData = async (
  current,
  pageSize,
  searchQuery,
) => {
  return await getRequest(`admin/balance`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetBalanceData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-admin-balance", current, pageSize, searchQuery],
    queryFn: () => getBalanceData(current, pageSize, searchQuery),
  });
};
// Get balanceCategories Query


// Create balance Query

export const BalancePostCreate = (params) => {
  return postRequest(`admin/balance`, params);
};

export const usePostBalanceCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => BalancePostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-balance"]);
    },
  });
};

// Update balance Query
export const updateBalance = async (params) => {
  return postRequest(`admin/balance/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateBalance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateBalance(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-balance"]);
    },
  });
};

// Function to delete multiple balance
export const DeleteBalance = async (ids) => {
  return deleteRequest(`admin/balance/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple balance
export const useDeleteBalance = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteBalance(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-balance"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`admin/balance/${id}`, {
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
      queryClient.invalidateQueries(["fetch-balance"]);
    },
  });
};
