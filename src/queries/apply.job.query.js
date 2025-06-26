
import { deleteRequest, getRequest, postRequest } from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

export const getApplyJobData = async () => {
    return await getRequest("jobseeker/apply_jobs");
  };
  
  export const useGetApplyJobData = () => {
    return useQuery({
      queryKey: ["fetch-apply-job"],
      queryFn: getApplyJobData,
    });
  };

  // تابع ساده بدون پارامتر
export const getEmployerApplyJobData = async () => {
    return await getRequest("employer/apply_jobs");
  };
  
  // هوک استفاده از کوئری
  export const useGetEmployerApplyJobData = () => {
    return useQuery({
      queryKey: ["fetch-apply-job-data"],
      queryFn: getEmployerApplyJobData,
    });
  };
// Get apply-jobCategories Query


// Create apply-job Query

export const ApplyJobCreate = (params) => {
  return postRequest(`jobseeker/apply_jobs`, params);
};

export const usePostApplyJobCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => ApplyJobCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-apply-job"]);
    },
  });
};


// Update apply-job Query
export const updateApplyJob = async (params) => {
  return postRequest(`employer/apply_jobs/${params.get("id")}`, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateApplyJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateApplyJob(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-apply-job"]);
    },
  });
};

// Function to delete multiple apply-job
export const DeleteApplyJob = async (ids) => {
  return deleteRequest(`employer/apply_jobs/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple apply-job
export const useDeleteApplyJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteApplyJob(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-apply-job"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`employer/apply_jobs/${id}`, {
    params: {
      id,
    },
  });
};
export const useSingleDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => singleDelete(params.id),
    onSuccess: (data) => {
      notification.success({
        message: "Success",
        description: data?.message || "Deleted successfully",
      });
      queryClient.invalidateQueries(["fetch-apply-job"]);
    },
    onError: (error) => {
      notification.error({
        message: "Error",
        description:
          error?.response?.data?.message || "Failed to delete the application.",
      });
    },
  });
};
