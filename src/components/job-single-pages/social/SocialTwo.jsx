const SocialTwo = () => {
  const socialContent = [
    {
      id: 1,
      name: "Facebook",
      icon: "fa-facebook-f",
      iconClass: "facebook",
      link: "https://www.facebook.com/",
    },
    {
      id: 2,
      name: "Twitter",
      icon: "fa-twitter",
      iconClass: "twitter",
      link: "https://www.twitter.com/",
    },
    {
      id: 3,
      name: "LinkedIn",
      icon: "fa-linkedin-in",
      iconClass: "linkedin",
      link: "https://www.linkedin.com/",
    },
  ];

  return (
    <div className="social-buttons-container">
      {socialContent.map((item) => (
        <a
          href={item.link}
          className={`social-button ${item.iconClass}`}
          target="_blank"
          rel="noopener noreferrer"
          key={item.id}
        >
          <i className={`fab ${item.icon}`}></i> {item.name}
        </a>
      ))}
    </div>
  );
};

export default SocialTwo;
