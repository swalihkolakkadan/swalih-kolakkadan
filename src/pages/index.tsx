import * as React from "react";
import { navigate, type HeadFC, type PageProps } from "gatsby";
import { profile } from "../utils/constants";
import Layout from "../components/Layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="flex-1 max-w-xl mt-4 md:mt-32 ml-4 md:ml-24">
          <div className="font-interRegular text-amber-100 pt-6">
            Hello <span className="inline-block scale-x-[-1]"> 👋</span>
          </div>
          <div className="font-interBold text-3xl	mt-4">
            {`I'm ${profile.name}`}
          </div>
          <div className="font-interLight pt-6">{profile.aboutMe}</div>
          <a
            href="https://drive.google.com/file/d/1CoHpjU0Hh8HXJOcqGlRX6AmD6xEwlu7O/view?usp=sharing"
            target="_blank"
          >
            <button className="bg-amber-200 text-slate-700 p-3 font-interSemibold font-semibold	text-base mt-8 py-2 px-4 hover:text-amber-500 transition duration-300">
              Download Resume
            </button>
          </a>
        </div>
        <div className="flex-1"> </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Swalih Kolakkadan</title>;
