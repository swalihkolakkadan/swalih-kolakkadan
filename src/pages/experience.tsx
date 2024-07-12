import React from "react";
import Layout from "../components/Layout";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

interface Experience {
  id: number;
  companyName: string;
  href: string;
  jobType: string;
  description: string;
  roleName: string;
  startDate: Date;
  endDate?: Date | null;
}

const Experience = () => {
  const experiences: Experience[] = [
    {
      id: 1,
      companyName: "MediaOcean",
      href: "https://www.mediaocean.com/",
      jobType: "Contractor",
      description:
        " Contributed to the development of the Prisma Dashboard, a sophisticated web application for managing campaigns and orders through an integrated workflow, and led the development and maintenance of the Orders Tab. Additionally, optimized the dashboard grid's rendering, resulting in a 40% improvement in loading speed.",
      roleName: "Frontend Engineer",
      startDate: new Date(2022, 9),
      endDate: null,
    },
    {
      id: 2,
      companyName: "Qburst",
      href: "https://www.qburst.com/en-in/",
      jobType: "Full time",
      roleName: "Sr Software Engineer",
      startDate: new Date(2024, 1),
      description:
        "In addition to my contract role at Mediaocean through Qburst for product development, I am actively involved in training and mentoring new joiners at QBurst.",
      endDate: null,
    },
    {
      id: 3,
      companyName: "Qburst",
      href: "https://www.qburst.com/en-in/",
      jobType: "Full time",
      roleName: "Software Engineer",
      startDate: new Date(2020, 10),
      endDate: new Date(2023, 12),
      description:
        "Worked on the admin page of the CircleK project, a prominent supermarket chain, implementing new features like Ad campaigns and changelog. Additionally, contributed to the Testmate Extension project by integrating the Chrome extension with the Testmate website and worked on the Testmate Website, a QA automation tool used to store and replay tests.",
    },
  ];

  const getDateValue = (experience: Experience) => {
    const { startDate, endDate } = experience;
    const isPresent = !endDate;
    const starDateString = startDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    const endDateString =
      !isPresent &&
      endDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    return `${starDateString} - ${isPresent ? "Present" : endDateString}`;
  };

  return (
    <Layout>
      <div className="col-span-1 flex items-center">
        <div className="flex-grow lg:pr-10">
          <Link className="text-amber-700 dark:text-amber-200" to="/">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Menu
          </Link>
          {experiences.map((experience) => (
            <Link
              to={experience.href}
              key={experience.id}
              target="_blank"
              className=" block group p-3 mt-2 hover:bg-zinc-200/50 dark:hover:bg-zinc-900/50 hover:cursor-pointer rounded-md"
            >
              <div className="flex items-center justify-between">
                <div className="mt-1 font-semibold text-lg group-hover:text-amber-600 dark:group-hover:text-amber-200">
                  {`${experience.roleName}, ${experience.companyName}`}
                </div>
                <div>
                  {getDateValue(experience)}
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="pl-2 transition-transform transform group-hover:scale-125 transition duration-300 group-hover:text-amber-600 dark:group-hover:text-amber-200"
                  />
                </div>
              </div>
              <div className="text-neutral-600 group-hover:text-neutral-900  dark:text-neutral-400 dark:group-hover:text-neutral-200">
                {experience.description}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Experience;
