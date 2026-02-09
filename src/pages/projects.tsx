import React from "react";
import { faArrowLeft, faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const Projects = () => {
  const projects = [
    {
      id: 3,
      name: "Learning App (Stealth AI Company)",
      skills: ["React", "TLDrawSDK", "TailwindCSS"],
      description:
        "Developed an interactive canvas-based web application enabling one-on-one student interactions with an AI-powered tutor. Led the design and implementation of the canvas module and integrated it seamlessly within the broader web application ecosystem. Built internal tooling to generate customizable canvas layouts.",
    },
    {
      id: 4,
      name: "Whitelabel Forex Payment System",
      skills: ["React", "Redux", "TailwindCSS"],
      description:
        "A customizable platform that allows businesses to offer forex trading and payment services under their own brand name. Implemented a robust currency configuration system allowing admins to set margins and fees. Developed key payment features including single and bulk payment flows and real-time profit calculation.",
    },
    {
      id: 1,
      name: "Personal Portfolio",
      skills: ["React", "FastAPI", "Docker", "LangChain", "TailwindCSS"],
      description:
        "A modern portfolio with an AI chatbot that mimics my persona using RAG and Vercel AI SDK. The frontend is built with React and TailwindCSS, while the backend utilizes FastAPI and LangChain, deployed on Northflank via Docker.",
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
      <SEO
        title="Projects"
        description="Explore my portfolio projects including web applications and e-commerce platforms built with React, TypeScript, and modern technologies."
        pathname="/projects"
      />
      <div className="col-span-1 flex lg:items-center px-6 py-9">
        <div className="animate-fadeIn">
          <Link className="accent-link" to="/">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Menu
          </Link>
          <div className="flex flex-col gap-4 mt-4">
            {projects.map((project) => (
              <div key={project.id} className="glass-panel rounded-2xl p-4">
                <div
                  className="font-semibold text-lg"
                  style={{ color: "var(--text-primary)" }}
                >
                  {project.name}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.skills.map((skill) => (
                    <div
                      key={skill}
                      className="glass-pill text-xs py-1 px-3 rounded-full"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
                <div
                  className="mt-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.description}
                </div>
                {project.links?.length && (
                  <div className="flex gap-3 mt-3">
                    {project.links.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        target="_blank"
                        className="accent-link text-sm font-medium"
                      >
                        <FontAwesomeIcon
                          icon={faExternalLink}
                          className="mr-1"
                        />{" "}
                        {link.name}
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
