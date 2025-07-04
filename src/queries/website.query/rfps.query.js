import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRequest, getRequest, postRequest } from "auth/FetchInterceptor";

export const getRfpsData = async (current, pageSize, searchQuery, category) => {
  return await getRequest(`admin/rfps`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
    category,
  });
};

export const useGetRfpsData = (current, pageSize, searchQuery, category) => {
  return useQuery({
    queryKey: ["fetch-rfps", current, pageSize, searchQuery, category],
    queryFn: () => getRfpsData(current, pageSize, searchQuery, category),
  });
};

export const RfpsPostCreate = (params) => {
  return postRequest(`admin/rfps`, params);
};

export const usePostRfpsCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => RfpsPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-rfps"]);
    },
  });
};

export const deleteRfps = async (ids) => {
  return deleteRequest(`delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

export const updateRfps = async (params) => {
  return postRequest(`admin/rfps/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateRfps = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateRfps(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-rfps"]);
    },
  });
};

// Function to delete multiple Rfps
export const DeleteRfps = async (ids) => {
  return deleteRequest(`admin/rfps/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple Rfps
export const useDeleteRfps = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => deleteRfps(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-rfps"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`admin/rfps/${id}`, {
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
      queryClient.invalidateQueries(["fetch-rfps"]);
    },
  });
};

// get Rfps data without Pagination and Search

export const getRfpsAllData = async () => {
  return await getRequest(`get-rfps`);
};

export const useGetAllRfpsData = () => {
  return useQuery({
    queryKey: ["fetch-rfps-all"],
    queryFn: () => getRfpsAllData(),
  });
};
