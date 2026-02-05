import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub, faInstagram, } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
    const iConClass = "p-2.5 bg-zinc-200 dark:bg-zinc-900 backdrop-blur-md rounded-full hover:text-amber-500";
    return (_jsxs("footer", { className: "py-6 flex items-center justify-center space-x-4", children: [_jsx("a", { href: "https://www.linkedin.com/in/swalih-kolakkadan-071611177/", target: "_blank", children: _jsx(FontAwesomeIcon, { icon: faLinkedinIn, className: iConClass }) }), _jsx("a", { href: "https://github.com/swalihkolakkadan", target: "_blank", children: _jsx(FontAwesomeIcon, { icon: faGithub, className: iConClass }) }), _jsx("a", { href: "https://www.instagram.com/swalih_k/?igsh=c2FyMTZpbGV6Nnkw&utm_source=qr", target: "_blank", children: _jsx(FontAwesomeIcon, { icon: faInstagram, className: iConClass }) })] }));
};
export default Footer;
