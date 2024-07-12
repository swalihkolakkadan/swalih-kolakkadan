import { faAddressCard, faFolder } from "@fortawesome/free-regular-svg-icons";
import { faLayerGroup, faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "gatsby";

const Menu = () => {
  return (
    <div className="col-span-1 flex flex-grow flex-col justify-center items-center">
      <div className="text-gray-700 dark:text-gray-300 flex flex-wrap gap-8 max-w-96">
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
        <Link to="about" className="menu-button">
          <FontAwesomeIcon icon={faAddressCard} size="2x" />
          <div> About Me</div>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
