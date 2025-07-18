import { useGetSettingData } from "@/queries/settings.query";

const IntroDescriptions = () => {
    const { data } = useGetSettingData();
  const setting = data?.data; 

  return (
    <div className="text-box">
        <div
          dangerouslySetInnerHTML={{
            __html: setting?.site_description || "---",
          }}
        />
    </div>
  );
};

export default IntroDescriptions;


