// import { Card, Avatar } from "antd";
// import { Link } from "react-router-dom";
// import { useGetPostJobsData } from "@/queries/post.jobs.query";
// import Slider from "react-slick";
// import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
// import { truncateText } from "@/utils/PublicTruncat";

// const PrevArrow = (props) => {
//   const { className, onClick } = props;
//   return (
//     <div className={`${className} custom-prev`} onClick={onClick}>
//       <LeftOutlined />
//     </div>
//   );
// };

// const NextArrow = (props) => {
//   const { className, onClick } = props;
//   return (
//     <div className={`${className} custom-next`} onClick={onClick}>
//       <RightOutlined />
//     </div>
//   );
// };

// const JobFeatured12 = () => {
//   const { data } = useGetPostJobsData();
//   const promotedJobs = data?.promoted || [];

//   const uniqueJobs = promotedJobs.filter(
//     (v, i, a) => a.findIndex((t) => t.id === v.id) === i
//   );

//   const formatImageUrl = (path) =>
//     path ? `${BASE_IMAGE_URL}/${path.replace(/\\/g, "/")}` : null;

//   const getStyleClass = (jobType) => {
//     const types = {
//       full_time: "full_time",
//       part_time: "part_time",
//       freelance: "freelance",
//       internship: "internship",
//       remote: "remote",
//       promoted: "promoted",
//     };
//     return types[jobType] || "other";
//   };

//   const jobCount = uniqueJobs.length;
//   const slidesToShow = Math.min(3, jobCount);
//   const shouldLoop = jobCount > 3;

//   const settings = {
//     dots: false,
//     infinite: shouldLoop,
//     speed: 500,
//     centerMode: true,
//     centerPadding: "0px",
//     autoplay: true,
//     autoplaySpeed: 3000,
//     slidesToShow,
//     slidesToScroll: 1,
//     arrows: true,
//     prevArrow: <PrevArrow />,
//     nextArrow: <NextArrow />,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: Math.min(2, slidesToShow),
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           centerMode: false,
//         },
//       },
//     ],
//   };

//   return (
//     <Card className="mb-30" style={{ backgroundColor: "#edf2fb" }}>
//       <Slider {...settings}>
//         {uniqueJobs.map((item) => (
//           <div key={item.id}>
//             <div className="job-block">
//               <div className="inner-box">
//                 <div className="content">
//                   <span className="company-logo">
//                     <Avatar
//                       size={60}
//                       src={
//                         item?.company?.company_photo
//                           ? formatImageUrl(item.company.company_photo)
//                           : null
//                       }
//                       alt="Company Logo"
//                     >
//                       {!item?.company?.company_photo && item?.company?.name
//                         ? item.company.name.charAt(0).toUpperCase()
//                         : ""}
//                     </Avatar>
//                   </span>
//                   <h4>
//                     <Link to={`/job-details/${item.id}`}>{truncateText(item.job_title,17)}</Link>
//                   </h4>
//                   <ul className="job-info">
//                     <li>
//                       <span className="icon flaticon-briefcase"></span>
//                       {truncateText(item?.company?.company_name,10)}
//                     </li>
//                     <li>
//                       <span className="icon flaticon-map-locator"></span>
//                       {item?.provinces}, {item?.countries}
//                     </li>
//                   </ul>
//                   <ul className="job-other-info">
//                     <li className={`job-tag ${getStyleClass(item.job_type)}`}>
//                       {item.job_type
//                         ?.replace("_", " ")
//                         .split(" ")
//                         .map(
//                           (word) => word.charAt(0).toUpperCase() + word.slice(1)
//                         )
//                         .join(" ")}
//                     </li>
//                     <li className={`job-tag ${getStyleClass(item.job_status)}`}>
//                       {item.job_status
//                         ?.replace("_", " ")
//                         .split(" ")
//                         .map(
//                           (word) => word.charAt(0).toUpperCase() + word.slice(1)
//                         )
//                         .join(" ")}
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </Card>
//   );
// };

// export default JobFeatured12;
