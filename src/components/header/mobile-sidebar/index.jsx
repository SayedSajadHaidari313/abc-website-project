import {
  Sidebar,
  Menu,
  MenuItem,
} from "react-pro-sidebar";

import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const mainMenuItems = [
  { name: "Home", routePath: "/" },
  { name: "Company Listing", routePath: "/listing" },
  { name: "RFPS/RFQS", routePath: "/rfps" },
  { name: "About", routePath: "/about" },
  { name: "Contact", routePath: "/contact" },
];

const MobileMenu = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      <Sidebar>
        <Menu>
          {mainMenuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => navigate(item.routePath)}
              className={pathname.startsWith(item.routePath) ? "menu-active-link" : ""}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
      <SidebarFooter />
    </div>
  );
};

export default MobileMenu;
