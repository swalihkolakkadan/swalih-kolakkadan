import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";
import ProgressiveBlur from "./ProgressiveBlur";

const Footer = () => {
  const iconClass = "p-2.5 glass-pill rounded-full";
  const linkClass = "transition-transform duration-150 hover:-translate-y-1";

  return (
    <footer className="relative py-6 flex items-center justify-center space-x-4 overflow-hidden">
      <ProgressiveBlur
        direction="to top"
        blurMax={8}
        blurMin={0}
        className="h-full w-full"
      />
      <div className="relative z-10 flex items-center space-x-4 pointer-events-auto">
        <a
          href="https://www.linkedin.com/in/swalih-kolakkadan-071611177/"
          target="_blank"
          className={linkClass}
          style={{ color: "var(--text-secondary)" }}
        >
          <FontAwesomeIcon icon={faLinkedinIn} className={iconClass} />
        </a>
        <a
          href="https://github.com/swalihkolakkadan"
          target="_blank"
          className={linkClass}
          style={{ color: "var(--text-secondary)" }}
        >
          <FontAwesomeIcon icon={faGithub} className={iconClass} />
        </a>
        <a
          href="https://www.instagram.com/swalih_k/?igsh=c2FyMTZpbGV6Nnkw&utm_source=qr"
          target="_blank"
          className={linkClass}
          style={{ color: "var(--text-secondary)" }}
        >
          <FontAwesomeIcon icon={faInstagram} className={iconClass} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
