import { deleteRequest, getRequest, postRequest } from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// تابع ساده بدون پارامتر
export const getSettingData = async () => {
    return await getRequest("setting");
  };
  
  // هوک استفاده از کوئری
  export const useGetSettingData = () => {
    return useQuery({
      queryKey: ["fetch-setting"],
      queryFn: getSettingData,
    });
  };

export const SettingPostCreate = (params) => {
  return postRequest(`setting`, params);
};

export const usePostSettingCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => SettingPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-setting"]);
    },
  });
};

export const updateSetting = async (params) => {
  return postRequest(`setting/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateSetting(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-setting"]);
    },
  });
};

export const DeleteSetting = async (ids) => {
  return deleteRequest(`setting/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

export const useDeleteSetting = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteSetting(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-advetisements"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`setting/${id}`, {
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
      queryClient.invalidateQueries(["fetch-advetisements"]);
    },
  });
};
