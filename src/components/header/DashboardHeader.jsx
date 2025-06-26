import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import employerMenuData from "../../data/employerMenuData";
import { BASE_IMAGE_URL, isActiveLink } from "../../utils/linkActiveChecker";

import { useLocation } from "react-router-dom";
import { useGetAuthEmployerData } from "@/queries/get.auth.employer.data.query";
import { Avatar } from "antd";
import HeaderNavContent from "./HeaderNavContent";

const DashboardHeader = () => {
  const { data } = useGetAuthEmployerData();
  const employer = data?.data;
  const { pathname } = useLocation();
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/${path.replace(/\\/g, "/")}`;
  };

  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-shaddow  ${navbar ? "fixed-header " : ""}`}
    >
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link to="/">
                  <img alt="brand" src="/images/logo.svg" />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <HeaderNavContent />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            {/* <button className="menu-btn">
                            <span className="count">1</span>
                            <span className="icon la la-heart-o"></span>
                        </button> */}
            {/* wishlisted menu */}

            {/* <button className="menu-btn">
                            <span className="icon la la-bell"></span>
                        </button> */}
            {/* End notification-icon */}

            {/* <!-- Dashboard Option --> */}
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
                    employer?.company?.company_photo
                      ? formatImageUrl(employer?.company.company_photo)
                      : null
                  }
                  alt="md logo"
                >
                  {!employer?.company?.company_photo && employer?.company?.company_name
                    ? employer?.company?.company_name.charAt(0).toUpperCase()
                    : ""}
                </Avatar>
                <span className="name">{employer?.first_name}</span>
              </a>

              <ul className="dropdown-menu">
                {employerMenuData.map((item) => (
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

export default DashboardHeader;
