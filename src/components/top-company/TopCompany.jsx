// import Slider from "react-slick";
// import { Link } from "react-router-dom";
// import { Avatar, Skeleton } from "antd";
// import { useGetCompaniesData } from "@/queries/get.companies.data.query";
// import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
// import { truncateText } from "@/utils/PublicTruncat";

// const TopCompany = () => {
//   // const { data, isLoading } = useGetCompaniesData();
//   // const companies = data?.data || [];

//   if (isLoading) return <Skeleton active paragraph={{ rows: 3 }} />;

//   const uniqueCompanies = companies
//     .filter((c) => c && c.id) // حذف null و undefined و بدون id
//     .filter(
//       (company, index, self) =>
//         index === self.findIndex((c) => c.id === company.id)
//     );

//   const formatImageUrl = (path) => {
//     if (!path) return null;
//     return `${BASE_IMAGE_URL}/${path.replace(/\\/g, "/")}`;
//   };

//   const slidesToShow = Math.min(uniqueCompanies.length, 4);

//   const settings = {
//     dots: true,
//     speed: 500,
//     slidesToShow,
//     slidesToScroll: slidesToShow,
//     autoplay: false,
//     arrows: uniqueCompanies.length > 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: Math.min(slidesToShow, 3),
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: Math.min(slidesToShow, 2),
//         },
//       },
//       {
//         breakpoint: 500,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <Slider {...settings} arrows={false}>
//       {uniqueCompanies.map((company) => (
//         <div className="company-block" key={company.id}>
//           <div className="inner-box">
//             <figure className="image">
//               <Avatar
//                 size={100}
//                 style={{ borderRadius: "10%" }}
//                 src={
//                   company?.company_photo
//                     ? formatImageUrl(company?.company_photo)
//                     : null
//                 }
//                 alt={company?.name}
//               >
//                 {!company?.company_photo && company?.name
//                   ? company?.name.charAt(0).toUpperCase()
//                   : ""}
//               </Avatar>
//             </figure>
//             <h4 className="name">
//               <Link to={`/employers-single-v1/${company.id}`}>
//                 {truncateText(company?.name, 18)}
//               </Link>
//             </h4>
//             <div className="location">
//               <i className="flaticon-map-locator"></i>
//               {company?.location}
//             </div>
//             <Link
//               to={`/employers-single-v1/${company.id}`}
//               className="theme-btn btn-style-three"
//             >
//               {company.jobNumber} Open Position
//             </Link>
//           </div>
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default TopCompany;
