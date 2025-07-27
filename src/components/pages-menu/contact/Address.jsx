import { useGetSettingData } from "@/queries/settings.query";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";

const Address = () => {
  const { data } = useGetSettingData();
  const setting = data?.data;

  if (!setting) return null;

  const addressContent = [
    {
      id: 1,
      icon: FaMapMarkerAlt,
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
      icon: BsTelephoneFill,
      title: "Call Us",
      text: (
        <a href={`tel:${setting.site_phone}`} className="phone">
          {setting.site_phone}
        </a>
      ),
    },
    {
      id: 3,
      icon: MdEmail,
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
      {addressContent.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            className="contact-block col-lg-4 col-md-6 col-sm-12"
            key={item.id}
          >
            <div className="inner-box">
              <span className="icon">
                <IconComponent size={24} />
              </span>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Address;
