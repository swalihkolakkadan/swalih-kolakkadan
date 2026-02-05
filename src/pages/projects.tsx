import React from "react";
import { Helmet } from "react-helmet-async";
import {
  faArrowLeft,
  faExternalLink,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

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
    {
      id: 2,
      name: "Dalu Fashion Factory",
      skills: ["ReactJS", "Firebase", "CashFreeAPI", "React-Admin"],
      description:
        "The Dalu Fashion Factory project is an e-commerce platform designed for boutique garment sales. The site is built using React, offering a dynamic and responsive user interface that enhances the shopping experience. The platform features a comprehensive admin page, developed with React Admin, enabling efficient management of products, orders, and customer data. The project integrates modern web technologies to deliver a seamless and user-friendly experience, catering to both the customers and the business's operational needs.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Projects - Swalih Kolakkadan</title>
      </Helmet>
      <div className="col-span-1 flex  lg:items-center px-6 py-9">
        <div className="animate-fadeIn">
          <Link className="text-amber-700 dark:text-amber-200" to="/">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Menu
          </Link>
          <div className="flex flex-col gap-2">
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
                <div className="mt-1 text-neutral-600 dark:text-neutral-400">
                  {project.description}
                </div>
                {project.links?.length && (
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
      </div>
    </>
  );
};

export default Projects;
