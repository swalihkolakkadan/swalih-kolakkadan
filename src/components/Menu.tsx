import { faAddressCard, faFolder } from "@fortawesome/free-regular-svg-icons";
import { faLayerGroup, faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="col-span-1 flex flex-grow flex-col lg:justify-center lg:items-center px-6 py-9">
      <div className="flex flex-wrap gap-6 max-w-96 mt-4 animate-fadeIn" style={{ color: 'var(--text-secondary)' }}>
        <Link to="/projects" className="menu-button">
          <FontAwesomeIcon icon={faFolder} size="2x" />
          <div className="font-medium">Projects</div>
        </Link>
        <Link to="/experience" className="menu-button">
          <FontAwesomeIcon icon={faSuitcase} size="2x" />
          <div className="font-medium">Experience</div>
        </Link>
        <Link to="/stack" className="menu-button">
          <FontAwesomeIcon icon={faLayerGroup} size="2x" />
          <div className="font-medium">Stack</div>
        </Link>
        <Link to="/contact" className="menu-button">
          <FontAwesomeIcon icon={faAddressCard} size="2x" />
          <div className="font-medium">Contact Me</div>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
