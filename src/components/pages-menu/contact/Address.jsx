import { useGetSettingData } from "@/queries/settings.query";

const Address = () => {
  const { data } = useGetSettingData();
  const setting = data?.data; // چون داده‌ها به صورت آرایه‌ای از آبجکت هستند

  if (!setting) return null;

  const addressContent = [
    {
      id: 1,
      iconName: "placeholder",
      title: "Address",
      text: (
        <>
          {setting.address?.split("\n").map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </>
      ),
    },
    {
      id: 2,
      iconName: "smartphone",
      title: "Call Us",
      text: (
        <a href={`tel:${setting.site_phone}`} className="phone">
          {setting.site_phone}
        </a>
      ),
    },
    {
      id: 3,
      iconName: "letter",
      title: "Email",
      text: (
        <a href={`mailto:${setting.site_email}`} className="email">
          {setting.site_email}
        </a>
      ),
    },
  ];

  return (
    <>
      {addressContent.map((item) => (
        <div
          className="contact-block col-lg-4 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className="inner-box">
            <span className="icon">
              <img
                src={`/images/icons/${item.iconName}.svg`}
                alt={`${item.title} icon`}
              />
            </span>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Address;
