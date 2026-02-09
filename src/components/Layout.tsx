import React from "react";
import Footer from "./Footer";
import Home from "./Home";

const Layout = ({ children }: any) => {
  return (
    <div className="bg-mesh flex flex-col min-h-screen font-inter"
      style={{ color: 'var(--text-primary)' }}
    >
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-grow">
        <Home />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
