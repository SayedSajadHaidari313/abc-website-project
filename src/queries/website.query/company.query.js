import {
  deleteRequest,
  getRequest,
  postRequest,
} from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get Company Query

export const getCompanyData = async (current, pageSize, searchQuery) => {
  return await getRequest(`register-user`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetCompanyData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-register-user", current, pageSize, searchQuery],
    queryFn: () => getCompanyData(current, pageSize, searchQuery),
  });
};
// Get CompanyCategories Query

// Create Company Query

export const CompanyPostCreate = (params) => {
  return postRequest(`register-user`, params);
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
  return postRequest(`register-user/${params.get("id")}`, params, {
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
  return deleteRequest(`register-user/delete`, {
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
  return deleteRequest(`register-user/${id}`, {
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

// Fetch single company by slug
export const getCompanyBySlug = async (slug) => {
  return await getRequest(`register-user/slug/${slug}`);
};

export const useGetCompanyBySlug = (slug) => {
  return useQuery({
    queryKey: ["fetch-company-by-slug", slug],
    queryFn: () => getCompanyBySlug(slug),
    enabled: !!slug,
  });
};
