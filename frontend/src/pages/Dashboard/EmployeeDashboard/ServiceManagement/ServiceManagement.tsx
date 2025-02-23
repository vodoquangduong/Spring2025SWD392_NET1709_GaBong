import React from "react";
import { Route, Routes } from "react-router-dom";
import ServiceDetail from "./partials/ServiceDetail";
import ServiceList from "./partials/ServiceList";

const ServiceManagement: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ServiceList />} />
      <Route path=":id" element={<ServiceDetail />} />
    </Routes>
  );
};

export default ServiceManagement;
