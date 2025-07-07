import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetSettingData } from "@/queries/settings.query";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const { data } = useGetSettingData();
  const headerData = data?.data || [];
  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/images/settings/${path.replace(/\\/g, "/")}`;
  };
  const datas = headerData;
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
    <header
      className={`main-header ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      <div className="container-fluid">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link to="/" className="noSticky">
                  <img
                    width={100}
                    src={datas?.md_logo ? formatImageUrl(datas?.md_logo) : null}
                    alt={datas?.site_name}
                  />
                  {!datas?.md_logo && datas?.site_name
                    ? datas?.name.charAt(0).toUpperCase()
                    : ""}
                </Link>
                <Link to="/" className="isSticky">
                  <img
                    width={100}
                    src={datas?.md_logo ? formatImageUrl(datas?.md_logo) : null}
                  />
                  {!datas?.md_logo && datas?.site_name
                    ? datas?.name.charAt(0).toUpperCase()
                    : ""}{" "}
                </Link>
              </div>
              
            </div>
          </div>
          {/* End nav-outer */}

         
          {/* End outer-box */}
        </div>
      </div>
    </header>
  );
};

export default Header;
