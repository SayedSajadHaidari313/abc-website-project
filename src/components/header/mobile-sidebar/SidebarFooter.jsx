import { useGetSettingData } from "@/queries/settings.query";

const SidebarFooter = () => {
      const { data } = useGetSettingData();
    const footerData = data?.data || [];
    const datas = footerData[0];

  const socialContent = [
    { id: 1, icon: "fa-facebook-f", link: datas?.facebook },
    { id: 2, icon: "fa-twitter", link: datas?.twitter },
    { id: 3, icon: "fa-whatsapp", link: datas?.whatsapp },
    { id: 4, icon: "fa-linkedin-in", link: datas?.linkedin },
  ];

  
  return (
    <div className="mm-add-listing mm-listitem pro-footer">
      {/* job post btn */}

      <div className="mm-listitem__text">
        <div className="contact-info">
          <span className="phone-num">
            <span>Call us</span>
            <a ><a href={`tel:${datas?.site_phone}`}>{datas?.site_phone}</a></a>
          </span>
          <span className="address">
                  {datas?.address}<br></br>
          </span>
          <a href={`mailto:${datas?.site_email}`} className="email">
          {datas?.site_email}
          </a>
        </div>
        {/* End .contact-info */}

        <div className="social-links">
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
        </div>
        {/* End social-links */}
      </div>
      {/* End .mm-listitem__text */}
    </div>
  );
};

export default SidebarFooter;
