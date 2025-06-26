import { deleteRequest, getRequest, postRequest } from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ForgotPasswordPostCreate = (params) => {
    return postRequest(`password/forgot`, params);
  };
  
  export const usePostForgotPasswordCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (params) => ForgotPasswordPostCreate(params),
      onSuccess: () => {
        queryClient.invalidateQueries(['fetch-forgot-password']);
      },
    });
  };
  