import React, { useState, useEffect } from "react";
import { profile } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [theme, setTheme] = useState("light");
  const location = useLocation();
  const isHomeVisible = location.pathname === "" || location.pathname === "/";

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };
  return (
    <div
      className={`${
        isHomeVisible ? "flex" : "hidden"
      } col-span-1 md:flex flex-grow flex-col lg:justify-center items-center px-6 pt-9`}
    >
      <div className="lg:ml-24">
        <div className="font-semibold text-amber-700 dark:text-amber-100 pt-6 transition duration-700">
          Hello <span className="inline-block scale-x-[-1]"> 👋</span>
        </div>
        <div className="font-semibold text-3xl	mt-2">{`I'm ${profile.name}`}</div>
        <div className=" pt-4 lg:pr-28">{profile.aboutMe}</div>
        <div className="mt-8 flex gap-8">
          <a
            href="https://drive.google.com/file/d/1k-XdiouW1xvLe4lEJMjoS0GyTdJzRLol/view?usp=sharing"
            target="_blank"
          >
            <button className="home-button">View Resume</button>
          </a>
          <button className="home-button" onClick={toggleTheme}>
            <FontAwesomeIcon
              icon={theme === "dark" ? faSun : faMoon}
              size="lg"
              className="rounded-full mr-2"
            />
            {theme === "dark" ? "Day Mode" : "Night Mode"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
