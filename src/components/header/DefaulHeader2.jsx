import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import { useGetSettingData } from "@/queries/settings.query";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const DefaulHeader2 = () => {
  const { data } = useGetSettingData();
  const headerData = data?.data || [];
  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}${path.replace(/\\/g, "/")}`;
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
                <img
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

          <HeaderNavContent />
          {/* <!-- Main Menu End--> */}
        </div>
        {/* End .nav-outer */}

        <div className="outer-box">
          {/* <!-- Add Listing --> */}
          {/* <Link to="/candidates-dashboard/cv-manager" className="upload-cv">
            Upload your CV
          </Link> */}
          {/* <!-- Login/Register --> */}
          <div className="btn-box">
            <a
              href="#"
              className="theme-btn btn-style-three call-modal"
              data-bs-toggle="modal"
              data-bs-target="#loginPopupModal"
            >
              Login / Register
            </a>
            <Link to="/login" className="theme-btn btn-style-one">
              Job Post
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;
