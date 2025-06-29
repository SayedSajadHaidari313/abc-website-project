import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pagination } from "antd";
import { deleteRequest, getRequest, postRequest } from "@/auth/FetchInterceptor";

export const getFaqsData = async (current, pageSize, searchQuery, category) => {
  return await getRequest(`admin/faqs`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
    category,
  });
};

export const useGetFaqsData = (current, pageSize, searchQuery, category) => {
  return useQuery({
    queryKey: ["fetch-Faqs", current, pageSize, searchQuery, category],
    queryFn: () => getFaqsData(current, pageSize, searchQuery, category),
  });
};

export const getFaqsAccount = async () => {
  return await getRequest(`Faqs_accounts`);
};

export const useGetFaqsAccount = () => {
  return useQuery({
    queryKey: ["fetch-Faqss-account"],
    queryFn: () => getFaqsAccount(),
  });
};

export const FaqsPostCreate = (params) => {
  return postRequest(`admin/faqs`, params);
};

export const usePostFaqsCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => FaqsPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-Faqss"]);
    },
  });
};

export const deleteFaqs = async (ids) => {
  return deleteRequest(`delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

export const updateFaqs = async (params) => {
  return postRequest(`admin/faqs/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateFaqs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateFaqs(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-admin-Faqss"]);
    },
  });
};

// Function to delete multiple Faqss
export const DeleteFaqss = async (ids) => {
  return deleteRequest(`admin/faqs/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple Faqss
export const useDeleteFaqs = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => deleteFaqs(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-admin-Faqss"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`admin/faqs/${id}`, {
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
      queryClient.invalidateQueries(["fetch-admin-Faqss"]);
    },
  });
};

// get Faqs data without Pagination and Search

export const getFaqssData = async () => {
  return await getRequest(`get-Faqs`);
};

export const useGetAllFaqsData = () => {
  return useQuery({
    queryKey: ["fetch-Faqss-get"],
    queryFn: () => getFaqssData(),
  });
};
