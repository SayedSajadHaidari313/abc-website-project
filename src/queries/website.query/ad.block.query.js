import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteRequest,
  getRequest,
  postRequest,
} from "@/auth/FetchInterceptor";

export const getAdBlockData = async (current, pageSize, searchQuery) => {
  return await getRequest(`ad-google-block`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetAdBlockData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-admin-ad-google-block", current, pageSize, searchQuery],
    queryFn: () => getAdBlockData(current, pageSize, searchQuery),
  });
};

export const AdBlockPostCreate = (params) => {
  return postRequest(`ad-google-block`, params);
};

export const usePostAdBlockCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => AdBlockPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-ad-google-block"]);
    },
  });
};

export const updateAdBlock = async (params) => {
  return postRequest(`ad-google-block/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateAdBlock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateAdBlock(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-ad-google-block"]);
    },
  });
};

export const DeleteAdBlock = async (ids) => {
  return deleteRequest(`ad-google-block/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

export const useDeleteAdBlock = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteAdBlock(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-ad-google-block"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`ad-google-block/${id}`, {
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
      queryClient.invalidateQueries(["fetch-ad-google-block"]);
    },
  });
};
