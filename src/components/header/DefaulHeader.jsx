import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import { useGetSettingData } from "@/queries/settings.query";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
import { useAuthStore } from "@/auth/auth.store";
import { Avatar } from "antd";
import { UserAddOutlined, LoginOutlined } from "@ant-design/icons";
import LazyImage from "../common/LazyImage";

const DefaulHeader = () => {
  const { data } = useGetSettingData();
  const headerData = data?.data || [];
  const { user } = useAuthStore();
  // const employer = data?.data;

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/images/settings/${path.replace(/\\/g, "/")}`;
  };
  const formatImageUrlUser = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/${path.replace(/\\/g, "/")}`;
  };
  const datas = headerData;
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
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header  ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      {/* <!-- Main box --> */}
      <div className="main-box">
        {/* <!--Nav Outer --> */}
        <div className="nav-outer">
          <div className="logo-box">
            <div className="logo">
              <Link to="/">
                <LazyImage
                  src={datas?.md_logo ? formatImageUrl(datas?.md_logo) : null}
                  alt={datas?.site_name}
                  priority={true}
                  style={{ maxHeight: "60px", width: "auto" }}
                />
                {!datas?.md_logo && datas?.site_name
                  ? datas?.name.charAt(0).toUpperCase()
                  : ""}
              </Link>
            </div>
          </div>
          {/* End .logo-box */}

          <HeaderNavContent />
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
              {user?.user_image ? (
                <LazyImage
                  className="avatar-img"
                  src={formatImageUrlUser(user?.user_image)}
                  alt="user logo"
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                />
              ) : (
                <Avatar size={50}>
                  {!user?.company?.company_photo && user?.company?.company_name
                    ? user?.company?.company_name.charAt(0).toUpperCase()
                    : ""}
                </Avatar>
              )}
              <span className="name">{user?.first_name}</span>
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
          <div className="outer-box">
            {/* <!-- Login/Register --> */}
            <div className="btn-box">
              <Link to="/login" className="theme-btn btn-style-three">
                <LoginOutlined style={{ marginRight: 8 }} />
                Login
              </Link>
            </div>
            <div className="btn-box">
              <Link to="/register" className="theme-btn btn-style-one">
                <UserAddOutlined style={{ marginRight: 8 }} />
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DefaulHeader;
