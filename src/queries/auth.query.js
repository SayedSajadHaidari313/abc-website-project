import { getRequest, postRequest } from "@/auth/FetchInterceptor";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getAuthUserData = async () => {
  return await getRequest(`admin/auth/authenticated-user-data`);
};

export const useGetAuthUserData = () => {
  return useQuery({
    queryKey: ["fetch-AuthUser"],
    queryFn: () => getAuthUserData(),
  });
};

export const authenticateUser = async (email, password) => {
  return postRequest(`/login`, {
    email,
    password,
  });
};

export const useLoginUsers = () => {
  return useMutation({
    mutationFn: (params) => authenticateUser(params?.email, params?.password),
  });
};
