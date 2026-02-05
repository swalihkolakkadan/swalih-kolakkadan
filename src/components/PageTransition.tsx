import React from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return <div className="animate-fadeIn">{children}</div>;
};

export default PageTransition;
