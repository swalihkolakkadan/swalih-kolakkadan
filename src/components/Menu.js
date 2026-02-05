import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faAddressCard, faFolder } from "@fortawesome/free-regular-svg-icons";
import { faLayerGroup, faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const Menu = () => {
    return (_jsx("div", { className: "col-span-1 flex flex-grow flex-col lg:justify-center lg:items-center px-6 py-9", children: _jsxs("div", { className: "text-gray-700 dark:text-gray-300 flex flex-wrap gap-8 max-w-96 mt-4 animate-fadeIn", children: [_jsxs(Link, { to: "/projects", className: "menu-button", children: [_jsx(FontAwesomeIcon, { icon: faFolder, size: "2x" }), _jsx("div", { children: "Projects" })] }), _jsxs(Link, { to: "/experience", className: "menu-button", children: [_jsx(FontAwesomeIcon, { icon: faSuitcase, size: "2x" }), _jsx("div", { children: " Experience" })] }), _jsxs(Link, { to: "/stack", className: "menu-button", children: [_jsx(FontAwesomeIcon, { icon: faLayerGroup, size: "2x" }), _jsx("div", { children: " Stack" })] }), _jsxs(Link, { to: "/contact", className: "menu-button", children: [_jsx(FontAwesomeIcon, { icon: faAddressCard, size: "2x" }), _jsx("div", { children: " Contact Me" })] })] }) }));
};
export default Menu;
