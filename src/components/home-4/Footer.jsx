import CopyrightFooter from "../footer/common-footer/CopyrightFooter";
import FooterApps from "../footer/FooterApps";
import FooterContent3 from "../footer/FooterContent3";

const Footer = () => {



  return (
    <footer
      className="main-footer style-three"
      style={{ backgroundImage: "url(/images/background/3.png)" }}
    >
      <div className="auto-container">
        {/* <!--Widgets Section--> */}
        <div className="widgets-section" data-aos="fade-up">
  
          <div className="row">
            <div className="big-column col-xl-3 col-lg-3 col-md-12">
                <div className="footer-column about-widget">
                  <h4 className="widget-title">About</h4>
                  <p 
                  style={{ color:"white",  }}
                  className="about-abcaf">
                    Afghanistan Business Community is Home For all Businesses
                    Directory in Afghanistan, The biggest and most updated
                    (daily) business directory for Afghanistan. Find Business By
                    category name (a-z) and list your Business for free! Also
                    providing B2B - Business to Business Services, Publishing
                    RFQ and RFP.
                  </p>
              </div>
            </div>
            {/* End footer address left widget */}

            <div className="big-column col-xl-9 col-lg-9 col-md-12">
              <div className="row">
                <FooterContent3 />

                <div className="footer-column col-lg-3 col-md-6 col-sm-12">
                  <div className="footer-widget">
                    <h4 className="widget-title">Mobile Apps</h4>
                    <FooterApps />
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End col-xl-8 */}
          </div>
        </div>
      </div>
      {/* End auto-container */}

      <CopyrightFooter />
      {/* <!--Bottom--> */}
    </footer>
  );
};

export default Footer;
