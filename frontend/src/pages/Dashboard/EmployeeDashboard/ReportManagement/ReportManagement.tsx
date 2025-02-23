import React from "react";
import { Route, Routes } from "react-router-dom";
import ReportDetail from "./partials/ReportDetail";
import ReportList from "./partials/ReportList";

const ReportManagement: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ReportList />} />
      <Route path=":id" element={<ReportDetail />} />
    </Routes>
  );
};

export default ReportManagement;
