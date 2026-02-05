import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowUpRightFromSquare, } from "@fortawesome/free-solid-svg-icons";
const Experience = () => {
    const experiences = [
        {
            id: 1,
            companyName: "Qburst",
            href: "https://www.qburst.com/en-in/",
            jobType: "Full time",
            roleName: "Sr Software Engineer",
            startDate: new Date(2024, 1),
            description: "In addition to my contract role at Mediaocean through Qburst for product development, I am actively involved in training and mentoring new joiners at QBurst.",
            endDate: null,
        },
        {
            id: 2,
            companyName: "MediaOcean (Contract from Qburst)",
            href: "https://www.mediaocean.com/",
            jobType: "Contractor",
            description: " Contributed to the development of the Prisma Dashboard, a sophisticated web application for managing campaigns and orders through an integrated workflow, and led the development and maintenance of the Orders Tab. Additionally, optimized the dashboard grid's rendering, resulting in a 40% improvement in loading speed.",
            roleName: "Frontend Engineer",
            startDate: new Date(2022, 9),
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
            description: "Worked on the admin page of the CircleK project, a prominent supermarket chain, implementing new features like Ad campaigns and changelog. Additionally, contributed to the Testmate Extension project by integrating the Chrome extension with the Testmate website and worked on the Testmate Website, a QA automation tool used to store and replay tests.",
        },
    ];
    const getDateValue = (experience) => {
        const { startDate, endDate } = experience;
        const isPresent = !endDate;
        const starDateString = startDate.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
        const endDateString = !isPresent &&
            endDate.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
            });
        return `${starDateString} - ${isPresent ? "Present" : endDateString}`;
    };
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Experience - Swalih Kolakkadan" }) }), _jsx("div", { className: "col-span-1 flex items-center px-6 py-9", children: _jsxs("div", { className: "flex-grow lg:pr-10 animate-fadeIn", children: [_jsxs(Link, { className: "text-amber-700 dark:text-amber-200", to: "/", children: [_jsx(FontAwesomeIcon, { icon: faArrowLeft, className: "mr-2" }), "Menu"] }), experiences.map((experience) => (_jsxs(Link, { to: experience.href, target: "_blank", className: " block group p-3 mt-2 hover:bg-zinc-200/50 dark:hover:bg-zinc-900/50 hover:cursor-pointer rounded-md", children: [_jsxs("div", { className: "md:flex md:items-center md:justify-between", children: [_jsx("div", { className: "mt-1 font-semibold text-lg group-hover:text-amber-600 dark:group-hover:text-amber-200", children: `${experience.roleName}, ${experience.companyName}` }), _jsxs("div", { className: "md:text-right", children: [getDateValue(experience), _jsx(FontAwesomeIcon, { icon: faArrowUpRightFromSquare, className: "pl-2 transition-transform transform group-hover:scale-125 transition duration-300 group-hover:text-amber-600 dark:group-hover:text-amber-200" })] })] }), _jsx("div", { className: "text-neutral-600 group-hover:text-neutral-900  dark:text-neutral-400 dark:group-hover:text-neutral-200", children: experience.description })] }, experience.id)))] }) })] }));
};
export default Experience;
