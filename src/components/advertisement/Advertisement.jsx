import { useAdvertisementData } from "@/queries/advertisement.query";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";

function Advertisement({ location, status }) {
  const { data, isLoading } = useAdvertisementData();

  const formatImageUrl = (photo) => {
    if (!photo) return null;
    const normalizedPath = photo.replace(/\\/g, "/").replace(/^\/+/, "");
    return `${BASE_IMAGE_URL}/${normalizedPath}`;
  };

  if (isLoading) return <Skeleton active paragraph={{ rows: 1 }} />;

  // Filter ads by location and status if props are provided
  const filteredAds = data?.data?.filter(
    (item) =>
      (!location || item.location === location) &&
      (!status || item.status === status)
  );
  console.log(filteredAds);

  return (
    <div className="advertisement-wrapper">
      {filteredAds?.map((item) => (
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
