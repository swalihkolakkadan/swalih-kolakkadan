import * as React from "react";
import { type HeadFC, type PageProps } from "gatsby";
import Layout from "../components/Layout";
import Menu from "../components/Menu";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Menu />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Swalih Kolakkadan</title>;
