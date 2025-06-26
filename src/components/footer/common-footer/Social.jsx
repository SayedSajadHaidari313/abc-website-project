import { useGetSettingData } from "@/queries/settings.query";

const Social = () => {
  const { data } = useGetSettingData();
  const footerData = data?.data || [];
  const datas = footerData;
  const socialContent = [
    { id: 1, icon: "fa-facebook-f", link: datas?.facebook },
    { id: 2, icon: "fa-twitter", link: datas?.twitter },
    { id: 3, icon: "fa-whatsapp", link: datas?.whatsapp },
    { id: 4, icon: "fa-linkedin-in", link: datas?.linkedin },
  ];
  return (
    <>
      {socialContent.map((item) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          key={item.id}
        >
          <i className={`fab ${item.icon}`}></i>
        </a>
      ))}
    </>
  );
};

export default Social;
