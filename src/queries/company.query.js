import {
  deleteRequest,
  getRequest,
  postRequest,
} from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get Company Query

export const getCompanyData = async (current, pageSize, searchQuery) => {
  return await getRequest(`create_employer`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetCompanyData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-create_employer", current, pageSize, searchQuery],
    queryFn: () => getCompanyData(current, pageSize, searchQuery),
  });
};
// Get CompanyCategories Query

// Create Company Query

export const CompanyPostCreate = (params) => {
  return postRequest(`create_employer`, params);
};

export const usePostCompanyCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => CompanyPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-company"]);
    },
  });
};

// Update Company Query
export const updateCompany = async (params) => {
  return postRequest(`create_employer/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateCompany(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-company"]);
    },
  });
};

// Function to delete multiple Company
export const DeleteCompany = async (ids) => {
  return deleteRequest(`create_employer/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple Company
export const useDeleteCompany = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteCompany(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-company"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`create_employer/${id}`, {
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
      queryClient.invalidateQueries(["fetch-company"]);
    },
  });
};
