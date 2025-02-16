import React from "react";
import { Route, Routes } from "react-router-dom";
import FreelancerDetail from "./partials/FreelancerDetail";
import FreelancerList from "./partials/FreelancerList";

const FreelancerManagement: React.FC = () => {
  return (
    <Routes>
      <Route index element={<FreelancerList />} />
      <Route path=":id" element={<FreelancerDetail />} />
    </Routes>
  );
};

export default FreelancerManagement;
