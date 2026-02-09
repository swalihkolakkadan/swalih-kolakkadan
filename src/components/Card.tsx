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
      className="group glass-panel p-4 rounded-2xl flex hover:cursor-pointer"
      onClick={() => {
        navigator.clipboard.writeText(subtitle);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 750);
      }}
    >
      <div>
        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {title}
        </div>
        <div
          className="text-md"
          style={{ color: isCopied ? 'var(--accent)' : 'var(--text-primary)' }}
        >
          {subtitle}
        </div>
      </div>
      <div className="ml-auto flex items-center opacity-0 group-hover:opacity-100 transition duration-300">
        <FontAwesomeIcon
          icon={isCopied ? faClipboardCheck : faCopy}
          size="lg"
          title="Copy"
          style={{ color: isCopied ? 'var(--accent)' : undefined }}
        />
      </div>
    </div>
  );
};

export default Card;
