import React from "react";
import { Route, Routes } from "react-router-dom";
import AccountDetail from "./partials/AccountDetail";
import AccountList from "./partials/AccountList";

const AccountManagement: React.FC = () => {
  return (
    <Routes>
      <Route index element={<AccountList />} />
      <Route path=":id" element={<AccountDetail />} />
    </Routes>
  );
};

export default AccountManagement;
