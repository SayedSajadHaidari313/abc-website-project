import { getRequest } from "@/auth/FetchInterceptor";
import { useQuery } from "@tanstack/react-query"

export const getAuthEmployerData =async ()=>{
  return await getRequest(`employer/get-authenticated-employer-data`);
}
export const useGetAuthEmployerData = ()=>{
  return useQuery({
    queryKey:['fetch-AuthEmployer'],
    queryFn:()=>getAuthEmployerData()
  })
}