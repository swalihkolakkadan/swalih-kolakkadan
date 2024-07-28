import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Home from "./Home";

const Layout = ({ children }: any) => {
  return (
    <div className="bg-neutral-300 dark:bg-neutral-800 text-fcolor-light dark:text-gray-200 flex flex-col min-h-screen transition duration-700 font-inter">
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-grow px-6 py-9">
        <Home />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
