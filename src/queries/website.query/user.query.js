import {
  deleteRequest,
  getRequest,
  postRequest,
} from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get create_User Query

export const getUserData = async (current, pageSize, searchQuery) => {
  return await getRequest(`user/users`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetUserData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-users", current, pageSize, searchQuery],
    queryFn: () => getUserData(current, pageSize, searchQuery),
  });
};
// Get create_UserCategories Query

// Create create_User Query

export const UserPostCreate = (params) => {
  return postRequest(`create_User`, params);
};

export const usePostUserCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => UserPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-create_User"]);
    },
  });
};

// Update create_User Query
export const updateUser = async (params) => {
  return postRequest(`user/users/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateUser(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-create_User"]);
    },
  });
};

// Function to delete multiple create_User
export const DeleteUser = async (ids) => {
  return deleteRequest(`create_user/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple create_User
export const useDeleteUser = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteUser(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-create_User"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`user/users/${id}`, {
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
      queryClient.invalidateQueries(["fetch-create_User"]);
    },
  });
};
