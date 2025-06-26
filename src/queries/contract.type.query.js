import { deleteRequest, getRequest, postRequest } from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get ContractType Query

export const getContractTypeData = async (current, pageSize, searchQuery) => {
  return await getRequest(`admin/contract-types`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetContractTypeData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-admin-contract-types", current, pageSize, searchQuery],
    queryFn: () => getContractTypeData(current, pageSize, searchQuery),
  });
};
// Get ContractTypeCategories Query

// Create ContractType Query

export const ContractTypePostCreate = (params) => {
  return postRequest(`admin/contract-types`, params);
};

export const usePostContractTypeCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => ContractTypePostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-contract-types"]);
    },
  });
};

// Update ContractType Query
export const updateContractType = async (params) => {
  return postRequest(`admin/contract-types/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateContractType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateContractType(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-contract-types"]);
    },
  });
};

// Function to delete multiple ContractType
export const DeleteContractType = async (ids) => {
  return deleteRequest(`admin/contract-types/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple ContractType
export const useDeleteContractType = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteContractType(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-contract-types"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`admin/contract-types/${id}`, {
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
      queryClient.invalidateQueries(["fetch-contract-types"]);
    },
  });
};

export const getAllContractTypeData = async () => {
  return await getRequest(`contract_all`);
};
export const useGetAllContractTypeData = () => {
  return useQuery({
    queryKey: ["fetch-contract_all"],
    queryFn: () => getAllContractTypeData(),
  });
};
