import React from "react";
import { profile } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHomeVisible = location.pathname === "" || location.pathname === "/";
  return (
    <div
      className={`${
        isHomeVisible ? "flex" : "hidden"
      } col-span-1 md:flex flex-grow flex-col lg:justify-center items-center px-6 pt-9`}
    >
      <div className="lg:ml-24">
        <div className="font-semibold pt-6" style={{ color: "var(--accent)" }}>
          Hello <span className="inline-block scale-x-[-1]"> 👋</span>
        </div>
        <div
          className="font-semibold text-3xl mt-2"
          style={{ color: "var(--text-primary)" }}
        >
          {`I'm ${profile.name}`}
        </div>
        <div
          className="pt-4 lg:pr-28"
          style={{ color: "var(--text-secondary)" }}
        >
          {profile.aboutMe}
        </div>
        <div className="mt-8 flex gap-6">
          <a
            href="https://drive.google.com/file/d/1YTV9f75uCdowrB4N15zuh9RnRjbHfu4i/view?usp=sharing"
            target="_blank"
          >
            <button className="home-button">View Resume</button>
          </a>
          <button className="home-button" onClick={toggleTheme}>
            <FontAwesomeIcon
              icon={theme === "dark" ? faSun : faMoon}
              size="lg"
              className="mr-2"
            />
            {theme === "dark" ? "Day Mode" : "Night Mode"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
