import React from "react";
import Footer from "./Footer";
import { profile } from "../utils/constants";

const Layout = ({ children }: any) => (
  <div className="bg-custom-grey-950 text-gray-200 flex flex-col min-h-screen">
    <header className="flex items-center justify-center font-interSemibold	p-6 text-lg	">
      {profile.userName}
    </header>
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

export default Layout;
