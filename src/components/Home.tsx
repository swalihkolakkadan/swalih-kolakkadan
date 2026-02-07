import React, { useState, useEffect, useCallback } from "react";
import { profile } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const location = useLocation();
  const isHomeVisible = location.pathname === "" || location.pathname === "/";

  // Get the system preferred theme
  const getSystemTheme = useCallback((): "light" | "dark" => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  // Apply the theme to the document
  const applyTheme = useCallback((newTheme: "light" | "dark") => {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setTheme(newTheme);
  }, []);

  useEffect(() => {
    // Always start with system preference (clear any stored override)
    localStorage.removeItem("theme");
    applyTheme(getSystemTheme());

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      applyTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [applyTheme, getSystemTheme]);

  const toggleTheme = () => {
    // Toggle theme for current session only (no localStorage persistence)
    const newTheme = theme === "light" ? "dark" : "light";
    applyTheme(newTheme);
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
            href="https://drive.google.com/file/d/1YTV9f75uCdowrB4N15zuh9RnRjbHfu4i/view?usp=sharing"
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
