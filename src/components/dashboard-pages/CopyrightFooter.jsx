import { useGetSettingData } from "@/queries/settings.query";

const CopyrightFooter = () => {
  const { data } = useGetSettingData();
  const footerData = data?.data || [];
  const datas = footerData[0];
  return (
    <div className="copyright-text">
      © {new Date().getFullYear()} Powered by{" "}
      <a href="https://isightdeed.com" target="_blank" rel="noopener noreferrer">
        {datas?.site_name}
      </a>
      . All Right Reserved.
    </div>
  );
};

export default CopyrightFooter;
