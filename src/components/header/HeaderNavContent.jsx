import { Link, useLocation } from "react-router-dom";

const mainMenuItems = [
  { name: "Home", routePath: "/" },
  { name: "Listing", routePath: "/listing" },
  { name: "RFPS/RFQS", routePath: "/rfps" },
  { name: "About", routePath: "/about" },
  { name: "Contact", routePath: "/contact" },
];

const HeaderNavContent = () => {
  const { pathname } = useLocation();

  return (
    <nav className="nav main-menu  justify-content-start">
      <ul className="navigation" id="navbar">
        {mainMenuItems.map((item, index) => (
          <li
            key={index}
            className={pathname.startsWith(item.routePath) ? "current" : ""}
          >
            <Link to={item.routePath}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNavContent;
