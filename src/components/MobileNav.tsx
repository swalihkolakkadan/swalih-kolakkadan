import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFolder,
  faSuitcase,
  faLayerGroup,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { to: "/", icon: faHome, label: "Home" },
  { to: "/projects", icon: faFolder, label: "Projects" },
  { to: "/experience", icon: faSuitcase, label: "Work" },
  { to: "/stack", icon: faLayerGroup, label: "Stack" },
  { to: "/contact", icon: faAddressCard, label: "Contact" },
];

const MobileNav = () => {
  const location = useLocation();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-nav safe-area-bottom"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive =
            item.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] p-2 rounded-xl"
              aria-label={item.label}
            >
              {isActive && (
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'var(--accent-subtle)' }}
                />
              )}
              <FontAwesomeIcon
                icon={item.icon}
                className="relative z-10 text-lg"
                style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
              />
              <span
                className={`relative z-10 text-xs mt-1 ${
                  isActive ? "font-medium" : ""
                }`}
                style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
