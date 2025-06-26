import { useGetSettingData } from "@/queries/settings.query";
import CopyrightFooter from "./CopyrightFooter";
import FooterContent from "./FooterContent";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";

const index = ({ footerStyle = "" }) => {
  const { data } = useGetSettingData();
  const footerData = data?.data || [];
  const formatImageUrl = (path) => {
    if (!path) return null;
    return `${BASE_IMAGE_URL}/images/settings/${path.replace(/\\/g, "/")}`;
  };
  const datas = footerData[0];
  return (
    <footer className={`main-footer ${footerStyle}`}>
      <div className="auto-container">
        {/* <!--Widgets Section--> */}
        <div className="widgets-section" data-aos="fade-up">
          <div className="row">
            <div className="big-column col-xl-4 col-lg-3 col-md-12">
              <div className="footer-column about-widget">
                <div className="logo">
                  <a href="#">
                    <img
                      src={
                        datas?.md_logo ? formatImageUrl(datas?.md_logo) : null
                      }
                      width={100}
                      alt={datas?.site_name}
                    />
                    {!datas?.md_logo && datas?.site_name
                      ? datas?.name.charAt(0).toUpperCase()
                      : ""}
                  </a>
                </div>
                <p className="phone-num">
                  <span>Call us </span>
                  <a href="#">{datas?.site_phone}</a>
                </p>
                <p className="address">
                  {datas?.address}
                  <br></br>
                  <a href={`mailto:${datas?.site_email}`} className="email">
                    {datas?.site_email}
                  </a>
                </p>
              </div>
            </div>
            {/* End footer left widget */}

            <div className="big-column col-xl-8 col-lg-9 col-md-12">
              <div className="row">
                <FooterContent />
              </div>
            </div>
            {/* End col-xl-8 */}
          </div>
        </div>
      </div>
      {/* End auto-container */}

      <CopyrightFooter />
      {/* <!--Bottom--> */}
    </footer>
    //   {/* <!-- End Main Footer --> */}
  );
};

export default index;
