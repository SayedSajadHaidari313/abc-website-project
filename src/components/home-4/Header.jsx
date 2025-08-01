import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetSettingData } from "@/queries/settings.query";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
import { useAuthStore } from "@/auth/auth.store";
import { Avatar } from "antd";
import { UserAddOutlined, LoginOutlined } from "@ant-design/icons";
import HeaderNavContent from "../header/HeaderNavContent";
import LazyImage from "../common/LazyImage";

const Header = () => {
  const { data } = useGetSettingData();
  const { user } = useAuthStore();

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/images/settings/${path.replace(/\\/g, "/")}`;
  };
  const formatImageUrlUser = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/${path.replace(/\\/g, "/")}`;
  };
  const datas = data?.data || {};
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-style-two alternate  ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      <div className="auto-container">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer d-flex align-items-center justify-content-between">
            <div className="logo-box">
              <div className="logo">
                <Link to="/">
                  <LazyImage
                    src={datas?.md_logo ? formatImageUrl(datas?.md_logo) : null}
                    alt={datas?.site_name}
                  />
                  {!datas?.md_logo && datas?.site_name
                    ? datas?.name.charAt(0).toUpperCase()
                    : ""}
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <div className="flex-grow-1 d-flex justify-content-end">
              <HeaderNavContent />
            </div>
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          {user ? (
            <div className="dropdown dashboard-option">
              <a
                className="dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Avatar
                  size={50}
                  src={
                    user?.user_image
                      ? formatImageUrlUser(user?.user_image)
                      : null
                  }
                  alt="user logo"
                >
                  {!user?.company?.company_photo && user?.company?.company_name
                    ? user?.company?.company_name.charAt(0).toUpperCase()
                    : ""}
                </Avatar>
                <span style={{ color: "white" }} className="name">
                  {user?.name}
                </span>
              </a>
              <ul className="dropdown-menu mt-2">
                <li>
                  <Link to="/login">
                    <i className="la la-user"></i> Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex align-items-center btn-box2">
              <Link to="/login" className="theme-btn btn-style-six call-modal">
                <LoginOutlined style={{ marginRight: 8 }} />
                Login
              </Link>
              <Link to="/register" className="theme-btn btn-style-one ms-2">
                <UserAddOutlined style={{ marginRight: 8 }} />
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
