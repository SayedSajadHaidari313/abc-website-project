const footerContent = [
  {
    id: 1,
    title: "For Candidates",
    menuList: [
      { name: "Browse Jobs", route: "/jobs" },
      { name: "Candidate Dashboard", route: "/login" },
    ],
  },
  {
    id: 2,
    title: "For Employers",
    menuList: [
      {
        name: "Employers",
        route: "/for-employers",
      },
      { name: "Employer Dashboard", route: "/login" },
      { name: "Add Job", route: "/login" },
    ],
  },
  {
    id: 3,
    title: "About Us",
    menuList: [
      { name: "About Us", route: "/about" },
      { name: "Terms Page", route: "/terms" },
      { name: "Contact", route: "/contact" },
    ],
  },
  {
    id: 4,
    title: "Helpful Resources",
    menuList: [
      { name: "For Employers", route: "/for-employers" },
      // { name: "Terms of Use", route: "/terms" },
      { name: "How It Works", route: "/how-it-work" },
    ],
  },
];
export default footerContent;
