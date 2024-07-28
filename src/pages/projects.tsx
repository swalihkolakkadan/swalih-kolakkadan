import React from "react";
import Layout from "../components/Layout";
import {
  faArrowLeft,
  faExternalLink,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "gatsby";

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "Personal Portfolio",
      skills: ["Gatsby", "Tailwind", "ReactJS", "Netlify"],
      description:
        "This project portfolio, built with Gatsby and styled using Tailwind CSS, showcases my web development work with a modern, responsive design. Hosted on Netlify, it features optimized performance, smooth navigation, and a dark mode option.",
      links: [
        {
          name: "Github",
          href: "https://github.com/swalihkolakkadan/swalih-kolakkadan",
        },
      ],
    },
  ];

  return (
    <Layout>
      <div className="col-span-1 flex lg:items-center px-6 py-9">
        <div className="animate-fadeIn">
          <Link className="text-amber-700 dark:text-amber-200" to="/">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Menu
          </Link>
          {projects.map((project) => (
            <div key={project.id} className="p-2">
              <div className="mt-1 font-semibold text-lg">{project.name}</div>
              <div id="skills" className="flex gap-2 mt-1">
                {project.skills.map((skill) => (
                  <div className=" text-sm bg-zinc-200 dark:bg-zinc-900 py-1 px-3 rounded-full">
                    {skill}
                  </div>
                ))}
              </div>
              <div className="mt-1">{project.description} </div>
              {project.links.length && (
                <div id="link" className="flex gap-2 mt-1">
                  {project.links.map((link) => (
                    <Link to={link.href} target="_blank">
                      <FontAwesomeIcon icon={faExternalLink} /> {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
