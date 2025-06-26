import { useGetSettingData } from "@/queries/settings.query";
import Social from "./Social";

const CopyrightFooter = () => {
  const { data } = useGetSettingData();
  const footerData = data?.data || [];
  const datas = footerData;
  return (
    <div className="footer-bottom">
      <div className="auto-container">
        <div className="outer-box">
          <div className="copyright-text">
            © {new Date().getFullYear()} Powered by{" "}
            <a href="https://abc.af" target="_blank" rel="noopener noreferrer">
              {datas?.site_name}
            </a>
            . All Right Reserved.
          </div>
          <div className="social-links">
            <Social />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightFooter;
