// import { useGetPostJobsData } from "@/queries/post.jobs.query";
// import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
// import { Alert, Avatar, Skeleton } from "antd";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

// const RelatedJobs = ({ currentJobId, currentCategoryId }) => {
//   const { data: jobsData, isLoading, isError } = useGetPostJobsData();
//   if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />;

//   if (isError)
//     return (
//       <Alert
//         message="Error fetching data"
//         description="Please try again later."
//         type="error"
//         showIcon
//       />
//     );

//   const relatedJobs = jobsData?.data
//     ?.filter(
//       (job) =>
//         job.id !== Number(currentJobId) && // خودش نباشد
//         job.job_category_id === currentCategoryId // فقط دسته‌بندی مشابه
//     )
//     .slice(0, 10); // حداکثر ۴ شغل نشان بده

//   if (relatedJobs.length === 0) return <div>No related jobs found</div>;

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
//       default:
//         return "other";
//     }
//   };

//   const formatImageUrl = (path) => {
//     if (!path) return null;
//     return `${BASE_IMAGE_URL}/${path.replace(/\\/g, "/")}`;
//   };

//   return (
//     <>
//       {relatedJobs.map((item) => (
//         <div className="job-block" key={item.id}>
//           <div className="inner-box">
//             <div className="content">
//               <span className="company-logo">
//                 <Avatar
//                   size={64}
//                   src={
//                     item?.company?.company_photo
//                       ? formatImageUrl(item?.company?.company_photo)
//                       : null
//                   }
//                   alt="Company Logo"
//                 >
//                   {!item?.company?.company_photo && item?.company?.company_photo
//                     ? item?.company?.company_name.charAt(0).toUpperCase()
//                     : ""}
//                 </Avatar>
//               </span>
//               <h4>
//                 <Link to={`/job-single-v1/${item.id}`}>{item.job_title}</Link>
//               </h4>

//               <ul className="job-info">
//                 <li>
//                   <span className="icon flaticon-briefcase"></span>
//                   {item?.company?.company_name}
//                 </li>
//                 <li>
//                   <span className="icon flaticon-map-locator"></span>
//                   {item?.provinces}, {item?.countries}
//                 </li>
//                 <li>
//                   <span className="icon flaticon-clock-3"></span>
//                   {item?.created_at &&
//                     new Date(item.created_at).toLocaleDateString()}
//                 </li>
//                 <li>
//                   <span className="icon flaticon-money"></span>
//                   {item?.salary_range}
//                 </li>
//               </ul>

//               <ul className="job-other-info">
//                 <li className={`job-tag ${getStyleClass(item.job_type)}`}>
//                   {item.job_type
//                     ?.replace("_", " ")
//                     .split(" ")
//                     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                     .join(" ")}
//                 </li>
//               </ul>

//               <button className="bookmark-btn">
//                 <span className="flaticon-bookmark"></span>
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };
// RelatedJobs.propTypes = {
//   currentJobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//     .isRequired,
//   currentCategoryId: PropTypes.number.isRequired,
// };

// export default RelatedJobs;
