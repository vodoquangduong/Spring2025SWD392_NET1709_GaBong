import React from "react";
import SettingsSection from "../SettingsSection";

const PaymentSettings: React.FC = () => {
  return (
    <SettingsSection
      title="Payment Settings"
      description="Configure payment gateways and transaction settings."
      category="payment"
    />
  );
};

export default PaymentSettings;
