import { useGetSettingData } from "@/queries/settings.query";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
import { Link } from "react-router-dom";

const SidebarHeader = () => {
  const { data } = useGetSettingData();
  const footerData = data?.data || [];
  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/images/settings/${path.replace(/\\/g, "/")}`;
  };
  const datas = footerData;
  return (
    <div className="pro-header">
      <Link to="/">
        <img
          src={datas?.md_logo ? formatImageUrl(datas?.md_logo) : null}
          alt={datas?.site_name}
          width={100}
        />
        {!datas?.md_logo && datas?.site_name
          ? datas?.name.charAt(0).toUpperCase()
          : ""}
      </Link>
      {/* End logo */}

      <div className="fix-icon" data-bs-dismiss="offcanvas" aria-label="Close">
        <span className="flaticon-close"></span>
      </div>
      {/* icon close */}
    </div>
  );
};

export default SidebarHeader;
