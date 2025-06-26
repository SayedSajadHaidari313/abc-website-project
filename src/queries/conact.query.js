import { deleteRequest, getRequest, postRequest } from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getContactData = async (current, pageSize, searchQuery, category) => {
  return await getRequest(`contact`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
    category
  });
};


export const useGetContactData = (current, pageSize, searchQuery, category) => {
  return useQuery({
    queryKey: ['fetch-Contact', current, pageSize, searchQuery, category],
    queryFn: () => getContactData(current, pageSize, searchQuery, category),
  });
};

export const ContactPostCreate = (params) => {
  return postRequest(`contact`, params);
};

export const usePostContactCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => ContactPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(['fetch-Contact']);
    },
  });
};

export const deleteContact = async (ids) => {
  return deleteRequest(`delete`, {
    params: {
      ids: ids.join(','),
    },
  });
};


export const updateContact = async (params) => {
  return postRequest(`contact/${params.get('id')}`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateContact(params),
    onSuccess: () => {
      queryClient.invalidateQueries(['update-Contact']);
    },
  });
};

// Function to delete multiple Contact
export const DeleteContact = async (ids) => {
  return deleteRequest(`contact/delete`, {  
    params: {
      ids: ids.join(','),
    },
  });
};

// Hook to delete multiple Contact
export const useDeleteContact = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => deleteContact(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(['fetch-Contact']);
    },
  });
};


export const singleDelete = async (id) => {
  return deleteRequest(`contact/${id}`, {
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
      queryClient.invalidateQueries(['fetch-Contact']);
    },
  });
};
