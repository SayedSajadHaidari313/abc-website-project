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
  const datas = footerData;
  return (
    <footer className={`main-footer ${footerStyle}`}>
      <div className="auto-container">
        {/* <!--Widgets Section--> */}
        <div className="widgets-section" data-aos="fade-up">
          <div className="row">
            <div className="big-column col-xl-4 col-lg-3 col-md-12">
              <div className="footer-column about-widget">
                <h4 className="widget-title">About</h4>
                <p className="about-abcaf">
                  Afghanistan Business Community is Home For all Businesses
                  Directory in Afghanistan, The biggest and most updated (daily)
                  business directory for Afghanistan. Find Business By category
                  name (a-z) and list your Business for free! Also providing B2B
                  - Business to Business Services, Publishing RFQ and RFP.
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
