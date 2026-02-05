import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
const Card = ({ title, subtitle }) => {
    const [isCopied, setIsCopied] = useState(false);
    return (_jsxs("div", { className: "group bg-neutral-200 dark:bg-neutral-900/50 p-4 rounded-2xl shadow-sm dark:shadow-neutral-700/50 flex hover:cursor-pointer hover:shadow-md", onClick: () => {
            navigator.clipboard.writeText(subtitle);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 750);
        }, children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs text-neutral-600 dark:text-neutral-400", children: title }), _jsx("div", { className: `text-md ${isCopied ? "text-amber-700 dark:text-amber-300" : ""}`, children: subtitle })] }), _jsx("div", { className: "ml-auto flex items-center opacity-0 group-hover:opacity-100 transition duration-300 active:text-sky-400 transition duration-300", children: _jsx(FontAwesomeIcon, { icon: isCopied ? faClipboardCheck : faCopy, size: "lg", title: "Copy", className: ` ${isCopied ? "text-amber-700 dark:text-amber-300" : ""}` }) })] }));
};
export default Card;
