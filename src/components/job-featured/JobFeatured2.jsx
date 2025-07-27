// import { Link, useSearchParams } from "react-router-dom";
// import { useGetPostJobsDataSami } from "@/queries/post.jobs.query";
// import moment from "moment";
// import { Avatar, Pagination, Row, Skeleton } from "antd";
// import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

// const JobFeatured2 = () => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const page = parseInt(searchParams.get("page") || "1", 10);
//   const searchQuery = searchParams.get("search") || "";
//   const location = searchParams.get("location") || "";
//   const category = searchParams.get("category") || "";

//   const pageSize = 10;

//   const { data, isLoading } = useGetPostJobsDataSami(
//     page,
//     pageSize,
//     searchQuery,
//     location,
//     category
//   );
//   const jobs = data?.data?.filter(
//     (job) => job.job_status === "active" || job.job_status === "promoted"
//   );

//   const handlePageChange = (newPage) => {
//     setSearchParams({
//       page: newPage.toString(),
//       search: searchQuery,
//       location,
//       category,
//     });
//   };
//   if (isLoading) return <Skeleton active paragraph={{ rows: 3 }} />;

//   const formatImageUrl = (path) => {
//     if (!path) return null;
//     return `${BASE_IMAGE_URL}/${path.replace(/\\/g, "/")}`;
//   };

//   const getStyleClass = (jobType) => {
//     switch (jobType) {
//       case "full_time":
//         return "full_time";
//       case "part_time":
//         return "part_time";
//       case "freelance":
//         return "freelance";
//       case "internship":
//         return "internship";
//       case "remote":
//         return "remote";
//       case "pormoted":
//         return "pormoted";
//       default:
//         return "other";
//     }
//   };

//   return (
//     <>
//       {jobs?.map((item) => (
//         <div
//           className="job-block-two col-lg-12 col-md-12 col-sm-12"
//           key={item.id}
//         >
//           <div className="inner-box">
//             <div className="content">
//               <span className="company-logo">
//                 <Avatar
//                   size={60}
//                   src={
//                     item?.company?.company_photo
//                       ? formatImageUrl(item.company?.company_photo)
//                       : null
//                   }
//                   alt="Company Logo"
//                 >
//                   {!item?.company?.company_photo && item?.company?.name
//                     ? item?.company?.name.charAt(0).toUpperCase()
//                     : ""}
//                 </Avatar>
//               </span>
//               <h4>
//                 <Link to={`/job-single-v1/${item.id}`}>{item.job_title}</Link>
//               </h4>

//               <ul className="job-info">
//                 <li>
//                   <span className="icon flaticon-briefcase"></span>
//                   {item.company?.company_name}
//                 </li>
//                 <li>
//                   <span className="icon flaticon-map-locator"></span>
//                   {item?.provinces}, {item?.countries}
//                 </li>
//                 <li>
//                   <span className="icon flaticon-clock-3"></span>{" "}
//                   {moment(item?.created_at).fromNow()}
//                 </li>
//                 <li>
//                   <span className="icon flaticon-money"></span>{" "}
//                   {item.salary_range}
//                 </li>
//               </ul>
//             </div>

//             <ul className="job-other-info">
//               <li className={`job-tag ${getStyleClass(item.job_type)}`}>
//                 {item.job_type
//                   ?.replace("_", " ")
//                   .split(" ")
//                   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                   .join(" ")}
//               </li>
//             </ul>
//           </div>
//         </div>
//       ))}

//       <Row align="middle" justify="center">
//         <Pagination
//           current={data?.pagination?.current_page || 1}
//           pageSize={data?.pagination?.per_page || pageSize}
//           total={data?.pagination?.total || 0}
//           onChange={handlePageChange}
//           showSizeChanger={false}
//           style={{ textAlign: "center", marginTop: "20px" }}
//         />
//       </Row>
//     </>
//   );
// };

// export default JobFeatured2;
