import { getRequest } from "@/auth/FetchInterceptor";
import { useQuery } from "@tanstack/react-query";

// از این باید سمع استفاده کند
export const getPostJobsDataSami = async (
  page = 1,
  pageSize = 10,
  searchQuery = "",
  location = "",
  category = ""
) => {
  const url = `get_post_jobs?page=${page}&pageSize=${pageSize}&searchQuery=${encodeURIComponent(
    searchQuery
  )}&location=${encodeURIComponent(location)}&category=${encodeURIComponent(category)}`;
  return await getRequest(url);
};

export const useGetPostJobsDataSami = (
  page = 1,
  pageSize = 2,
  searchQuery = "",
  location = "",
  category = ""
) => {
  return useQuery({
    queryKey: [
      "fetch-post-jobs",
      page,
      pageSize,
      searchQuery,
      location,
      category,
    ],
    queryFn: () =>
      getPostJobsDataSami(page, pageSize, searchQuery, location, category),
    keepPreviousData: true, // Keeps old data while loading next page
  });
};

// از این من قبلا استفاه کرده ام
export const getPostJobsData = async () => {
  return await getRequest("get_post_jobs");
};

export const useGetPostJobsData = () => {
  return useQuery({
    queryKey: ["fetch-post-jobs"],
    queryFn: getPostJobsData,
  });
};

export const getInsightData = async () => {
  return await getRequest("get_post_jobs");
};

export const useGetInsightData = () => {
  return useQuery({
    queryKey: ["fetch-post-jobs"],
    queryFn: getPostJobsData,
  });
};
