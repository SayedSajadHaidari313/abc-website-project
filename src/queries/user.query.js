import {
  deleteRequest,
  getRequest,
  postRequest,
} from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get User Query

export const getAuthUserData = async () => {
  return await getRequest(`user/auth/authenticated-user-data`);
};
export const useGetAuthUserData = () => {
  return useQuery({
    queryKey: ["fetch-AuthUser"],
    queryFn: () => getAuthUserData(),
  });
};

export const getAuthData = async () => {
  return await getRequest(`user/auth/authenticated-user-data`);
};
export const useGetAuthData = () => {
  return useQuery({
    queryKey: ["fetch-AuthUser"],
    queryFn: () => getAuthData(),
  });
};

export const getUsersData = async (current, pageSize, searchQuery) => {
  return await getRequest(`users`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetUserData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-jobseeker-users", current, pageSize, searchQuery],
    queryFn: () => getUsersData(current, pageSize, searchQuery),
  });
};

// Get UserCategories Query

export const getCategoriesUsersData = async (
  current,
  pageSize,
  searchQuery,
  category
) => {
  return await getRequest(`users`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
    category,
  });
};

export const useGetCategoriesUserData = (
  current,
  pageSize,
  searchQuery,
  category
) => {
  return useQuery({
    queryKey: [
      "fetch-jobseeker-users",
      current,
      pageSize,
      searchQuery,
      category,
    ],
    queryFn: () => getUsersData(current, pageSize, searchQuery, category),
  });
};

// Get User Account Query

export const getUserAccount = async () => {
  return await getRequest(`user_accounts`);
};

export const useGetUserAccount = () => {
  return useQuery({
    queryKey: ["fetch-jobseeker-users-account"],
    queryFn: () => getUserAccount(),
  });
};

// Create User Query

export const userPostCreate = (params) => {
  return postRequest(`users`, params);
};

export const usePostUserCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => userPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-jobseeker-users"]);
    },
  });
};

// Update User Query
export const updateUser = async (params) => {
  return postRequest(`users/${params.get("id")}`, params, {
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
      queryClient.invalidateQueries(["update-jobseeker-users"]);
    },
  });
};

// Function to delete multiple users
export const DeleteUsers = async (ids) => {
  return deleteRequest(`users/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple users
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteUsers(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-jobseeker-users"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`users/${id}`, {
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
      queryClient.invalidateQueries(["fetch-jobseeker-users"]);
    },
  });
};
