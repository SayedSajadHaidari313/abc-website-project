import { postRequest } from "@/auth/FetchInterceptor";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const UserPostCreate = (params) => {
  return postRequest(`register-user`, params);
};

export const usePostUserCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => UserPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-user-register"]);
    },
  });
};
