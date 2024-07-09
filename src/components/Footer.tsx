import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";

const Footer = () => {
  const iConClass =
    "p-2.5 bg-slate-950 backdrop-blur-md rounded-full hover:text-amber-500 transition duration-300";

  return (
    <footer className="p-6 flex items-center justify-center space-x-4">
      <a
        href="https://www.linkedin.com/in/swalih-kolakkadan-071611177/"
        target="_blank"
      >
        <FontAwesomeIcon icon={faLinkedinIn} className={iConClass} />
      </a>
      <a href="https://github.com/swalihkolakkadan" target="_blank">
        <FontAwesomeIcon icon={faGithub} className={iConClass} />
      </a>
      <a
        href="https://www.instagram.com/swalih_k/?igsh=c2FyMTZpbGV6Nnkw&utm_source=qr"
        target="_blank"
      >
        <FontAwesomeIcon icon={faInstagram} className={iConClass} />
      </a>
    </footer>
  );
};

export default Footer;
