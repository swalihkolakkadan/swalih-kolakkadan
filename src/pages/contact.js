import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEnvelope, faPhone, } from "@fortawesome/free-solid-svg-icons";
import { profile } from "../utils/constants";
import Card from "../components/Card";
import { faLinkedinIn, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
const Contact = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Helmet, { children: _jsx("title", { children: "Contact - Swalih Kolakkadan" }) }), _jsx("div", { className: "col-span-1 flex items-center max-w-lg pt-6", children: _jsxs("div", { className: "animate-fadeIn", children: [_jsxs(Link, { className: "text-amber-700 dark:text-amber-200 pl-6", to: "/", children: [_jsx(FontAwesomeIcon, { icon: faArrowLeft, className: "mr-2" }), "Menu"] }), _jsxs("div", { className: "contact text-sm p-6 flex flex-col gap-6 lg:max-h-[32rem] overflow-auto", children: [_jsxs("div", { className: "bg-neutral-200 dark:bg-neutral-900/75 p-4 rounded-2xl shadow-sm dark:shadow-neutral-700/50", children: [_jsxs("div", { className: "flex gap-4", children: [_jsx("div", { children: _jsx("img", { src: "/images/prof.jpg", alt: profile.name, className: "rounded-full\tw-20 h-20 shadow-neutral-900" }) }), _jsxs("div", { className: "pt-2", children: [_jsxs("div", { className: "text-lg font-medium", children: [" ", profile.name] }), _jsxs("div", { className: "text-sm text-neutral-600 dark:text-neutral-400", children: [profile.designation, ", ", profile.currentCompnay] })] })] }), _jsxs("div", { className: "mt-4 flex justify-between", children: [_jsx("button", { className: "contact-button", title: "Call", onClick: () => {
                                                        window.location.href = `tel:${profile.contactNo}`;
                                                    }, children: _jsx(FontAwesomeIcon, { icon: faPhone, size: "lg" }) }), _jsx("button", { className: "contact-button", title: "Email", onClick: () => {
                                                        window.location.href = `mailto:swalih723@gmail.com`;
                                                    }, children: _jsx(FontAwesomeIcon, { icon: faEnvelope, size: "lg" }) }), _jsx("button", { className: "contact-button", title: "Whatsapp", onClick: () => {
                                                        window.location.href = "https://wa.me/+918592815130";
                                                    }, children: _jsx(FontAwesomeIcon, { icon: faWhatsapp, size: "xl" }) }), _jsx("button", { className: "contact-button", title: "Linkedin", onClick: () => {
                                                        window.location.href =
                                                            "https://www.linkedin.com/in/swalih-kolakkadan-071611177/";
                                                    }, children: _jsx(FontAwesomeIcon, { icon: faLinkedinIn, size: "lg" }) })] })] }), _jsx(Card, { title: "Mobile", subtitle: `+91 ${profile.contactNo}` }), _jsx(Card, { title: "LinkedIn", subtitle: "linkedin.com/in/swalih-kolakkadan-071611177" }), _jsx(Card, { title: "Email", subtitle: profile.email }), _jsx(Card, { title: "Work", subtitle: profile.workEmail }), _jsx(Card, { title: "Birthday", subtitle: profile.birthday }), _jsx(Card, { title: "Address", subtitle: "Kozhikode, Kerala" })] })] }) })] }));
};
export default Contact;
