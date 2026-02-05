import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/index";
import ContactPage from "./pages/contact";
import ExperiencePage from "./pages/experience";
import ProjectsPage from "./pages/projects";
import StackPage from "./pages/stack";
import NotFoundPage from "./pages/404";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <IndexPage />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <ContactPage />
          </Layout>
        }
      />
      <Route
        path="/experience"
        element={
          <Layout>
            <ExperiencePage />
          </Layout>
        }
      />
      <Route
        path="/projects"
        element={
          <Layout>
            <ProjectsPage />
          </Layout>
        }
      />
      <Route
        path="/stack"
        element={
          <Layout>
            <StackPage />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <NotFoundPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
