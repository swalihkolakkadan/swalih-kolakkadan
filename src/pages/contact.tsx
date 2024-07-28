import React from "react";
import Layout from "../components/Layout";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import profileImage from "../images/prof.jpg";
import { profile } from "../utils/constants";
import Card from "../components/Card";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  return (
    <Layout>
      <div className="col-span-1 flex items-center max-w-lg">
        <div className="">
          <Link className="text-amber-700 dark:text-amber-200" to="/">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Menu
          </Link>
          <div className="contact text-sm p-6 mt-4 rounded-2xl shadow-sm dark:shadow-neutral-70/50 bg-neutral-200 dark:bg-neutral-900/50 flex flex-col gap-6 lg:max-h-[31rem] overflow-auto">
            <div className="bg-neutral-300 dark:bg-neutral-800 p-4 rounded-2xl shadow-sm dark:shadow-neutral-700/50">
              <div className="flex gap-4">
                <div>
                  <img
                    src={profileImage}
                    className="rounded-full	w-20 h-20 shadow-neutral-900"
                  ></img>
                </div>
                <div className="pt-2">
                  <div className="text-lg font-medium"> {profile.name}</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {profile.designation}, {profile.currentCompnay}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  className="px-8 py-4 bg-neutral-400/75 dark:bg-neutral-700/75 rounded-3xl transition duration-300"
                  title="Call"
                  onClick={() => {
                    window.location.href = `tel:${profile.contactNo}`;
                  }}
                >
                  <FontAwesomeIcon icon={faPhone} size="lg" />
                </button>
                <button
                  className="px-8 py-4 bg-neutral-400/75 dark:bg-neutral-700/75 rounded-3xl transition duration-300"
                  title="Email"
                  onClick={() => {
                    window.location.href = `mailto:swalih723@gmail.com`;
                  }}
                >
                  <FontAwesomeIcon icon={faEnvelope} size="lg" />
                </button>
                <button
                  className="px-8 py-4 bg-neutral-400/75 dark:bg-neutral-700/75 rounded-3xl transition duration-300"
                  title="Whatsapp"
                  onClick={() => {
                    window.location.href = "https://wa.me/+918592815130";
                  }}
                >
                  <FontAwesomeIcon icon={faWhatsapp} size="xl" />
                </button>
              </div>
            </div>
            <Card title="Mobile" subtitle={`+91 ${profile.contactNo}`} />
            <Card
              title="LinkedIn"
              subtitle="linkedin.com/in/swalih-kolakkadan-071611177"
            />
            <Card title="Email" subtitle={profile.email} />
            <Card title="Work" subtitle={profile.workEmail} />
            <Card title="Birthday" subtitle={profile.birthday} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
