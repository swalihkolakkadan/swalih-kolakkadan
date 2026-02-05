import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Lazy load pages for better performance (code splitting)
const IndexPage = lazy(() => import("./pages/index"));
const ContactPage = lazy(() => import("./pages/contact"));
const ExperiencePage = lazy(() => import("./pages/experience"));
const ProjectsPage = lazy(() => import("./pages/projects"));
const StackPage = lazy(() => import("./pages/stack"));
const NotFoundPage = lazy(() => import("./pages/404"));

// Simple loading fallback
const PageLoader = () => (
  <div className="col-span-1 flex items-center justify-center min-h-[50vh]">
    <div className="animate-pulse text-neutral-500 dark:text-neutral-400">
      Loading...
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <IndexPage />
            </Suspense>
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <ContactPage />
            </Suspense>
          </Layout>
        }
      />
      <Route
        path="/experience"
        element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <ExperiencePage />
            </Suspense>
          </Layout>
        }
      />
      <Route
        path="/projects"
        element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <ProjectsPage />
            </Suspense>
          </Layout>
        }
      />
      <Route
        path="/stack"
        element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <StackPage />
            </Suspense>
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
