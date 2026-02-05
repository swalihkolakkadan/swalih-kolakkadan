import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import StarRating from "../components/StarRating";
const Stack = () => {
    const selfRating = [
        {
            name: "JavaScript",
            rating: 4,
        },
        {
            name: "TypeScript",
            rating: 4,
        },
        {
            name: "React",
            rating: 4,
        },
        {
            name: "HTML5",
            rating: 4,
        },
        {
            name: "CSS3",
            rating: 4,
        },
        {
            name: "MaterialUI",
            rating: 4,
        },
        {
            name: "Angular",
            rating: 3.5,
        },
        {
            name: "JIRA",
            rating: 3.5,
        },
        {
            name: "Prime React",
            rating: 3.5,
        },
        { name: "Redux", rating: 3.5 },
        {
            name: "C",
            rating: 3,
        },
        { name: "Tailwind", rating: 3 },
        {
            name: "RXJS",
            rating: 3,
        },
        {
            name: "Python",
            rating: 3,
        },
        { name: "SQL", rating: 2 },
        { name: "ExpressJS", rating: 2 },
    ];
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Stack - Swalih Kolakkadan" }) }), _jsx("div", { className: "col-span-1 flex lg:items-center px-6 py-9", children: _jsxs("div", { className: "flex-grow lg:pr-10 animate-fadeIn", children: [_jsxs(Link, { className: "text-amber-700 dark:text-amber-200", to: "/", children: [_jsx(FontAwesomeIcon, { icon: faArrowLeft, className: "mr-2" }), "Menu"] }), _jsx("div", { className: "mt-2 w-full md:max-w-80 bg-neutral-200 dark:bg-neutral-900/75 p-4 rounded-lg shadow-sm dark:shadow-neutral-700/50 flex flex-col gap-2 lg:max-h-[32rem] overflow-auto", children: selfRating.map((skill) => (_jsxs("div", { className: "flex justify-between", children: [_jsxs("div", { children: [" ", skill.name, " "] }), _jsx("div", { children: _jsx(StarRating, { rating: skill.rating }) })] }))) })] }) })] }));
};
export default Stack;
