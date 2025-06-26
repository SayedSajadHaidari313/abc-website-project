import {
  // deleteRequest,
  getRequest,
  // postRequest,
} from "@/auth/FetchInterceptor";
import {
  // useMutation,
  useQuery,
  //  useQueryClient
} from "@tanstack/react-query";

// Get Insight Query

export const getAdvertisementData = async () => {
  return await getRequest(`advertisement`);
};

export const useAdvertisementData = () => {
  return useQuery({
    queryKey: ["fetch-advertisement"],
    queryFn: getAdvertisementData,
  });
};

// export const getAData = async (current, pageSize, searchQuery) => {
//   return await getRequest(`get_advertisement`, {
//     current: current,
//     pageSize: pageSize,
//     searchQuery: searchQuery,
//   });
// };

// // Update Insight Query
// export const updateAdvertisement = async (params) => {
//   return postRequest(`jobseeker/insight/${params.get("id")}`, params, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// export const useUpdateInsight = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (params) => updateInsight(params),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["update-Insight"]);
//     },
//   });
// };

// // Function to delete multiple Insight
// export const DeleteInsight = async (ids) => {
//   return deleteRequest(`jobseeker/insight/delete`, {
//     params: {
//       ids: ids.join(","),
//     },
//   });
// };

// // Hook to delete multiple Insight
// export const useDeleteInsight = (ids) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (params) => DeleteInsight(params?.ids),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["fetch-Insight"]);
//     },
//   });
// };

// export const singleDelete = async (id) => {
//   return deleteRequest(`jobseeker/insight/${id}`, {
//     params: {
//       id,
//     },
//   });
// };
// export const useSingleDelete = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (params) => singleDelete(params.id),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["fetch-Insight"]);
//     },
//   });
// };
