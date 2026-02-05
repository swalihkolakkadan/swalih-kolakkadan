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
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-200/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-300 dark:border-neutral-700 safe-area-bottom"
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
              className="relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] p-2 rounded-lg transition-all duration-300"
              aria-label={item.label}
            >
              {isActive && (
                <div className="absolute inset-0 bg-amber-100 dark:bg-amber-900/30 rounded-lg transition-all duration-300 animate-fadeIn" />
              )}
              <FontAwesomeIcon
                icon={item.icon}
                className={`relative z-10 text-lg transition-colors duration-300 ${
                  isActive
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              />
              <span
                className={`relative z-10 text-xs mt-1 transition-colors duration-300 ${
                  isActive
                    ? "text-amber-600 dark:text-amber-400 font-medium"
                    : "text-neutral-500 dark:text-neutral-500"
                }`}
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
