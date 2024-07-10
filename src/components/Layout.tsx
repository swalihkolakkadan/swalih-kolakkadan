import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Home from "./Home";

const Layout = ({ children }: any) => {
  return (
    <div className="bg-zinc-300 dark:bg-zinc-800 text-fcolor-light dark:text-gray-200 flex flex-col min-h-screen transition duration-700">
      <main className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-grow">
        <Home />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
