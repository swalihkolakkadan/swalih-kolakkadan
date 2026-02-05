import React from "react";
import SEO from "../components/SEO";
import Menu from "../components/Menu";

const IndexPage: React.FC = () => {
  return (
    <>
      <SEO pathname="/" />
      <Menu />
    </>
  );
};

export default IndexPage;
