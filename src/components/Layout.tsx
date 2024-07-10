import React from "react";
import Footer from "./Footer";
import { profile } from "../utils/constants";

const Layout = ({ children }: any) => (
  <div className="bg-zinc-300 dark:bg-zinc-800 text-fcolor-light dark:text-gray-200 flex flex-col min-h-screen transition duration-700">
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

export default Layout;
