import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Footer from "./Footer";
import Home from "./Home";
const Layout = ({ children }) => {
    return (_jsxs("div", { className: "bg-neutral-300 dark:bg-neutral-800 text-fcolor-light dark:text-gray-200 flex flex-col min-h-screen transition duration-700 font-inter", children: [_jsxs("main", { className: "grid grid-cols-1 lg:grid-cols-2 gap-2 flex-grow", children: [_jsx(Home, {}), children] }), _jsx(Footer, {})] }));
};
export default Layout;
