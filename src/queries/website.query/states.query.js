import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteRequest,
  getRequest,
  postRequest,
} from "@/auth/FetchInterceptor";

export const getStatesData = async (
  current,
  pageSize,
  searchQuery,
  category
) => {
  return await getRequest(`admin/states`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
    category,
  });
};

export const useGetStatesData = (current, pageSize, searchQuery, category) => {
  return useQuery({
    queryKey: ["fetch-States", current, pageSize, searchQuery, category],
    queryFn: () => getStatesData(current, pageSize, searchQuery, category),
  });
};

export const StatesPostCreate = (params) => {
  return postRequest(`admin/states`, params);
};

export const usePostStatesCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => StatesPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-States"]);
    },
  });
};

export const deleteStates = async (ids) => {
  return deleteRequest(`delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

export const updateStates = async (params) => {
  return postRequest(`admin/states/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateStates = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateStates(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-admin-States"]);
    },
  });
};

// Function to delete multiple States
export const DeleteStates = async (ids) => {
  return deleteRequest(`admin/states/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple States
export const useDeleteStates = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => deleteStates(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-admin-States"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`admin/states/${id}`, {
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
      queryClient.invalidateQueries(["fetch-admin-States"]);
    },
  });
};

// get States data without Pagination and Search

export const getStatesAllData = async () => {
  return await getRequest(`get-states`);
};

export const useGetAllStatesData = () => {
  return useQuery({
    queryKey: ["fetch-States-get"],
    queryFn: () => getStatesAllData(),
  });
};
