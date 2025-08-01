import { Link } from "react-router-dom";
import { useGetAllCategoryData } from "@/queries/website.query/category.query";
import { FaCode } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import { Spin } from "antd";
import { truncateText } from "@/utils/PublicTruncat";
import { useState, useMemo } from "react";
import { Suspense } from "react";

const CompanyCategorie2 = () => {
  const { data, isLoading } = useGetAllCategoryData();
  const [visibleCategories, setVisibleCategories] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
  const parentCategories = categories.filter(
    (item) => item.category_parent_id === null
  );

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate a small delay to show loading state
    setTimeout(() => {
      setVisibleCategories((prevVisible) =>
        Math.min(prevVisible + 8, parentCategories.length)
      );
      setIsLoadingMore(false);
    }, 300);
  };

  return (
    <>
      <div className="row">
        {parentCategories.slice(0, visibleCategories).map((item) => (
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
                    {truncateText(item.category_name, 13)}
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCategories < parentCategories.length && (
        <div className="text-center mt-4">
          <button
            className="theme-btn btn-style-one"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <Spin size="small" style={{ marginRight: "8px" }} />
                Loading...
              </>
            ) : (
              "Load More Categories"
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default CompanyCategorie2;
