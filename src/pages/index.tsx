import React from "react";
import { Helmet } from "react-helmet-async";
import Menu from "../components/Menu";

const IndexPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Swalih Kolakkadan</title>
      </Helmet>
      <Menu />
    </>
  );
};

export default IndexPage;
