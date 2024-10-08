import { faAddressCard, faFolder } from "@fortawesome/free-regular-svg-icons";
import { faLayerGroup, faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "gatsby";

const Menu = () => {
  return (
    <div className="col-span-1 flex flex-grow flex-col lg:justify-center lg:items-center px-6 py-9">
      <div className="text-gray-700 dark:text-gray-300 flex flex-wrap gap-8 max-w-96 mt-4 animate-fadeIn">
        <Link to="/projects" className="menu-button">
          <FontAwesomeIcon icon={faFolder} size="2x" />
          <div>Projects</div>
        </Link>
        <Link to="/experience" className="menu-button">
          <FontAwesomeIcon icon={faSuitcase} size="2x" />
          <div> Experience</div>
        </Link>
        <Link to="/stack" className="menu-button">
          <FontAwesomeIcon icon={faLayerGroup} size="2x" />
          <div> Stack</div>
        </Link>
        <Link to="/contact" className="menu-button">
          <FontAwesomeIcon icon={faAddressCard} size="2x" />
          <div> Contact Me</div>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
