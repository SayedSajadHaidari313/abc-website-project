import {
  deleteRequest,
  getRequest,
  postRequest,
} from "@/auth/FetchInterceptor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get create_jobseeker Query

export const getJobSeekerData = async (current, pageSize, searchQuery) => {
  return await getRequest(`jobseeker/users`, {
    current: current,
    pageSize: pageSize,
    searchQuery: searchQuery,
  });
};

export const useGetJobSeekerData = (current, pageSize, searchQuery) => {
  return useQuery({
    queryKey: ["fetch-users", current, pageSize, searchQuery],
    queryFn: () => getJobSeekerData(current, pageSize, searchQuery),
  });
};
// Get create_jobseekerCategories Query

// Create create_jobseeker Query

export const JobSeekerPostCreate = (params) => {
  return postRequest(`create_jobseeker`, params);
};

export const usePostJobSeekerCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => JobSeekerPostCreate(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-create_jobseeker"]);
    },
  });
};

// Update create_jobseeker Query
export const updateJobSeeker = async (params) => {
  return postRequest(
    `user/users/${params.get("id")}`,
    params,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const useUpdateJobSeeker = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => updateJobSeeker(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["update-create_jobseeker"]);
    },
  });
};

// Function to delete multiple create_jobseeker
export const DeleteJobSeeker = async (ids) => {
  return deleteRequest(`create_jobseeker/delete`, {
    params: {
      ids: ids.join(","),
    },
  });
};

// Hook to delete multiple create_jobseeker
export const useDeleteJobSeeker = (ids) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => DeleteJobSeeker(params?.ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetch-create_jobseeker"]);
    },
  });
};

export const singleDelete = async (id) => {
  return deleteRequest(`jobseeker/users/${id}`, {
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
      queryClient.invalidateQueries(["fetch-create_jobseeker"]);
    },
  });
};
