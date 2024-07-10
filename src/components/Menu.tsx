import { faAddressCard, faFolder } from "@fortawesome/free-regular-svg-icons";
import { faLayerGroup, faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { navigate } from "gatsby";

const Menu = () => {
  return (
    <div className="col-span-1 px-4 flex flex-grow flex-col justify-center items-center">
      <div className="text-gray-700 dark:text-gray-300 flex flex-wrap gap-8 max-w-96">
        <button className="menu-button" onClick={() => navigate("projects")}>
          <FontAwesomeIcon icon={faFolder} size="2x" />
          <div>Projects</div>
        </button>
        <button className="menu-button" onClick={() => navigate("experience")}>
          <FontAwesomeIcon icon={faSuitcase} size="2x" />
          <div> Experience</div>
        </button>
        <button className="menu-button" onClick={() => navigate("Stack")}>
          <FontAwesomeIcon icon={faLayerGroup} size="2x" />
          <div> Stack</div>
        </button>
        <button className="menu-button" onClick={() => navigate("about")}>
          <FontAwesomeIcon icon={faAddressCard} size="2x" />
          <div> About Me</div>
        </button>
      </div>
    </div>
  );
};

export default Menu;
