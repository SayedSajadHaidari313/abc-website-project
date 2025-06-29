import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteRequest,
  getRequest,
  postRequest,
} from "@/auth/FetchInterceptor";

export const getCitiesData = async (
  current,
  pageSize,
  searchQuery,
  category
) => {
  return await getRequest(`admin/cities`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
    category,
  });
};

export const useGetCitiesData = (current, pageSize, searchQuery, category) => {
  return useQuery({
    queryKey: ["fetch-Cities", current, pageSize, searchQuery, category],
    queryFn: () => getCitiesData(current, pageSize, searchQuery, category),
  });
};

export const CitiesPostCreate = (params) => {
  return postRequest(`admin/cities`, params);
};

export const usePostCitiesCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => CitiesPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-Cities"]);
    },
  });
};

export const deleteCities = async (ids) => {
  return deleteRequest(`delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

export const updateCities = async (params) => {
  return postRequest(`admin/cities/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateCities = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateCities(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-admin-Cities"]);
    },
  });
};

// Function to delete multiple Cities
export const DeleteCities = async (ids) => {
  return deleteRequest(`admin/cities/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple Cities
export const useDeleteCities = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => deleteCities(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-admin-Cities"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`admin/cities/${id}`, {
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
      queryClient.invalidateQueries(["fetch-admin-Cities"]);
    },
  });
};

// get Cities data without Pagination and Search

export const getCitiesAllData = async () => {
  return await getRequest(`get-cities`);
};

export const useGetAllCitiesData = () => {
  return useQuery({
    queryKey: ["fetch-Cities-get"],
    queryFn: () => getCitiesAllData(),
  });
};
