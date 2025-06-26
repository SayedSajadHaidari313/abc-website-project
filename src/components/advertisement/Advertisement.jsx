import { useAdvertisementData } from "@/queries/advertisement.query";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";

function Advertisement() {
  const { data, isLoading } = useAdvertisementData();

  const formatImageUrl = (photo) => {
    if (!photo) return null;
    const normalizedPath = photo.replace(/\\/g, "/").replace(/^\/+/, "");
    return `${BASE_IMAGE_URL}/${normalizedPath}`;
  };

  if (isLoading) return <Skeleton active paragraph={{ rows: 1 }} />;

  return (
    <div className="advertisement-wrapper">
      {data?.data?.map((item) => (
        <div className="advertisement-card" key={item.id}>
          <Link to={item?.link} target="_blank" rel="noopener noreferrer">
            <img
              src={
                item?.photo
                  ? formatImageUrl(item.photo)
                  : "/images/default-avatar.png"
              }
              alt="Advertisement"
              className="advertisement-image"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Advertisement;
