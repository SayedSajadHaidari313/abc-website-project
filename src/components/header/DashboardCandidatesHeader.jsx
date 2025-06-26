import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import candidatesMenuData from "../../data/candidatesMenuData";
import HeaderNavContent from "./HeaderNavContent";
import { BASE_IMAGE_URL, isActiveLink } from "../../utils/linkActiveChecker";

import { useLocation } from "react-router-dom";
import { useGetAuthUserData } from "@/queries/user.query";
import { useGetSettingData } from "@/queries/settings.query";

const DashboardCandidatesHeader = () => {
  const { pathname } = useLocation();
  const [navbar, setNavbar] = useState(false);
  const { data: userData } = useGetAuthUserData();

  const { data: settingData } = useGetSettingData();
  const headerData = settingData?.data || [];

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/user_photos/${path.replace(/\\/g, "/")}`;
  };
  const formatPhotoUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/images/settings/${path.replace(/\\/g, "/")}`;
  };

  const changeBackground = () => {
    if (window.scrollY >= 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground); // بهتره در cleanup هم حذف بشه
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-shaddow ${navbar ? "fixed-header" : ""}`}
    >
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link to="/">
                  <img
                    width={100}
                    src={
                      headerData?.md_logo
                        ? formatPhotoUrl(headerData?.md_logo)
                        : null
                    }
                    alt={headerData?.site_name}
                  />
                  {!headerData?.md_logo && headerData?.site_name
                    ? headerData?.name.charAt(0).toUpperCase()
                    : ""}
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <HeaderNavContent />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <div className="dropdown dashboard-option">
              <a
                className="dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  alt={userData?.user?.name}
                  className="thumb"
                  src={formatImageUrl(userData?.user?.user_image)}
                />
                <span className="name">
                  {userData?.user?.name || "My Account"}
                </span>
              </a>

              <ul className="dropdown-menu">
                {candidatesMenuData.map((item) => (
                  <li
                    className={`${
                      isActiveLink(item.routePath, pathname) ? "active" : ""
                    } mb-1`}
                    key={item.id}
                  >
                    <Link to={item.routePath}>
                      <i className={`la ${item.icon}`}></i> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* End dropdown */}
          </div>
          {/* End outer-box */}
        </div>
      </div>
    </header>
  );
};

export default DashboardCandidatesHeader;
