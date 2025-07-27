// import { Link } from "react-router-dom";
// import { useGetPostJobsData } from "@/queries/post.jobs.query";
// import { Avatar } from "antd";
// import moment from "moment";

// const JobFeatured1 = () => {
//   const { data } = useGetPostJobsData();
//   const formatImageUrl = (path) => {
//     if (!path) return null;
//     return `https://localhost:8000/${path.replace(/\\/g, "/")}`;
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
//       {data?.data?.slice(0, 6).map((item) => (
//         <div className="job-block col-lg-6 col-md-12 col-sm-12" key={item.id}>
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
//                   {item?.company?.company_name}
//                 </li>
//                 {/* compnay info */}
//                 <li>
//                   <span className="icon flaticon-map-locator"></span>
//                   {item?.provinces}, {item?.countries}
//                 </li>
//                 {/* location info */}
//                 <li>
//                   <span className="icon flaticon-clock-3"></span>
//                   {moment(item?.created_at).fromNow()}
//                 </li>
//                 {/* time info */}
//                 <li>
//                   <span className="icon flaticon-money"></span>{" "}
//                   {item?.salary_range}
//                 </li>
//                 {/* salary info */}
//               </ul>
//               {/* End .job-info */}

//               <ul className="job-other-info">
//                 <li className={`job-tag ${getStyleClass(item.job_type)}`}>
//                   {item.job_type
//                     ?.replace("_", " ")
//                     .split(" ")
//                     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                     .join(" ")}
//                 </li>
//               </ul>
//               {/* End .job-other-info */}

//               <button className="bookmark-btn">
//                 <span className="flaticon-bookmark"></span>
//               </button>
//             </div>
//           </div>
//         </div>
//         // End job-block
//       ))}
//     </>
//   );
// };

// export default JobFeatured1;
