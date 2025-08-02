import { Link } from "react-router-dom";
import { useGetAllCategoryData } from "@/queries/website.query/category.query";
import { FaCode } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import { Spin } from "antd";
import { truncateText } from "@/utils/PublicTruncat";
import { useState, useMemo } from "react";
import { Suspense } from "react";

const SpecialCompanyCategories = () => {
  const { data, isLoading } = useGetAllCategoryData();

  // Define the special categories we want to show
  const specialCategories = [
    "Government School",
    "Government",
    "Government Hospital",
    "Government University",
    "Independent Presidency",
  ];

  // Memoize icon components
  const IconCache = useMemo(() => new Map(), []);

  const LoadableIcon = ({ iconName, size }) => {
    const [Icon, setIcon] = useState(() => FaCode);

    useMemo(() => {
      if (!iconName) {
        return;
      }

      if (IconCache.has(iconName)) {
        setIcon(() => IconCache.get(iconName));
        return;
      }

      // Since we know icons come from FA, we can directly access them
      const IconComponent = FaIcons[iconName] || FaCode;
      IconCache.set(iconName, IconComponent);
      setIcon(() => IconComponent);
    }, [iconName]);

    return <Icon size={size} />;
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
  // Filter only the special government categories
  const specialGovernmentCategories = categories.filter((item) =>
    specialCategories.includes(item.category_name)
  );

  return (
    <>
      <div className="row justify-content-center">
        {specialGovernmentCategories.map((item) => (
          <div
            className="category-block-two col-xl-2 col-lg-2 col-md-2 col-sm-12"
            key={item.id}
          >
            <div className="inner-box">
              <div className="content">
                <span className="icon">
                  <Suspense fallback={<FaCode size={24} />}>
                    <LoadableIcon iconName={item.category_icon} size={24} />
                  </Suspense>
                </span>
                <h4>
                  <Link to={`/listing?category=${item.id}`}>
                    {truncateText(item.category_name, 20)}
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SpecialCompanyCategories;
