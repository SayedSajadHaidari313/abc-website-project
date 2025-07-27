// import { useGetPostJobsData } from "@/queries/post.jobs.query";
// import { Alert, Skeleton } from "antd";
// import {
//   CalendarOutlined,
//   ClockCircleOutlined,
//   FileTextOutlined,
//   TeamOutlined,
//   DollarOutlined,
//   SolutionOutlined,
//   HourglassOutlined,
//   FileDoneOutlined,
//   HistoryOutlined,
//   ReloadOutlined,
//   ReadOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import PropTypes from "prop-types";

// const JobOverView = ({ currentJobId }) => {
//   const { data, isLoading, isError } = useGetPostJobsData();

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

//   const job = data?.data?.filter((job) => job?.id === currentJobId);
//   return (
//     <div className="widget-content">
//       <ul className="job-overview space-y-4 text-gray-700">
//         <li className="flex items-center gap-3">
//           <CalendarOutlined className="text-primary text-xl" />
//           <div>
//             <h5 className="font-semibold">Post Date:</h5>
//             <span>
//               {job[0]?.post_date
//                 ? new Date(job[0]?.post_date).toDateString()
//                 : "N/A"}
//             </span>
//           </div>
//         </li>

//         <li className="flex items-center gap-3">
//           <ClockCircleOutlined className="text-primary text-xl" />
//           <div>
//             <h5 className="font-semibold">Closing Date:</h5>
//             <span>
//               {job[0]?.closing_date
//                 ? new Date(job[0]?.closing_date).toDateString()
//                 : "N/A"}
//             </span>
//           </div>
//         </li>

//         <li className="flex items-center gap-3">
//           <FileTextOutlined className="text-primary text-xl" />
//           <div>
//             <h5 className="font-semibold">Reference:</h5>
//             <span>{job[0]?.reference || "N/A"}</span>
//           </div>
//         </li>

//         <li className="flex items-center gap-3">
//           <TeamOutlined className="text-primary text-xl" />
//           <div>
//             <h5 className="font-semibold">Number of Vacancies:</h5>
//             <span>{job[0]?.number_Of_vacancy || "N/A"}</span>
//           </div>
//         </li>

//         <li className="flex items-center gap-3">
//           <DollarOutlined className="text-primary text-xl" />
//           <div>
//             <h5 className="font-semibold">Salary Range:</h5>
//             <span>{job[0]?.salary_range || "N/A"}</span>
//           </div>
//         </li>

//         <li className="flex items-center gap-3">
//           <SolutionOutlined className="text-primary text-xl" />
//           <div>
//             <h5 className="font-semibold">Years of Experience:</h5>
//             <span>{job[0]?.experiance || "N/A"}</span>
//           </div>
//         </li>

//         <li className="flex items-center gap-3">
//           <HourglassOutlined className="text-primary text-xl" />
//           <div>
//             <h5 className="font-semibold">Probation Period:</h5>
//             <span>{job[0]?.probation_period || "N/A"}</span>
//           </div>
//         </li>

//         <li className="flex items-center gap-3">
//           <FileDoneOutlined className="text-primary text-xl" />
//           <div>
//             <h5 className="font-semibold">Contract Type:</h5>
//             <span>{job[0]?.contract_type?.name || "N/A"}</span>
//           </div>
//         </li>

//         <li className="flex items-center gap-3">
//           <HistoryOutlined className="text-primary text-xl" />
//           <div>
//             <h5 className="font-semibold">Contract Duration:</h5>
//             <span>{job[0]?.contract_duration || "N/A"}</span>
//           </div>
//         </li>

//         <li className="flex items-center gap-3">
//           <ReloadOutlined className="text-primary text-xl" />
//           <div>
//             <h5 className="font-semibold">Contract Extensible:</h5>
//             <span>
//               {job[0]?.contract_extensible?.toLowerCase() === "yes"
//                 ? "Yes"
//                 : job?.contract_extensible?.toLowerCase() === "no"
//                 ? "No"
//                 : "N/A"}
//             </span>
//           </div>
//         </li>

//         <li className="flex items-center gap-3">
//           <ReadOutlined className="text-primary text-xl" />
//           <div>
//             <h5 className="font-semibold">Minimum Education:</h5>
//             <span>{job[0]?.education_level?.education_level || "N/A"}</span>
//           </div>
//         </li>

//         <li className="flex items-center gap-3">
//           <UserOutlined className="text-primary text-xl" />
//           <div>
//             <h5 className="font-semibold">Gender:</h5>
//             <span>{job[0]?.gender || "N/A"}</span>
//           </div>
//         </li>
//       </ul>
//     </div>
//   );
// };

// JobOverView.propTypes = {
//   currentJobId: PropTypes.object.isRequired,
// };

// export default JobOverView;
