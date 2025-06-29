import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRequest, getRequest, postRequest } from "@/auth/FetchInterceptor";

export const getCountryData = async (
  current,
  pageSize,
  searchQuery,
  category
) => {
  return await getRequest(`admin/country`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
    category,
  });
};

export const useGetCountryData = (current, pageSize, searchQuery, category) => {
  return useQuery({
    queryKey: ["fetch-country", current, pageSize, searchQuery, category],
    queryFn: () => getCountryData(current, pageSize, searchQuery, category),
  });
};

export const CountryPostCreate = (params) => {
  return postRequest(`admin/country`, params);
};

export const usePostCountryCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => CountryPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-Country"]);
    },
  });
};

export const deleteCountry = async (ids) => {
  return deleteRequest(`delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

export const updateCountry = async (params) => {
  return postRequest(`admin/country/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateCountry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateCountry(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-admin-Country"]);
    },
  });
};

// Function to delete multiple Country
export const DeleteCountry = async (ids) => {
  return deleteRequest(`admin/country/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple Country
export const useDeleteCountry = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => deleteCountry(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-admin-Country"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`admin/country/${id}`, {
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
      queryClient.invalidateQueries(["fetch-admin-country"]);
    },
  });
};

// get Country data without Pagination and Search

export const getCountryAllData = async () => {
  return await getRequest(`get-country`);
};

export const useGetAllCountryData = () => {
  return useQuery({
    queryKey: ["fetch-country-get"],
    queryFn: () => getCountryAllData(),
  });
};
