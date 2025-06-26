import { postRequest } from "@/auth/FetchInterceptor";
import { useMutation,  useQueryClient } from "@tanstack/react-query";

export const ForgotPasswordPostCreate = (params) => {
    return postRequest(`password/reset`, params);
  };
  
  export const usePostResetPasswordCreate = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (params) => ForgotPasswordPostCreate(params),
      onSuccess: () => {
        queryClient.invalidateQueries(['fetch-reset-password']);
      },
    });
  };
  