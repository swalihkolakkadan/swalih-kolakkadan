import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/index";
import ContactPage from "./pages/contact";
import ExperiencePage from "./pages/experience";
import ProjectsPage from "./pages/projects";
import StackPage from "./pages/stack";
import NotFoundPage from "./pages/404";
function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Layout, { children: _jsx(IndexPage, {}) }) }), _jsx(Route, { path: "/contact", element: _jsx(Layout, { children: _jsx(ContactPage, {}) }) }), _jsx(Route, { path: "/experience", element: _jsx(Layout, { children: _jsx(ExperiencePage, {}) }) }), _jsx(Route, { path: "/projects", element: _jsx(Layout, { children: _jsx(ProjectsPage, {}) }) }), _jsx(Route, { path: "/stack", element: _jsx(Layout, { children: _jsx(StackPage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Layout, { children: _jsx(NotFoundPage, {}) }) })] }));
}
export default App;
