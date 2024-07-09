import React, { useState, useEffect } from "react";
import { profile } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";

const Home = () => {
  const [theme, setTheme] = useState("light");

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
    <div className="flex flex-col md:flex-row flex-grow">
      <div className="flex-1 max-w-xl mt-4 md:mt-32 ml-4 md:ml-24">
        <div className="font-interRegular text-amber-700 dark:text-amber-100 pt-6 transition duration-700">
          Hello <span className="inline-block scale-x-[-1]"> 👋</span>
        </div>
        <div className="font-interBold text-3xl	mt-4">
          {`I'm ${profile.name}`}
        </div>
        <div className="font-interLight pt-6">{profile.aboutMe}</div>
        <div className="mt-8 flex">
          <a
            href="https://drive.google.com/file/d/1CoHpjU0Hh8HXJOcqGlRX6AmD6xEwlu7O/view?usp=sharing"
            target="_blank"
          >
            <button className="bg-amber-600 text-slate-200 dark:bg-amber-200 dark:text-slate-900 w-36 h-12 font-semibold rounded-md px-4 hover:text-amber-200 dark:hover:text-amber-500 transition duration-500">
              View Resume
            </button>
          </a>
          <button
            className=" bg-amber-600 text-slate-200 dark:bg-amber-200 dark:text-slate-900 ml-8 w-36 h-12  font-semibold rounded-md hover:text-amber-200 dark:hover:text-amber-500 transition duration-500"
            onClick={toggleTheme}
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? faSun : faMoon}
              size="lg"
              className="rounded-full mr-2"
            />
            {theme === "dark" ? "Day Mode" : "Night Mode"}
          </button>
        </div>
      </div>
      <div className="flex-1"> </div>
    </div>
  );
};

export default Home;
