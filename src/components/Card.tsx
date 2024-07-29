import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

interface ContactCard {
  title: string;
  subtitle: string;
}

const Card = ({ title, subtitle }: ContactCard) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div
      className="group bg-neutral-200 dark:bg-neutral-900/50 p-4 rounded-2xl shadow-sm dark:shadow-neutral-700/50 flex hover:cursor-pointer hover:shadow-md"
      onClick={() => {
        navigator.clipboard.writeText(subtitle);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 750);
      }}
    >
      <div>
        <div className="text-xs text-neutral-600 dark:text-neutral-400">
          {title}
        </div>
        <div
          className={`text-md ${
            isCopied ? "text-amber-700 dark:text-amber-300" : ""
          }`}
        >
          {subtitle}
        </div>
      </div>
      <div className="ml-auto flex items-center opacity-0 group-hover:opacity-100 transition duration-300 active:text-sky-400 transition duration-300">
        <FontAwesomeIcon
          icon={isCopied ? faClipboardCheck : faCopy}
          size="lg"
          title="Copy"
          className={` ${isCopied ? "text-amber-700 dark:text-amber-300" : ""}`}
        />
      </div>
    </div>
  );
};

export default Card;
