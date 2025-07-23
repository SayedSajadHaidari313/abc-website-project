// import { useGetAdBlockData } from "@/queries/website.query/ad.block.query";

// export const useGoogleAds = () => {
//   const {
//     data: adsData,
//     isLoading,
//     error,
//     isError,
//   } = useGetAdBlockData(1, 100);

//   // Function to get ads by position
//   const getAdsByPosition = (position) => {
//     if (!adsData?.data) return [];

//     return adsData.data.filter(
//       (ad) => ad.ad_position === position && ad.ad_status === "ad_enabled"
//     );
//   };

//   return {
//     ads: adsData?.data || [],
//     total: adsData?.total || 0,
//     isLoading: isLoading || !adsData,
//     isError,
//     error,
//     getAdsByPosition,
//   };
// };
