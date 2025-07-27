import { Link } from "react-router-dom";
import MobileSidebar from "./mobile-sidebar";
import { useGetSettingData } from "@/queries/settings.query";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
import LazyImage from "../common/LazyImage";

const MobileMenu = () => {
  const { data } = useGetSettingData();

  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/images/settings/${path.replace(/\\/g, "/")}`;
  };
  const datas = data?.data || {};

  return (
    <header className="main-header main-header-mobile">
      <div className="auto-container">
        <div className="inner-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link to="/">
                  {datas?.md_logo ? (
                    <LazyImage
                      src={formatImageUrl(datas?.md_logo)}
                      alt={datas?.site_name}
                      priority={true}
                      style={{ maxHeight: "50px", width: "auto" }}
                    />
                  ) : datas?.site_name ? (
                    <span>{datas?.site_name.charAt(0).toUpperCase()}</span>
                  ) : null}
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

            <MobileSidebar />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            <div className="login-box">
              <Link to="/login">
                <span className="icon icon-user"></span>
              </Link>
            </div>
            {/* login popup end */}

            <a
              href="#"
              className="mobile-nav-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
            >
              <span className="flaticon-menu-1"></span>
            </a>
            {/* right humberger menu */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileMenu;
