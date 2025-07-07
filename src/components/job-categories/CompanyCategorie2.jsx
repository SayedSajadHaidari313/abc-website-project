import { Link } from "react-router-dom";
import { useGetAllCategoryData } from "@/queries/website.query/category.query";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io5";
import * as GiIcons from "react-icons/gi";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import * as TbIcons from "react-icons/tb";
import * as HiIcons from "react-icons/hi";
import * as SiIcons from "react-icons/si";
import { Spin } from "antd";

const CompanyCategorie2 = () => {
  const { data, isLoading } = useGetAllCategoryData();

  // Function to get the icon component dynamically
  const getIconComponent = (iconName) => {
    // Combine all icon libraries
    const allIcons = {
      ...FaIcons,
      ...BsIcons,
      ...MdIcons,
      ...IoIcons,
      ...GiIcons,
      ...BiIcons,
      ...AiIcons,
      ...FiIcons,
      ...TbIcons,
      ...HiIcons,
      ...SiIcons,
    };

    return allIcons[iconName] || FaIcons.FaCode; // Default fallback
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">
            <Spin />
          </span>
        </div>
      </div>
    );
  }
  const categories = data?.data || [];
  console.log("data in here category", categories);

  return (
    <>
      {categories
        .filter((item) => item.category_parent_id === null)
        .slice(0, 20)
        .map((item) => {
          const IconComponent = getIconComponent(item.category_icon);

          return (
            <div
              className="category-block-two col-xl-2 col-lg-2 col-md-2 col-sm-12"
              key={item.id}
            >
              <div className="inner-box">
                <div className="content">
                  <span className="icon">
                    <IconComponent size={24} />
                  </span>
                  <h4>
                    <Link to={`/listing?category=${item.id}`}>
                      {item.category_name}
                    </Link>
                  </h4>
                  {/* <p>({item.jobNumber || 0} open positions)</p> */}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default CompanyCategorie2;
