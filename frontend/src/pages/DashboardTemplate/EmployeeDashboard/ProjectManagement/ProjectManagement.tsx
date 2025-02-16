import React from "react";
import { Route, Routes } from "react-router-dom";
import ProjectDetail from "./partials/ProjectDetail";
import ProjectList from "./partials/ProjectList";

const ProjectManagement: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ProjectList />} />
      <Route path=":id" element={<ProjectDetail />} />
    </Routes>
  );
};

export default ProjectManagement;
