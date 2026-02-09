import React from "react";
import Footer from "./Footer";
import Home from "./Home";

const Layout = ({ children }: any) => {
  return (
    <div
      className="bg-mesh flex flex-col min-h-screen lg:h-screen font-inter lg:overflow-hidden relative"
      style={{ color: "var(--text-primary)" }}
    >
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-grow lg:overflow-hidden pb-20 lg:pb-0">
        <Home />
        <div className="col-span-1 lg:h-full lg:overflow-y-auto no-scrollbar ">
          {children}
        </div>
      </main>
      <div className="absolute bottom-0 w-full z-20 pointer-events-none">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
